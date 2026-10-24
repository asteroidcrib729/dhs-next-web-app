import { notFound, permanentRedirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Article from "@/components/editorial/Article";
import { findPublished } from "@/lib/editorial/store";
import { articleMetadata, articleJsonLd } from "@/lib/editorial/seo";
import { contentPath } from "@/lib/editorial/schema";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = await findPublished("CASE_STUDY", slug);
  return entry
    ? articleMetadata(entry)
    : { title: "Case study not found", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const entry = await findPublished("CASE_STUDY", slug);
  if (!entry) notFound();
  if (entry.content.slug !== slug) permanentRedirect(contentPath(entry.kind, entry.content.slug));
  return (
    <>
      <Header />
      <main>
        <Article entry={entry} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd(entry) }}
        />
      </main>
      <Footer />
    </>
  );
}
