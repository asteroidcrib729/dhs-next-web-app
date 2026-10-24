import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/editorial/seo";
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
