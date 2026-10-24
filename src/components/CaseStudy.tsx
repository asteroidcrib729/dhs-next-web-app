import Link from "next/link";
import { listPublished } from "@/lib/editorial/store";
import { contentPath } from "@/lib/editorial/schema";
import { selectHomepageArticles } from "@/lib/editorial/homepage";

export default async function CaseStudy() {
  const entries = selectHomepageArticles(await listPublished("BLOG"));
  if (!entries.length) return null;
  return (
    <section className="bg-background px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Ideas for your next project</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Practical Insights</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
            Browse all articles
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {entries.map((e) => (
            <article
              key={e.id}
              className="flex flex-col rounded-2xl border border-border bg-white p-7"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                {e.content.category}
              </p>
              <h3 className="text-xl font-semibold">
                <Link href={contentPath(e.kind, e.content.slug)}>{e.content.title}</Link>
              </h3>
              <p className="my-5 text-sm leading-relaxed text-muted-foreground">
                {e.content.excerpt}
              </p>
              <Link
                href={contentPath(e.kind, e.content.slug)}
                className="mt-auto text-sm font-semibold text-primary hover:underline"
              >
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
