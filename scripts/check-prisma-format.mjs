import { mkdtemp, readFile, writeFile, unlink, rmdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageUrl = new URL("../node_modules/prisma/package.json", import.meta.url);
const { bin } = JSON.parse(await readFile(packageUrl, "utf8"));
const prismaCli = fileURLToPath(new URL(bin.prisma, packageUrl));
const schema = new URL("../prisma/schema.prisma", import.meta.url);
const original = await readFile(schema, "utf8");
const directory = await mkdtemp(path.join(tmpdir(), "tvs-prisma-format-"));
const temporarySchema = path.join(directory, "schema.prisma");
try {
  await writeFile(temporarySchema, original);
  const result = spawnSync(process.execPath, [prismaCli, "format", "--schema", temporarySchema], {
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  const formatted = await readFile(temporarySchema, "utf8");
  if (original.replaceAll("\r\n", "\n") !== formatted.replaceAll("\r\n", "\n")) {
    console.error("Prisma schema is not formatted. Run npm run format.");
    process.exitCode = 1;
  } else console.log("Prisma schema formatting verified.");
} finally {
  await unlink(temporarySchema);
  await rmdir(directory);
}
