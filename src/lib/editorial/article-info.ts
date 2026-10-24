import type { PublicEntry } from "./schema";

export function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(iso),
  );
}
export function readingMinutes(entry: Pick<PublicEntry, "kind" | "content">) {
  const c = entry.content;
  const sections = [c.excerpt, c.body];
  if (entry.kind === "CASE_STUDY")
    sections.push(c.client, c.industry, c.challenge, c.solution, c.results);
  const text = sections
    .join(" ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ");
  const words = text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
  return Math.max(1, Math.ceil(words.length / 200));
}
