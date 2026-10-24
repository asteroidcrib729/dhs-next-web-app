"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useSiteConfig } from "@/components/SiteConfigProvider";
export default function CTA() {
  const config = useSiteConfig();
  return (
    <section className="bg-foreground px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-200">
          Let’s build what’s next
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
          Ready To Grow Your Business?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          Get a free consultation and discover how we can help you achieve your development, search
          and IT goals.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={config.consultationUrl}
            className="inline-flex items-center gap-3 rounded-lg bg-[#d4f7a7] px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white"
          >
            Get Free Consultation
          </Link>
          {config.phone && (
            <a
              href={config.phoneHref}
              className="inline-flex items-center gap-3 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Phone size={16} />
              Call {config.phone}
            </a>
          )}
        </div>
        <p className="mt-6 text-xs text-white/65">
          No obligation · Free 30-minute consultation · Expert insights
        </p>
      </div>
    </section>
  );
}
