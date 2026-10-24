import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Client generation and page builds do not require database credentials.
  datasource: { url: process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL },
});
