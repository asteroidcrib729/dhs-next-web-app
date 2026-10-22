import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, "public");
const manifest = JSON.parse(
  await readFile(path.join(root, "development-plans/assets-manifest.json"), "utf8"),
);
const errors = [];
let total = 0;
const outputs = new Set(manifest.assets.map((asset) => asset.output));
async function inventory(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await inventory(file);
      continue;
    }
    const relative = path.relative(publicDir, file).split(path.sep).join("/");
    if (!outputs.has(relative))
      errors.push(
        `Unregistered public asset: ${relative}. Add it to the manifest before committing.`,
      );
  }
}
await inventory(publicDir);
for (const asset of manifest.assets) {
  try {
    const bytes = await readFile(path.join(publicDir, asset.output));
    total += bytes.length;
    if (
      bytes.length !== asset.outputBytes ||
      createHash("sha256").update(bytes).digest("hex") !== asset.outputSha256
    )
      errors.push(`Manifest mismatch: ${asset.output}`);
    if (bytes.length > 5 * 1048576) errors.push(`Over 5 MiB per-file budget: ${asset.output}`);
  } catch {
    errors.push(`Missing asset: ${asset.output}`);
  }
}

async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "generated") continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scan(file);
      continue;
    }
    if (!/\.(tsx?|jsx?|css|json)$/.test(file)) continue;
    const source = await readFile(file, "utf8");
    // Literal root-relative media URLs; avoid remote URLs and ordinary routes.
    const urls = source.matchAll(
      /(?:["'`(])(\/(?!\/)[^"'`()\s<>?#]+\.(?:png|jpe?g|webp|avif|svg|mp4|woff2?|ico))(?:["'`)?#])/g,
    );
    for (const [, url] of urls) {
      try {
        await stat(path.join(publicDir, url.slice(1)));
      } catch {
        errors.push(`${path.relative(root, file)}: missing ${url}`);
      }
    }
  }
}
await scan(path.join(root, "src"));
if (total > 20 * 1048576) errors.push("Public assets exceed the 20 MiB total budget.");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${manifest.assets.length} asset hashes and source URLs; ${(total / 1048576).toFixed(2)} MiB (budget: 20 MiB).`,
  );
