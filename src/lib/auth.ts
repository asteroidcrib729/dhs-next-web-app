import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getPrisma } from "./prisma";
import { studioOrigin } from "./studio-origin";

export function studioConfigured() {
  return Boolean(
    process.env.DATABASE_URL &&
    studioOrigin() &&
    (process.env.BETTER_AUTH_SECRET?.length ?? 0) >= 32,
  );
}
export function createStudioAuth(bootstrap = false) {
  if (!studioConfigured())
    throw new Error(
      "Configure DATABASE_URL, BETTER_AUTH_URL and a random BETTER_AUTH_SECRET of at least 32 characters.",
    );
  const origin = studioOrigin()!;
  if (
    process.env.NODE_ENV === "production" &&
    !origin.startsWith("https://") &&
    !/^http:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(origin)
  )
    throw new Error("Studio authentication requires HTTPS.");
  return betterAuth({
    appName: "Digital Horizon Systems Editorial Studio",
    baseURL: origin,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    trustedOrigins: [origin],
    emailAndPassword: {
      enabled: true,
      disableSignUp: !bootstrap,
      minPasswordLength: 14,
      maxPasswordLength: 128,
    },
    user: { additionalFields: { editor: { type: "boolean", defaultValue: false, input: false } } },
    session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60, cookieCache: { enabled: false } },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 60,
      customRules: { "/sign-in/email": { window: 60, max: 5 } },
    },
    advanced: {
      cookiePrefix: "dhs-studio",
      useSecureCookies: origin.startsWith("https://"),
      defaultCookieAttributes: { httpOnly: true, sameSite: "lax" },
    },
  });
}
let auth: ReturnType<typeof createStudioAuth> | undefined;
export function getStudioAuth() {
  return (auth ??= createStudioAuth());
}
