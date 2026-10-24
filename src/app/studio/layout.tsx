import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Editorial Studio - Digital Horizon Systems",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/studio" className="font-heading text-xl font-semibold">
            Digital Horizon Systems{" "}
            <span className="ml-2 text-sm font-normal text-muted-foreground">Editorial Studio</span>
          </Link>
          <Link href="/" className="text-sm text-primary">
            View website
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
