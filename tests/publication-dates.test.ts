import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyContent, type EditorialContent } from "../src/lib/editorial/schema";
import {
  publicContentChanged,
  publicationDates,
  recoverPublicationHistory,
} from "../src/lib/editorial/publication";
import { readingMinutes, formatArticleDate } from "../src/lib/editorial/article-info";
import { articleJsonLd, articleMetadata } from "../src/lib/editorial/seo";

const original = {
  ...emptyContent,
  title: "A useful article",
  body: "First line\nSecond line",
  tags: ["Web", "Planning"],
};
const first = new Date("2026-01-10T08:00:00Z");
const revised = new Date("2026-01-12T08:00:00Z");
const now = new Date("2026-01-12T09:00:00Z");
test("every article/SEO field counts on publication, except featured placement", () => {
  for (const key of Object.keys(original) as (keyof EditorialContent)[]) {
    const value = original[key];
    const next = {
      ...original,
      [key]: Array.isArray(value)
        ? ["New topic"]
        : typeof value === "boolean"
          ? !value
          : value + " changed",
    };
    assert.equal(publicContentChanged(original, next), key !== "featured", key);
  }
  assert.equal(
    publicContentChanged(
      original,
      Object.fromEntries(Object.entries(original).reverse()) as EditorialContent,
    ),
    false,
  );
  assert.equal(
    publicContentChanged(original, { ...original, body: "  First line\r\nSecond line\n" }),
    false,
  );
  assert.equal(
    publicContentChanged(original, { ...original, body: "First line  \nSecond line" }),
    true,
  );
  assert.equal(
    publicContentChanged(original, { ...original, tags: [...original.tags].reverse() }),
    true,
  );
});
test("first publication initializes public dates; unchanged and featured-only republishes preserve them", () => {
  assert.deepEqual(
    publicationDates({ previous: null, next: original, publishedAt: null, updatedAt: null, now }),
    { publishedAt: now, publishedUpdatedAt: now },
  );
  for (const next of [original, { ...original, featured: true }])
    assert.deepEqual(
      publicationDates({ previous: original, next, publishedAt: first, updatedAt: revised, now }),
      { publishedAt: first, publishedUpdatedAt: revised },
    );
});
test("same-day edits and reversions advance only the version date", () => {
  const changed = { ...original, body: original.body + "\nA correction." };
  for (const [previous, next] of [
    [original, changed],
    [changed, original],
  ])
    assert.deepEqual(
      publicationDates({ previous, next, publishedAt: first, updatedAt: revised, now }),
      { publishedAt: first, publishedUpdatedAt: now },
    );
});
test("older withdrawn entries recover original publication and real revisions from retained history", () => {
  const changed = { ...original, title: "Revised title" };
  const recovered = recoverPublicationHistory([
    { snapshot: original, createdAt: first },
    { snapshot: changed, createdAt: revised },
    { snapshot: { ...changed, featured: true }, createdAt: now },
  ]);
  assert.equal(recovered.publishedAt, first);
  assert.equal(recovered.updatedAt, revised);
  assert.deepEqual(publicationDates({ ...recovered, next: changed, now }), {
    publishedAt: first,
    publishedUpdatedAt: revised,
  });
  assert.deepEqual(recoverPublicationHistory([]), {
    previous: null,
    publishedAt: null,
    updatedAt: null,
  });
});
test("reading time uses current rendered article sections rather than legacy labels", () => {
  const content = { ...emptyContent, body: "word ".repeat(400), challenge: "word ".repeat(201) };
  assert.equal(readingMinutes({ kind: "BLOG", content }), 2);
  assert.equal(readingMinutes({ kind: "CASE_STUDY", content }), 4);
  assert.equal(readingMinutes({ kind: "BLOG", content: { ...emptyContent, body: "" } }), 1);
  assert.equal(
    readingMinutes({
      kind: "BLOG",
      content: {
        ...emptyContent,
        body: "[Guide](https://example.invalid/" + "tracking-".repeat(1000) + ")",
      },
    }),
    1,
  );
});
test("creation, first publication and actual modification remain separate in search metadata", () => {
  const entry = {
    id: "test",
    kind: "BLOG" as const,
    content: original,
    createdAt: "2026-01-01T23:30:00Z",
    publishedAt: first.toISOString(),
    updatedAt: revised.toISOString(),
  };
  const data = JSON.parse(articleJsonLd(entry));
  assert.equal(data.dateCreated, entry.createdAt);
  assert.equal(data.datePublished, entry.publishedAt);
  assert.equal(data.dateModified, entry.updatedAt);
  assert.equal(
    (articleMetadata(entry).openGraph as { modifiedTime: string }).modifiedTime,
    entry.updatedAt,
  );
  assert.equal(formatArticleDate(entry.createdAt), "January 1, 2026");
});
