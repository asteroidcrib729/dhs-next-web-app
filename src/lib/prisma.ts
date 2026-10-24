import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required for application storage.");

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: url }),
    log: ["error", "warn"],
  });
  globalForPrisma.prisma = prisma;
  return prisma;
}
