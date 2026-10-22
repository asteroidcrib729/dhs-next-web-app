"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrollToId from "@/lib/ScrollToId";

type TocItem = { id: string; label: string };
type Props = {
  title: string;
  effective?: string;
  reviewed?: string;
  toc?: TocItem[];
};

function TocItem({ id, label }: { id: string; label: string }) {
  return (
    <Link
      href={`#${id}`}
      scroll={false} // IMPORTANT: disable Next.js default scrolling
      onClick={(e) => {
        e.preventDefault(); // stop native anchor jump
        ScrollToId(id, 30); // your chosen offset
        history.replaceState(null, "", `#${id}`); // keep hash in URL for deep-linking
      }}
      className="block rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
    >
      {label}
    </Link>
  );
}

export default function LegalShell({
  title,
  effective = "September 29, 2025",
  reviewed = "September 29, 2025",
  toc = [],
  children,
}: PropsWithChildren<Props>) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-10 sm:py-14">
      {/* subtle decorative blobs */}
      <div className="pointer-events-none absolute top-12 right-0 h-full w-full rounded-4xl bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-0 h-full w-full rounded-4xl bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="h-1 w-28 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
              Effective: {effective}
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
              Last reviewed: {reviewed}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* TOC */}
          <aside className="lg:col-span-3">
            {toc.length > 0 && (
              <nav className="sticky top-20">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    On this page
                  </p>
                  <ul className="space-y-2">
                    {toc.map((i) => (
                      <li key={i.id}>
                        <TocItem id={i.id} label={i.label} />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      Back to top
                    </Button>
                    <Button
                      onClick={() => window.print()}
                      className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 cursor-pointer"
                    >
                      Print
                    </Button>
                  </div>
                </div>
              </nav>
            )}
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <div className="relative rounded-2xl border border-transparent bg-white p-6 shadow-sm dark:bg-slate-900">
              {/* gradient border effect */}
              <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl bg-[linear-gradient(135deg,theme(colors.blue.500/.25),theme(colors.indigo.500/.25),theme(colors.cyan.500/.25))]" />
              <article className="prose prose-slate prose-headings:scroll-mt-28 dark:prose-invert max-w-none text-base leading-relaxed dark:prose-invert">
                {children}
              </article>
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
              Questions? Email{" "}
              <a
                className="text-blue-600 underline dark:text-blue-400"
                href="mailto:info@techventuresolution.com"
              >
                info@techventuresolution.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
