import type { PublicEntry } from "./schema";

// The store supplies published articles in newest-first order. Stable sorting
// preserves that order within featured and non-featured groups.
export function selectHomepageArticles(published: readonly PublicEntry[]): PublicEntry[] {
  return published
    .toSorted((a, b) => Number(b.content.featured) - Number(a.content.featured))
    .slice(0, 3);
}
