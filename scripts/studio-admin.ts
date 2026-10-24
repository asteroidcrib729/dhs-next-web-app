import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import { createStudioAuth, studioConfigured } from "../src/lib/auth";
import { getPrisma } from "../src/lib/prisma";
if (!studioConfigured())
  throw new Error("Configure DATABASE_URL, BETTER_AUTH_URL and BETTER_AUTH_SECRET first.");
const email = process.env.STUDIO_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.STUDIO_ADMIN_PASSWORD;
if (
  !email ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
  !password ||
  password.length < 14 ||
  password.length > 128
)
  throw new Error(
    "Set STUDIO_ADMIN_EMAIL and a unique STUDIO_ADMIN_PASSWORD (14 to 128 characters) privately in your environment.",
  );
const db = getPrisma();
try {
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    if (!process.argv.includes("--reset-password"))
      throw new Error(
        "Account already exists. Use --reset-password only when intentionally replacing its password and revoking all sessions.",
      );
    const hashed = await hashPassword(password);
    await db.$transaction(async (tx) => {
      await tx.account.updateMany({
        where: { userId: existing.id, providerId: "credential" },
        data: { password: hashed },
      });
      await tx.user.update({
        where: { id: existing.id },
        data: { editor: true, name: "Editorial team" },
      });
      await tx.session.deleteMany({ where: { userId: existing.id } });
    });
    console.log("Editor password replaced. All existing sessions were revoked.");
  } else {
    const result = await createStudioAuth(true).api.signUpEmail({
      body: { email, password, name: "Editorial team" },
    });
    await db.user.update({ where: { id: result.user.id }, data: { editor: true } });
    await db.session.deleteMany({ where: { userId: result.user.id } });
    console.log(
      "Private editor account created. Sign in at /studio. Public signup remains disabled.",
    );
  }
} finally {
  await db.$disconnect();
}
