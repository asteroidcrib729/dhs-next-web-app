"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSiteConfig } from "@/components/SiteConfigProvider";
import type { PolicyKey } from "@/lib/site-config";

type TocItem = { id: string; label: string };
type Props = {
  title: string;
  policy: PolicyKey;
  toc?: TocItem[];
};

function TocItem({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="block rounded-md px-2 py-1 text-sm text-foreground hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
    >
      {label}
    </a>
  );
}

export default function LegalShell({
  title,
  policy,
  toc = [],
  children,
}: PropsWithChildren<Props>) {
  const config = useSiteConfig();
  const { effective, reviewed } = config.legalDates[policy];
  return (
    <section className="relative bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-10 sm:py-14">
      {/* subtle decorative blobs */}

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="h-1 w-28 rounded-full bg-linear-to-r from-emerald-600 via-emerald-600 to-emerald-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100 sm:text-4xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border border-border bg-white/80 px-3 py-1 text-foreground backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
              Effective: <time dateTime={effective.iso}>{effective.label}</time>
            </span>
            <span className="rounded-full border border-border bg-white/80 px-3 py-1 text-foreground backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
              Last reviewed: <time dateTime={reviewed.iso}>{reviewed.label}</time>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* TOC */}
          <aside className="lg:col-span-3">
            {toc.length > 0 && (
              <nav className="sticky top-20">
                <div className="rounded-2xl border border-border bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
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
                      onClick={() =>
                        window.scrollTo({
                          top: 0,
                          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                            ? "auto"
                            : "smooth",
                        })
                      }
                      className="flex-1 rounded-md border border-border bg-white px-3 py-2 text-xs font-medium text-foreground hover:text-foreground hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      Back to top
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
              <article className="legal-copy max-w-none text-base leading-relaxed">
                {children}
              </article>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Questions?{" "}
              {config.email ? (
                <a className="text-primary underline" href={config.emailHref}>
                  {config.email}
                </a>
              ) : (
                <Link className="text-primary underline" href="/contact">
                  Contact us
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
