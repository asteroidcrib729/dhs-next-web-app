"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contentPath, type PublicEntry } from "@/lib/editorial/schema";
export type CatalogueEntry = Pick<PublicEntry, "id" | "kind"> & {
  content: Pick<
    PublicEntry["content"],
    "title" | "slug" | "excerpt" | "category" | "coverImage" | "featured"
  >;
};
export default function Catalogue({ entries }: { entries: CatalogueEntry[] }) {
  const [category, setCategory] = useState("All");
  const [count, setCount] = useState(6);
  const categories = ["All", ...new Set(entries.map((e) => e.content.category).filter(Boolean))];
  const filtered = entries.filter((e) => category === "All" || e.content.category === category);
  // A shared cover already loaded for the first row needs no second lazy request.
  const eagerCovers = new Set(filtered.slice(0, 3).map((e) => e.content.coverImage));
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mb-9 flex flex-wrap gap-2" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setCount(6);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${category === c ? "border-primary bg-primary text-white" : "border-border bg-white hover:bg-secondary"}`}
          >
            {c}
          </button>
        ))}
      </div>
      {!entries.length && (
        <p className="rounded-2xl border border-border bg-white p-10 text-center text-muted-foreground">
          New stories are on their way. Please check back soon.
        </p>
      )}
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, count).map((e) => (
          <article
            key={e.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-colors hover:border-primary/40"
          >
            {e.content.coverImage && (
              <Link
                href={contentPath(e.kind, e.content.slug)}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[3/2] overflow-hidden"
              >
                <Image
                  src={e.content.coverImage}
                  alt=""
                  fill
                  loading={eagerCovers.has(e.content.coverImage) ? "eager" : "lazy"}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
                  className="object-cover"
                  unoptimized={e.content.coverImage.startsWith("/media/")}
                />
              </Link>
            )}
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                {e.content.category}
                {e.content.featured ? " • Featured" : ""}
              </p>
              <h2 className="mb-4 text-xl font-semibold leading-snug">
                <Link href={contentPath(e.kind, e.content.slug)}>{e.content.title}</Link>
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {e.content.excerpt}
              </p>
              <Link
                className="mt-auto text-sm font-semibold text-primary underline-offset-4 hover:underline"
                href={contentPath(e.kind, e.content.slug)}
              >
                Read {e.kind === "BLOG" ? "article" : "case study"}
              </Link>
            </div>
          </article>
        ))}
      </div>
      {filtered.length > count && (
        <div className="mt-10 text-center">
          <button
            type="button"
            className="action-link action-link-secondary"
            onClick={() => setCount((n) => n + 6)}
          >
            Load more stories
          </button>
        </div>
      )}
    </section>
  );
}
