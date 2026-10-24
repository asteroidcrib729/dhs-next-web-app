import type { Metadata } from "next";
import { contentPath, type PublicEntry } from "./schema";
export function siteOrigin() {
  try {
    const u = new URL(process.env.SITE_URL ?? "");
    return ["http:", "https:"].includes(u.protocol) && !u.username && !u.password
      ? u.origin
      : undefined;
  } catch {
    return undefined;
  }
}
export function articleMetadata(entry: PublicEntry): Metadata {
  const c = entry.content;
  const origin = siteOrigin();
  const canonical =
    c.canonicalUrl || (origin ? origin + contentPath(entry.kind, c.slug) : undefined);
  const image = origin && c.coverImage ? origin + c.coverImage : undefined;
  return {
    title: c.seoTitle || c.title,
    description: c.seoDescription || c.excerpt,
    alternates: { canonical },
    robots: { index: !c.noindex, follow: true },
    openGraph: {
      type: "article",
      title: c.seoTitle || c.title,
      description: c.seoDescription || c.excerpt,
      url: canonical,
      siteName: "Digital Horizon Systems",
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt,
      authors: ["Digital Horizon Systems"],
      images: image ? [{ url: image, alt: c.coverAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: c.seoTitle || c.title,
      description: c.seoDescription || c.excerpt,
      images: image ? [image] : [],
    },
  };
}
export function articleJsonLd(entry: PublicEntry) {
  const c = entry.content;
  const origin = siteOrigin();
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": entry.kind === "BLOG" ? "BlogPosting" : "Article",
    headline: c.title,
    description: c.seoDescription || c.excerpt,
    dateCreated: entry.createdAt,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt,
    author: { "@type": "Organization", name: "Digital Horizon Systems" },
    publisher: { "@type": "Organization", name: "Digital Horizon Systems" },
    ...(origin
      ? {
          mainEntityOfPage: c.canonicalUrl || origin + contentPath(entry.kind, c.slug),
          image: origin + c.coverImage,
        }
      : {}),
    keywords: c.tags.join(", "),
  }).replace(/</g, "\\u003c");
}
