import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";
import type { PublicEntry } from "@/lib/editorial/schema";
import { formatArticleDate, readingMinutes } from "@/lib/editorial/article-info";
export default function Article({
  entry,
  preview = false,
}: {
  entry: PublicEntry;
  preview?: boolean;
}) {
  const c = entry.content;
  return (
    <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <Link
        className="text-sm font-semibold text-primary"
        href={entry.kind === "BLOG" ? "/blog" : "/case-studies"}
      >
        Back to {entry.kind === "BLOG" ? "all insights" : "case studies"}
      </Link>
      {preview && (
        <p className="my-5 rounded-lg border border-primary bg-secondary p-4 font-semibold">
          Private draft preview. This version is not public.
        </p>
      )}
      <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">
        {c.category}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {c.title}
      </h1>
      <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{c.excerpt}</p>
      <div
        aria-label="Article information"
        className="my-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
      >
        {!preview && (
          <dl className="flex flex-wrap gap-x-6 gap-y-3">
            <div>
              <dt className="inline font-medium">Created at: </dt>
              <dd className="inline">
                <time dateTime={entry.createdAt}>{formatArticleDate(entry.createdAt)}</time>
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Updated at: </dt>
              <dd className="inline">
                <time dateTime={entry.updatedAt}>{formatArticleDate(entry.updatedAt)}</time>
              </dd>
            </div>
          </dl>
        )}
        <p title="Estimated reading time">{readingMinutes(entry)} min read</p>
      </div>
      {c.coverImage && (
        <div className="relative mb-10 aspect-[3/2] overflow-hidden rounded-2xl">
          <Image
            src={c.coverImage}
            alt={c.coverAlt}
            fill
            sizes="(max-width: 900px) 100vw, 832px"
            className="object-cover"
            loading="eager"
            unoptimized={c.coverImage.startsWith("/media/")}
          />
        </div>
      )}
      {entry.kind === "CASE_STUDY" && (
        <dl className="mb-10 grid gap-4 rounded-2xl border border-border bg-secondary p-6 sm:grid-cols-2">
          {c.client && (
            <div>
              <dt className="font-semibold">Client</dt>
              <dd>{c.client}</dd>
            </div>
          )}
          {c.industry && (
            <div>
              <dt className="font-semibold">Industry</dt>
              <dd>{c.industry}</dd>
            </div>
          )}
        </dl>
      )}
      <Markdown body={c.body} />
      {entry.kind === "CASE_STUDY" && (
        <div className="mt-8 space-y-8">
          {[
            ["The challenge", c.challenge],
            ["Our solution", c.solution],
            ["Results", c.results],
          ].map(([title, body]) => (
            <section key={title}>
              <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
              <Markdown body={body} />
            </section>
          ))}
        </div>
      )}
      {c.tags.length > 0 && (
        <ul aria-label="Topics" className="mt-10 flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-sm">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
