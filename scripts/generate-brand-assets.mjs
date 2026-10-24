import fs from "node:fs/promises";
import sharp from "sharp";
import { createHash } from "node:crypto";

// The editable SVG masters contain outlined wordmarks and no background rectangle.
const root = new URL("../", import.meta.url);
const manifestUrl = new URL("development-plans/assets-manifest.json", root);
const manifest = JSON.parse(await fs.readFile(manifestUrl, "utf8"));
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
async function record(relative, bytes) {
  await fs.writeFile(new URL("public/" + relative, root), bytes);
  const entry = {
    source: relative,
    output: relative,
    sourceBytes: bytes.length,
    sourceSha256: hash(bytes),
    outputBytes: bytes.length,
    outputSha256: hash(bytes),
    generator: "scripts/generate-brand-assets.mjs",
  };
  const i = manifest.assets.findIndex((asset) => asset.output === relative);
  if (i < 0) manifest.assets.push(entry);
  else manifest.assets[i] = entry;
}
for (const name of ["logo", "logo-light", "mark"]) {
  const stem = "branding/digital-horizon-systems-" + name;
  const svg = await fs.readFile(new URL("public/" + stem + ".svg", root));
  await record(stem + ".svg", svg);
  const width = name === "mark" ? 512 : 1040;
  await record(
    stem + ".png",
    await sharp(svg).resize({ width }).png({ compressionLevel: 9 }).toBuffer(),
  );
  await record(
    stem + ".jpg",
    await sharp(svg)
      .resize({ width })
      .flatten({ background: name === "logo-light" ? "#102b27" : "#ffffff" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer(),
  );
}
const mark = await fs.readFile(new URL("public/branding/digital-horizon-systems-mark.svg", root));
for (const size of [192, 512])
  await record(
    `icons/web-app-manifest-${size}x${size}.png`,
    await sharp(mark).resize(size, size).png().toBuffer(),
  );
await record("icons/apple-touch-icon.png", await sharp(mark).resize(180, 180).png().toBuffer());
const png = await sharp(mark).resize(64, 64).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 64;
header[7] = 64;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await fs.writeFile(new URL("src/app/favicon.ico", root), Buffer.concat([header, png]));
manifest.beforeBytes = manifest.assets.reduce((sum, a) => sum + a.sourceBytes, 0);
manifest.afterBytes = manifest.assets.reduce((sum, a) => sum + a.outputBytes, 0);
await fs.writeFile(manifestUrl, JSON.stringify(manifest, null, 2) + "\n");
console.log("Brand SVG, transparent PNG, matte JPG, favicon and touch icons generated.");
