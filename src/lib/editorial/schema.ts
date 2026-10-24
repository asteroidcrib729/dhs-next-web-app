import { isRetiredBlogCategory, caseStudyReplacements } from "./catalogue-policy";
import { z } from "zod";

export const kindSchema = z.enum(["BLOG", "CASE_STUDY"]);
export type EditorialKind = z.infer<typeof kindSchema>;
const text = (max: number) => z.string().trim().max(max);
// Only local, inert images. Never fetch user-provided URLs on the server.
export function isMediaPath(value: string) {
  return (
    /^\/images\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpe?g|svg)$/.test(value) ||
    /^\/media\/[a-zA-Z0-9_-]+$/.test(value)
  );
}
export const contentSchema = z.object({
  title: text(180).min(1, "Add a title."),
  slug: text(140).regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase words separated by single hyphens.",
  ),
  excerpt: text(500),
  body: text(100000),
  category: text(80),
  tags: z.array(text(40).min(1)).max(12),
  coverImage: text(240).refine(
    (v) => !v || isMediaPath(v),
    "Choose a library image or upload a landscape photo.",
  ),
  coverAlt: text(250),
  seoTitle: text(100),
  seoDescription: text(320),
  canonicalUrl: text(500).refine(
    (v) =>
      !v ||
      (() => {
        try {
          const u = new URL(v);
          return u.protocol === "https:" && !u.username && !u.password && !u.search && !u.hash;
        } catch {
          return false;
        }
      })(),
    "Use a complete HTTPS canonical URL without a query or fragment.",
  ),
  noindex: z.boolean(),
  featured: z.boolean(),
  client: text(120),
  industry: text(120),
  challenge: text(2000),
  solution: text(4000),
  results: text(4000),
});
export type EditorialContent = z.infer<typeof contentSchema>;
export const emptyContent: EditorialContent = {
  title: "Untitled article",
  slug: "untitled-article",
  excerpt: "",
  body: "",
  category: "",
  tags: [],
  coverImage: "",
  coverAlt: "",
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  noindex: false,
  featured: false,
  client: "",
  industry: "",
  challenge: "",
  solution: "",
  results: "",
};
export function publishingIssues(content: EditorialContent, kind: EditorialKind) {
  const issues: string[] = [];
  if (!content.excerpt) issues.push("Add an excerpt.");
  if (content.body.trim().length < 80)
    issues.push("Write at least 80 characters of article content.");
  if (!content.category) issues.push("Choose a category.");
  if (kind === "BLOG" && isRetiredBlogCategory(content.category))
    issues.push("This category has been retired. Choose a current blog category.");
  if (kind === "CASE_STUDY" && Object.hasOwn(caseStudyReplacements, content.slug))
    issues.push("This case-study URL has been retired. Use the replacement topic and a new slug.");
  if (!content.coverImage || !content.coverAlt)
    issues.push("Add a cover image and descriptive alternative text.");
  if (!content.seoTitle || !content.seoDescription)
    issues.push("Add an SEO title and description.");
  if (kind === "CASE_STUDY" && (!content.challenge || !content.solution || !content.results))
    issues.push("Complete the challenge, solution and results.");
  return issues;
}
export function contentPath(kind: EditorialKind, slug: string) {
  return `/${kind === "BLOG" ? "blog" : "case-studies"}/${slug}`;
}
export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140)
    .replace(/-$/g, "");
}
export type PublicEntry = {
  id: string;
  kind: EditorialKind;
  content: EditorialContent;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
