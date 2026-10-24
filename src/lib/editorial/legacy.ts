import blogs from "./legacy-blog.json";
import cases from "./legacy-case-studies.json";
import { emptyContent, slugify, type PublicEntry } from "./schema";
// Bundled dates are recorded metadata, never filesystem/build timestamps.
function catalogueDates(record: { date: string; createdAt?: string; updatedAt?: string }) {
  return {
    createdAt: new Date(record.createdAt ?? record.date).toISOString(),
    publishedAt: new Date(record.date).toISOString(),
    updatedAt: new Date(record.updatedAt ?? record.date).toISOString(),
  };
}
// Original articles and legacy summaries share one import path. All imports remain private drafts.
export const legacyEntries: PublicEntry[] = [
  ...blogs.map((post) => ({
    id: `legacy-blog-${post.id}`,
    kind: "BLOG" as const,
    ...catalogueDates(post),
    content: {
      ...emptyContent,
      noindex: !post.reviewed,
      title: post.title,
      slug: slugify(post.title),
      excerpt: post.excerpt,
      body: post.body,
      category: post.category,
      coverImage: post.image,
      coverAlt: post.coverAlt,
      seoTitle: post.title.slice(0, 100),
      seoDescription: post.excerpt,
      featured: post.featured,
    },
  })),
  ...cases.map((post) => ({
    id: `legacy-case-${post.id}`,
    kind: "CASE_STUDY" as const,
    ...catalogueDates({ date: "2026-10-23", ...post }),
    content: {
      ...emptyContent,
      noindex: true,
      title: post.title,
      slug: slugify(post.title),
      excerpt: post.description,
      body: post.body ?? post.description,
      category: post.industry,
      coverImage: post.image,
      coverAlt: post.coverAlt ?? post.title,
      seoTitle: post.title.slice(0, 100),
      seoDescription: post.description,
      client: post.client,
      industry: post.industry,
      challenge: post.challenge,
      solution: post.solution,
      results: Object.entries(post.results)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value}`)
        .join("\n"),
      tags: post.services,
    },
  })),
];
