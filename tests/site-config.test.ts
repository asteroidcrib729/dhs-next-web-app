import assert from "node:assert/strict";
import { test } from "node:test";
import { createSiteConfig, publicLinkKeys, safeSiteUrl } from "../src/lib/site-config";

test("missing public details are hidden and consultation stays on site", () => {
  const config = createSiteConfig({});
  assert.equal(config.phone, "");
  assert.equal(config.email, "");
  assert.equal(config.whatsappHref, "");
  assert.equal(config.consultationUrl, "/contact");
  assert.ok(Object.values(config.links).every((value) => value === ""));
});
test("configured phone, WhatsApp and email are normalized independently", () => {
  const config = createSiteConfig({
    SITE_PHONE: "+1 (202) 555-0147",
    SITE_WHATSAPP_NUMBER: "+44 7700 900123",
    SITE_PUBLIC_EMAIL: "hello@example.invalid",
  });
  assert.equal(config.phoneHref, "tel:+12025550147");
  assert.equal(config.whatsappHref, "https://wa.me/447700900123");
  assert.equal(config.emailHref, "mailto:hello@example.invalid");
  assert.equal(
    createSiteConfig({
      SITE_PHONE: "call us",
      SITE_PUBLIC_EMAIL: "hello@example.invalid?bcc=someone",
      SITE_WHATSAPP_NUMBER: "javascript:alert(1)",
    }).email,
    "",
  );
});
test("URLs allow only safe web destinations and explicit local consultation paths", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,evil",
    "//example.com",
    "/\\example.com",
    "https://user:password@example.com",
    "https://example.com/\nheader",
  ])
    assert.equal(safeSiteUrl(url, true), "", url);
  assert.equal(safeSiteUrl("/contact#form", true), "/contact#form");
  assert.equal(safeSiteUrl("/contact"), "");
  assert.equal(
    createSiteConfig({ SITE_CONSULTATION_URL: "javascript:alert(1)" }).consultationUrl,
    "/contact",
  );
  assert.equal(
    createSiteConfig({ SITE_CONSULTATION_URL: "https://example.invalid/book" }).consultationUrl,
    "https://example.invalid/book",
  );
});
test("every public link setting is configurable without hardcoded fallbacks", () => {
  for (const key of publicLinkKeys) {
    const url = `https://example.invalid/${key}`;
    assert.equal(createSiteConfig({ [key]: url }).links[key], url);
    assert.equal(createSiteConfig({ [key]: "javascript:alert(1)" }).links[key], "");
  }
});
test("public configuration serializes no database, email provider or unlisted settings", () => {
  const config = createSiteConfig({
    DATABASE_URL: "postgresql://private",
    RESEND_API_KEY: "private-secret",
    CONTACT_EMAIL_FROM: "private-sender",
    CONTACT_EMAIL_TO: "private-recipient",
    SITE_UNKNOWN: "private-unlisted",
    BETTER_AUTH_SECRET: "private-auth-secret",
    STUDIO_ADMIN_EMAIL: "private-editor@example.invalid",
    STUDIO_ADMIN_PASSWORD: "private-editor-password",
    SITE_PUBLIC_EMAIL: "public@example.invalid",
  });
  const serialized = JSON.stringify(config);
  assert.ok(!serialized.includes("private"));
  assert.ok(serialized.includes("public@example.invalid"));
  assert.deepEqual(Object.keys(config.links), [...publicLinkKeys]);
});

test("retired hardware vendor settings do not enter public configuration", () => {
  const config = createSiteConfig({
    SITE_PARTNER_DELL: "https://retired.example/dell",
    SITE_PARTNER_HP: "https://retired.example/hp",
    SITE_PARTNER_LENOVO: "https://retired.example/lenovo",
  });
  assert.ok(!JSON.stringify(config).includes("retired.example"));
});
