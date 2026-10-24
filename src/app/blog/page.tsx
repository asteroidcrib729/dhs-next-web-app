import Header from "@/components/Header";
import BlogPageTop from "@/app/blog/components/BlogPageTop";
import Catalogue from "@/components/editorial/Catalogue";
import { listPublished } from "@/lib/editorial/store";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export default async function Blog() {
  const entries = await listPublished("BLOG");
  return (
    <>
      <Header />

      <BlogPageTop />

      <Catalogue
        entries={entries.map(({ id, kind, content: c }) => ({
          id,
          kind,
          content: {
            title: c.title,
            slug: c.slug,
            excerpt: c.excerpt,
            category: c.category,
            coverImage: c.coverImage,
            featured: c.featured,
          },
        }))}
      />

      <CTA />

      <Footer />
    </>
  );
}
