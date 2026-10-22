import { copyFile } from "node:fs/promises";
import { constants } from "node:fs";

try {
  await copyFile(
    new URL("../.env.example", import.meta.url),
    new URL("../.env", import.meta.url),
    constants.COPYFILE_EXCL,
  );
  console.log(
    "Created .env. Add DATABASE_URL to enable contact storage; add RESEND_API_KEY to enable email.",
  );
} catch (error) {
  if (error.code !== "EEXIST") throw error;
  console.log("Existing .env preserved.");
}
