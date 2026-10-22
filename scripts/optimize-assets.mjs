import { copyFile, mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, "public");
const sourceDirectory = process.argv[2];
if (!sourceDirectory)
  throw new Error(
    "Provide an external source archive: npm run assets:optimize -- <directory>. The original local archive has been removed.",
  );
const originals = path.resolve(sourceDirectory);
const manifestPath = path.join(root, "development-plans/assets-manifest.json");
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name),
      ),
    )
  )
    .flat()
    .sort();
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

for (const asset of manifest.assets) {
  const input = path.join(originals, asset.source);
  const output = path.join(publicDir, asset.output);
  let bytes;
  try {
    bytes = await readFile(input);
  } catch {
    throw new Error(
      `Missing original: ${input}. Supply an external archive with the manifest's original directory layout.`,
    );
  }
  if (hash(bytes) !== asset.sourceSha256)
    throw new Error(
      `Original changed: ${asset.source}. Review its manifest entry before replacing it.`,
    );
  await mkdir(path.dirname(output), { recursive: true });
  if (asset.source.endsWith(".mp4")) {
    await new Promise((resolve, reject) => {
      const proc = spawn(
        "ffmpeg",
        [
          "-hide_banner",
          "-loglevel",
          "error",
          "-y",
          "-i",
          input,
          "-map",
          "0:v:0",
          "-map",
          "0:a?",
          "-vf",
          "scale='min(1280,iw)':-2",
          "-r",
          "30",
          "-c:v",
          "libx264",
          "-preset",
          "medium",
          "-crf",
          "26",
          "-pix_fmt",
          "yuv420p",
          "-c:a",
          "aac",
          "-b:a",
          "96k",
          "-movflags",
          "+faststart",
          output,
        ],
        { stdio: "inherit", windowsHide: true },
      );
      proc.on("error", reject);
      proc.on("close", (code) =>
        code === 0 ? resolve() : reject(new Error(`FFmpeg exited ${code}`)),
      );
    });
  } else if (asset.output.endsWith(".webp")) {
    const logo = asset.output.includes("/logos/");
    await sharp(bytes)
      .rotate()
      .resize({
        width: logo ? 1200 : 1600,
        height: logo ? 1200 : 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp(logo ? { lossless: true, effort: 6 } : { quality: 82, effort: 6 })
      .toFile(output);
  } else {
    await copyFile(input, output);
  }
  const optimized = await readFile(output);
  if (!optimized.length) throw new Error(`Empty output: ${asset.output}`);
  asset.outputBytes = optimized.length;
  asset.outputSha256 = hash(optimized);
  if (asset.source !== asset.output) {
    try {
      await unlink(path.join(publicDir, asset.source));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  console.log(
    `${asset.source}: ${Math.round(asset.sourceBytes / 1024)} -> ${Math.round(asset.outputBytes / 1024)} KiB`,
  );
}

// Rewrite literal local URLs, including CSS and metadata, together with the files.
for (const file of await walk(path.join(root, "src"))) {
  if (!/\.(tsx?|jsx?|css|json)$/.test(file) || file.includes(`${path.sep}generated${path.sep}`))
    continue;
  const before = await readFile(file, "utf8");
  let after = before;
  for (const asset of manifest.assets) {
    const escaped = `/${asset.source}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    after = after.replace(
      new RegExp('(["\x27`(])' + escaped + '(?=["\x27`)#?])', "g"),
      (_, prefix) => `${prefix}/${asset.output}`,
    );
  }
  if (after !== before) await writeFile(file, after);
}
manifest.beforeBytes = manifest.assets.reduce((sum, asset) => sum + asset.sourceBytes, 0);
manifest.afterBytes = manifest.assets.reduce((sum, asset) => sum + asset.outputBytes, 0);
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `Public assets: ${(manifest.beforeBytes / 1048576).toFixed(2)} -> ${(manifest.afterBytes / 1048576).toFixed(2)} MiB`,
);
