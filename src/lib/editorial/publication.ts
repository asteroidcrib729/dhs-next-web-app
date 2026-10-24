import type { EditorialContent } from "./schema";

function comparable(content: EditorialContent) {
  // Placement does not change the article. Field order and line endings do not
  // either; Markdown's internal whitespace and tag order can change rendering.
  return JSON.stringify(
    Object.entries(content)
      .filter(([key]) => key !== "featured")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : value,
      ]),
  );
}
export function publicContentChanged(previous: EditorialContent, next: EditorialContent) {
  return comparable(previous) !== comparable(next);
}
export function publicationDates({
  previous,
  next,
  publishedAt,
  updatedAt,
  now,
}: {
  previous: EditorialContent | null;
  next: EditorialContent;
  publishedAt: Date | null;
  updatedAt: Date | null;
  now: Date;
}) {
  const first = publishedAt ?? now;
  return {
    publishedAt: first,
    publishedUpdatedAt:
      previous && !publicContentChanged(previous, next) ? (updatedAt ?? first) : now,
  };
}
export function recoverPublicationHistory(
  history: { snapshot: EditorialContent; createdAt: Date }[],
) {
  let previous: EditorialContent | null = null;
  let publishedAt: Date | null = null;
  let updatedAt: Date | null = null;
  for (const revision of history) {
    publishedAt ??= revision.createdAt;
    if (!previous || publicContentChanged(previous, revision.snapshot))
      updatedAt = revision.createdAt;
    previous = revision.snapshot;
  }
  return { previous, publishedAt, updatedAt };
}
