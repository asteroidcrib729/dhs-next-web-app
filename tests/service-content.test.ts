import assert from "node:assert/strict";
import { test } from "node:test";
import { isGeneralPhoneNumber } from "../src/lib/contact-phone";
import {
  serviceGroups,
  contactServiceOptions,
  isSupportedContactService,
} from "../src/lib/services";
import { legacyEntries } from "../src/lib/editorial/legacy";
import {
  resolvePublicSlug,
  blogCategories,
  caseStudyReplacements,
  isCurrentPublicContent,
} from "../src/lib/editorial/catalogue-policy";
import { contentSchema, emptyContent, publishingIssues } from "../src/lib/editorial/schema";
test("phone input accepts local and international conventions and extensions", () => {
  for (const phone of [
    "",
    "0300 1234567",
    "+92 300 1234567",
    "0044 20 7946 0958",
    "+44 (0)20 7946 0958",
    "+1 (212) 555-0199 ext. 123",
    "021-34567890 x42",
    "+49 30 123456 #123",
  ])
    assert.equal(isGeneralPhoneNumber(phone), true, phone);
  for (const phone of [
    "123",
    "+",
    "call me",
    "++92 3001234567",
    "1234567890123456",
    "1234567 ext 123456789",
    "1234567<script>",
  ])
    assert.equal(isGeneralPhoneNumber(phone), false, phone);
});
test("phone validation rejects oversized and adversarial input without ambiguous matching", () => {
  for (const phone of [
    "1234567" + "\t".repeat(120) + "!",
    "1234567" + " ".repeat(110) + "ext. nope",
    "1234567 ext",
    "1234567 x",
    "1234567 #",
    "1234567 ext 12 x34",
    "1234567 ext. 123456789",
    "1234567+123",
    "1234567" + " ".repeat(122),
    "1234567" + "\t".repeat(100_000) + "!",
    " ".repeat(100_000),
  ])
    assert.equal(isGeneralPhoneNumber(phone), false, "reject malformed or oversized phone");
  assert.equal(isGeneralPhoneNumber("1234567" + " ".repeat(121)), true);
  for (const phone of [
    "  +92 (300) 123-4567 EXT. 12345678  ",
    "0044 20 7946 0958x42",
    "1234567#1",
    "1234567\tX\t12",
  ])
    assert.equal(isGeneralPhoneNumber(phone), true, phone);
});

test("services and contact options share the revised offering", () => {
  assert.deepEqual(
    serviceGroups.map((g) => g.title),
    ["Development & Marketing Solutions", "IT Solutions"],
  );
  assert.deepEqual(
    serviceGroups[0].services.map((s) => s.title),
    ["Web Development", "E-Commerce & Email Marketing", "Custom Desktop Applications"],
  );
  assert.ok(serviceGroups[0].services[0].description.includes("available on demand"));
  assert.ok(serviceGroups[0].services[0].description.includes("pricing discussed"));
  for (const group of serviceGroups)
    for (const service of group.services) {
      assert.ok(!Object.hasOwn(service, "pricing"));
      assert.ok(!Object.hasOwn(service, "results"));
      assert.ok(!/starting at|\$[0-9]/i.test(JSON.stringify(service)));
    }
  for (const value of [
    "digital-marketing",
    "content-marketing",
    "ppc",
    "social-media",
    "mobile-app-development",
    "hardware",
    "server-hardware",
    "seo",
    "email-marketing",
  ])
    assert.equal(isSupportedContactService(value), false);
  assert.deepEqual(
    serviceGroups[1].services.map((s) => s.title),
    ["Cloud Solutions", "Cybersecurity Solutions", "Network Infrastructure"],
  );
  assert.ok(!/server|hardware|procurement/i.test(JSON.stringify(serviceGroups)));
  for (const option of contactServiceOptions) assert.ok(isSupportedContactService(option.value));
});
test("catalogue removes retired posts and supplies complete articles in two new categories", () => {
  const blogs = legacyEntries.filter((e) => e.kind === "BLOG");
  assert.equal(blogs.length, 31);
  assert.deepEqual(new Set(blogs.map((e) => e.content.category)), new Set(blogCategories));
  for (const entry of blogs) {
    assert.ok(isCurrentPublicContent(entry.kind, entry.content));
    assert.ok(entry.content.coverImage.startsWith("/images/editorial/"));
    assert.ok(contentSchema.safeParse(entry.content).success, entry.content.title);
  }
  for (const category of ["Web Development", "Desktop Solutions"]) {
    const entries = blogs.filter((e) => e.content.category === category);
    assert.equal(entries.length, 3);
    for (const e of entries) {
      assert.ok(e.content.body.split(/\s+/).length >= 230);
      assert.ok(!e.content.noindex);
      assert.deepEqual(publishingIssues(e.content, "BLOG"), []);
    }
  }
  for (const id of [1, 2, 3, 4, 5, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 41, 42, 43, 44, 45])
    assert.ok(!blogs.some((e) => e.id === "legacy-blog-" + id));
});
test("retired imports cannot be published or exposed, including case-study aliases", () => {
  for (const category of [
    "Digital Marketing",
    "Content Marketing",
    "PPC",
    "Social Media",
    "  PPC  ",
  ]) {
    const content = { ...emptyContent, category };
    assert.ok(!isCurrentPublicContent("BLOG", content));
    assert.ok(publishingIssues(content, "BLOG").some((i) => i.includes("retired")));
  }
  const cases = legacyEntries.filter((e) => e.kind === "CASE_STUDY");
  assert.equal(cases.length, 6);
  for (const [oldSlug, replacement] of Object.entries(caseStudyReplacements)) {
    assert.ok(!isCurrentPublicContent("CASE_STUDY", { category: "", slug: oldSlug }));
    const entry = cases.find((e) => e.content.slug === replacement);
    assert.ok(entry);
    assert.match(entry.content.excerpt, /Illustrative/i);
    assert.match(entry.content.results, /not a verified client result/);
    assert.ok(contentSchema.safeParse(entry.content).success);
    assert.deepEqual(publishingIssues(entry.content, "CASE_STUDY"), []);
  }
});
test("bundled editorial copy contains no double hyphens or long dashes", () => {
  for (const e of legacyEntries)
    for (const value of Object.values(e.content))
      if (typeof value === "string") assert.ok(!/--|[\u2013\u2014]/.test(value), e.content.title);
});

test("replacement lookup accepts only its own explicit slug keys", () => {
  for (const slug of ["constructor", "toString", "__proto__", "a-normal-slug"])
    assert.equal(resolvePublicSlug("CASE_STUDY", slug), slug);
  for (const [slug, replacement] of Object.entries(caseStudyReplacements)) {
    assert.equal(resolvePublicSlug("CASE_STUDY", slug), replacement);
    assert.equal(resolvePublicSlug("BLOG", slug), slug);
  }
});

test("bundled public content no longer advertises the retired hardware offering", () => {
  for (const entry of legacyEntries)
    assert.ok(
      !/Server & Hardware|Hardware Procurement|Server Configuration|\b(?:Dell|HP|Lenovo)\b/i.test(
        JSON.stringify(entry.content),
      ),
      entry.content.title,
    );
});
