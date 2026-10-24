import assert from "node:assert/strict";
import { test } from "node:test";
import {
  contentSchema,
  emptyContent,
  publishingIssues,
  slugify,
  isMediaPath,
} from "../src/lib/editorial/schema";
import { filterAnalyticsEvent } from "../src/lib/analytics-preference";
import { articleJsonLd, articleMetadata } from "../src/lib/editorial/seo";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import Markdown from "../src/components/editorial/Markdown";
test("publication requires accessible cover, SEO and case-study evidence fields", () => {
  assert.ok(publishingIssues(emptyContent, "BLOG").length >= 5);
  const complete = {
    ...emptyContent,
    excerpt: "Description",
    category: "IT",
    body: "A useful article with sufficient context. ".repeat(5),
    coverImage: "/images/case-studies/infrastructure.webp",
    coverAlt: "Server racks",
    seoTitle: "An introduction to dependable infrastructure",
    seoDescription: "How teams can plan dependable infrastructure.",
  };
  assert.deepEqual(publishingIssues(complete, "BLOG"), []);
  assert.ok(publishingIssues(complete, "CASE_STUDY").some((i) => i.includes("challenge")));
});
test("content validation rejects unsafe media and canonical URLs", () => {
  for (const path of [
    "https://evil.invalid/a.webp",
    "/images/../../secret.svg",
    "//evil.invalid/a.png",
    "/api/contact",
    "/media/id?x=1",
  ])
    assert.equal(isMediaPath(path), false, path);
  assert.equal(
    contentSchema.safeParse({ ...emptyContent, coverImage: "javascript:alert(1)" }).success,
    false,
  );
  for (const url of [
    "javascript:alert(1)",
    "https://user:pass@example.com/a",
    "https://example.com/a?email=private",
  ])
    assert.equal(contentSchema.safeParse({ ...emptyContent, canonicalUrl: url }).success, false);
  assert.equal(slugify("A Useful Guide: Café & Cloud!"), "a-useful-guide-cafe-cloud");
});
test("analytics defaults to measurement, removes query data and excludes private routes", () => {
  const event = { type: "pageview", url: "https://example.com/blog/a?email=private#name" };
  assert.equal(filterAnalyticsEvent(event, false)?.url, "https://example.com/blog/a");
  assert.equal(filterAnalyticsEvent(event, true), null);
  for (const path of ["/studio", "/studio/preview/abc", "/api/contact"])
    assert.equal(filterAnalyticsEvent({ url: `https://example.com${path}` }, false), null);
  assert.equal(filterAnalyticsEvent({ url: "invalid" }, false), null);
});
test("Markdown cannot execute HTML, script links or image tracking", () => {
  const html = renderToStaticMarkup(
    React.createElement(Markdown, {
      body: "<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))\n\n![tracking](https://evil.invalid/pixel.png)\n\n# Extra title\n\n## Useful section",
    }),
  );
  assert.ok(!html.includes("<script"));
  assert.ok(!html.includes("javascript:"));
  assert.ok(!html.includes("<img"));
  assert.ok(!html.includes("<h1"));
  assert.ok(html.includes("<h2>Useful section</h2>"));
});
test("SEO output escapes script delimiters and honors noindex", () => {
  const entry = {
    id: "test",
    kind: "BLOG" as const,
    content: { ...emptyContent, title: "</script><script>alert(1)</script>", noindex: true },
    createdAt: "2026-10-22T00:00:00Z",
    publishedAt: "2026-10-23T00:00:00Z",
    updatedAt: "2026-10-23T00:00:00Z",
  };
  assert.ok(!articleJsonLd(entry).includes("<"));
  assert.equal((articleMetadata(entry).robots as { index: boolean }).index, false);
});

test("homepage fills three article slots while preserving featured and publication order", async () => {
  const { selectHomepageArticles } = await import("../src/lib/editorial/homepage");
  const { legacyEntries } = await import("../src/lib/editorial/legacy");
  const published = legacyEntries
    .filter((entry) => entry.kind === "BLOG")
    .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const featured = published.filter((entry) => entry.content.featured);
  const recent = published.filter((entry) => !entry.content.featured);
  assert.equal(featured.length, 2);
  const originalOrder = published.map((entry) => entry.id);
  const selected = selectHomepageArticles(published);
  assert.deepEqual(
    selected.map((entry) => entry.id),
    [featured[0].id, featured[1].id, recent[0].id],
  );
  assert.equal(new Set(selected.map((entry) => entry.id)).size, 3);
  assert.ok(selected.every((entry) => entry.content.body.length > 500));
  assert.deepEqual(
    selectHomepageArticles(recent).map((entry) => entry.id),
    recent.slice(0, 3).map((entry) => entry.id),
  );
  assert.deepEqual(selectHomepageArticles(featured), featured);
  assert.deepEqual(selectHomepageArticles([]), []);
  assert.deepEqual(
    published.map((entry) => entry.id),
    originalOrder,
  );
});
