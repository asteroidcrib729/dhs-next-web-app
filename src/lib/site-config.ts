// Only intentionally public settings may cross the server/client boundary.
export const publicLinkKeys = [
  "SITE_PARTNER_SANGFOR",
  "SITE_PARTNER_VMWARE",
  "SITE_PARTNER_MICROSOFT",
  "SITE_PARTNER_ORACLE",
  "SITE_PARTNER_H3C",
  "SITE_PARTNER_CONSTRUCTOR",
  "SITE_PARTNER_VEEAM",
  "SITE_PARTNER_ZWSOFT",
  "SITE_PARTNER_BARRACUDA",
  "SITE_PARTNER_SOLARWINDS",
  "SITE_PARTNER_GOOGLE",
  "SITE_PARTNER_GOOGLE_CLOUD",
  "SITE_PARTNER_META",
  "SITE_PARTNER_X",
  "SITE_PARTNER_TIKTOK",
  "SITE_PARTNER_CLUTCH",
  "SITE_PARTNER_SHOPIFY",
  "SITE_PARTNER_HUBSPOT",
  "SITE_PARTNER_AWS",
  "SITE_PROJECT_ENG",
  "SITE_PROJECT_JSN",
  "SITE_PROJECT_MISSION",
  "SITE_PROJECT_NECTRONIX",
  "SITE_PROJECT_711",
  "SITE_PROJECT_SHARZ",
  "SITE_SOCIAL_FACEBOOK_URL",
  "SITE_SOCIAL_INSTAGRAM_URL",
  "SITE_SOCIAL_LINKEDIN_URL",
] as const;

export function safeSiteUrl(value: string | undefined, internal = false): string {
  const url = value?.trim() ?? "";
  if (!url || /[\u0000-\u0020\\]/.test(url)) return "";
  if (internal && url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) && !parsed.username && !parsed.password
      ? parsed.href
      : "";
  } catch {
    return "";
  }
}

const defaultPolicyDate = "2026-10-23";
export function policyDate(value: string | undefined) {
  const raw = value?.trim() ?? "";
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(raw + "T00:00:00.000Z") : null;
  const iso =
    parsed && !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === raw
      ? raw
      : defaultPolicyDate;
  return {
    iso,
    label: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(iso + "T00:00:00.000Z")),
  };
}
export function createLegalDates(env: Record<string, string | undefined>) {
  return {
    terms: {
      effective: policyDate(env.SITE_TERMS_EFFECTIVE_DATE),
      reviewed: policyDate(env.SITE_TERMS_LAST_REVIEWED_DATE),
    },
    privacy: {
      effective: policyDate(env.SITE_PRIVACY_EFFECTIVE_DATE),
      reviewed: policyDate(env.SITE_PRIVACY_LAST_REVIEWED_DATE),
    },
    cookies: {
      effective: policyDate(env.SITE_COOKIES_EFFECTIVE_DATE),
      reviewed: policyDate(env.SITE_COOKIES_LAST_REVIEWED_DATE),
    },
  };
}
export type PolicyKey = keyof ReturnType<typeof createLegalDates>;
export function createSiteConfig(env: Record<string, string | undefined>) {
  const phone = env.SITE_PHONE?.trim() ?? "";
  const phoneDigits = phone.replace(/[\s().-]/g, "");
  const validPhone = /^\+?[0-9]{7,15}$/.test(phoneDigits);
  const whatsapp = env.SITE_WHATSAPP_NUMBER?.replace(/[\s+().-]/g, "") ?? "";
  const email = env.SITE_PUBLIC_EMAIL?.trim() ?? "";
  const validEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
  return {
    legalDates: createLegalDates(env),
    phone: validPhone ? phone : "",
    phoneHref: validPhone ? `tel:${phoneDigits}` : "",
    whatsappHref: /^[0-9]{7,15}$/.test(whatsapp) ? `https://wa.me/${whatsapp}` : "",
    email: validEmail ? email : "",
    emailHref: validEmail ? `mailto:${email}` : "",
    consultationUrl: safeSiteUrl(env.SITE_CONSULTATION_URL, true) || "/contact",
    address: env.SITE_ADDRESS?.trim() ?? "",
    hours: env.SITE_OFFICE_HOURS?.trim() ?? "",
    mapEmbedUrl: safeSiteUrl(env.SITE_MAP_EMBED_URL),
    links: Object.fromEntries(publicLinkKeys.map((key) => [key, safeSiteUrl(env[key])])) as Record<
      (typeof publicLinkKeys)[number],
      string
    >,
  };
}
export type SiteConfig = ReturnType<typeof createSiteConfig>;
