export const blogCategories = [
  "IT Solutions",
  "SEO",
  "Cybersecurity",
  "E-commerce",
  "Network Infrastructure",
  "Web Development",
  "Desktop Solutions",
] as const;
const retiredCategories = new Set([
  "digital marketing",
  "content marketing",
  "ppc",
  "social media",
]);
export function isRetiredBlogCategory(category: string) {
  return retiredCategories.has(category.trim().toLowerCase());
}
export const caseStudyReplacements: Record<string, string> = {
  "tech-startup-scales-infrastructure-with-h3c-network-solutions":
    "a-customized-desktop-workflow-for-an-operations-team",
  "restaurant-chain-increases-online-orders-by-300-with-digital-marketing":
    "a-connected-business-website-with-seo-and-email-workflows",
};
export function isCurrentPublicContent(kind: string, content: { category: string; slug: string }) {
  return kind === "BLOG"
    ? !isRetiredBlogCategory(content.category)
    : !Object.hasOwn(caseStudyReplacements, content.slug);
}

export function resolvePublicSlug(kind: string, slug: string): string {
  return kind === "CASE_STUDY" && Object.hasOwn(caseStudyReplacements, slug)
    ? caseStudyReplacements[slug]
    : slug;
}
