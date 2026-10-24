import type { MetadataRoute } from "next";
import { listPublished } from "@/lib/editorial/store";
import { contentPath } from "@/lib/editorial/schema";
import { siteOrigin } from "@/lib/editorial/seo";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = siteOrigin();
  if (!origin) return [];
  const groups = await Promise.all([listPublished("BLOG"), listPublished("CASE_STUDY")]);
  const entries = groups.flat();
  return [
    ...[
      "",
      "/about",
      "/services",
      "/portfolio",
      "/contact",
      "/blog",
      "/case-studies",
      "/cookie-policy",
      "/privacy-policy",
      "/terms-and-conditions",
    ].map((path) => ({ url: origin + path })),
    ...entries
      .filter(
        (e) =>
          !e.content.noindex &&
          (!e.content.canonicalUrl ||
            e.content.canonicalUrl === origin + contentPath(e.kind, e.content.slug)),
      )
      .map((e) => ({
        url: origin + contentPath(e.kind, e.content.slug),
        lastModified: e.updatedAt,
      })),
  ];
}
