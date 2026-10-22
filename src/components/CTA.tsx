"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 py-12 text-center text-white">
        {/* Headline */}
        <h2 className="mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Ready To Grow Your Business?
        </h2>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/90 md:text-2xl">
          Get a free consultation and discover how we can help you achieve your digital marketing
          and IT goals.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          {/* Call button (pill) */}
          <Link
            href="tel:+92-300-1297101"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-[#2B47D9] shadow-lg ring-1 ring-white/20 transition hover:bg-slate-50 md:text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M2 5.75A1.75 1.75 0 0 1 3.75 4h2.22c.72 0 1.35.46 1.56 1.14l.86 2.72c.19.6.02 1.25-.44 1.67l-1.44 1.34a12.6 12.6 0 0 0 5.19 5.19l1.34-1.44c.42-.46 1.07-.63 1.67-.44l2.72.86c.68.21 1.14.84 1.14 1.56v2.22A1.75 1.75 0 0 1 18.25 22h-1.5C9.71 22 2 14.29 2 7.25v-1.5Z" />
            </svg>
            <span className="whitespace-nowrap">Call +92-300-1297101</span>
          </Link>

          {/* Primary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-black/25 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-black/35 md:text-lg"
          >
            Get Free Consultation
          </Link>
        </div>

        {/* Footnote */}
        <p className="mx-auto mt-6 max-w-3xl text-sm text-white/85 md:text-base">
          No obligation <span className="mx-2">•</span> Free 30-minute consultation{" "}
          <span className="mx-2">•</span> Expert insights
        </p>
      </div>
    </section>
  );
}
