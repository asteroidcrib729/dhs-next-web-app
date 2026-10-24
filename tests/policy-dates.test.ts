import assert from "node:assert/strict";
import { test } from "node:test";
import { createLegalDates, createSiteConfig, policyDate } from "../src/lib/site-config";

test("each policy receives its own effective and reviewed date", () => {
  const config = createSiteConfig({
    SITE_TERMS_EFFECTIVE_DATE: "2026-01-02",
    SITE_TERMS_LAST_REVIEWED_DATE: "2026-02-03",
    SITE_PRIVACY_EFFECTIVE_DATE: "2026-03-04",
    SITE_PRIVACY_LAST_REVIEWED_DATE: "2026-04-05",
    SITE_COOKIES_EFFECTIVE_DATE: "2026-05-06",
    SITE_COOKIES_LAST_REVIEWED_DATE: "2026-06-07",
  });
  assert.deepEqual(
    [
      config.legalDates.terms.effective.iso,
      config.legalDates.terms.reviewed.iso,
      config.legalDates.privacy.effective.iso,
      config.legalDates.privacy.reviewed.iso,
      config.legalDates.cookies.effective.iso,
      config.legalDates.cookies.reviewed.iso,
    ],
    ["2026-01-02", "2026-02-03", "2026-03-04", "2026-04-05", "2026-05-06", "2026-06-07"],
  );
  assert.equal(config.legalDates.terms.effective.label, "January 2, 2026");
});
test("policy dates reject impossible dates and arbitrary text", () => {
  const fallback = policyDate(undefined);
  for (const date of [
    "2026-02-29",
    "2026-04-31",
    "2026-13-01",
    "2026-1-02",
    "<script>alert(1)</script>",
    "not a date",
    "",
  ])
    assert.deepEqual(policyDate(date), fallback, date);
  assert.equal(policyDate("2028-02-29").iso, "2028-02-29");
});
test("date labels are timezone-independent and defaults are deterministic", () => {
  const original = process.env.TZ;
  try {
    process.env.TZ = "America/Los_Angeles";
    const west = policyDate("2026-10-23");
    process.env.TZ = "Asia/Karachi";
    assert.deepEqual(policyDate("2026-10-23"), west);
    assert.equal(west.label, "October 23, 2026");
    const defaults = createLegalDates({});
    assert.deepEqual(defaults.terms, defaults.privacy);
    assert.deepEqual(defaults.privacy, defaults.cookies);
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});
