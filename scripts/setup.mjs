import { copyFile } from "node:fs/promises";
import { constants } from "node:fs";

try {
  await copyFile(
    new URL("../.env.example", import.meta.url),
    new URL("../.env", import.meta.url),
    constants.COPYFILE_EXCL,
  );
  console.log(
    "Created .env. Configure DATABASE_URL for storage and the documented authentication settings for /studio. Email requires all three notification settings.",
  );
} catch (error) {
  if (error.code !== "EEXIST") throw error;
  console.log("Existing .env preserved.");
}
