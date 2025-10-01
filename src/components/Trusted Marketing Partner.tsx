"use client";

import Image from "next/image";
import Link from "next/link";

export default function TrustedMarketingPartner() {
    type Partner = {
        name: string;
        href: string;
        src: string;
        tag?: string;
    };

    const PARTNERS: Partner[] = [
        {
            name: "Meta Business Partner",
            href: "https://www.facebook.com/business/partner-directory",
            src: "https://cdn.simpleicons.org/meta/0866FF",
            tag: "Business Partner",
        },
        {
            name: "Google Partner",
            href: "https://www.google.com/partners/",
            src: "https://cdn.simpleicons.org/google/4285F4",
            tag: "Premier Partner",
        },
        {
            name: "Google Cloud",
            href: "https://cloud.google.com/partners",
            src: "https://cdn.simpleicons.org/googlecloud/4285F4",
            tag: "Cloud Partner",
        },
        {
            name: "TikTok",
            href: "https://ads.tiktok.com/marketing-partners/",
            src: "https://cdn.simpleicons.org/tiktok/000000",
            tag: "Marketing Partner",
        },
        {
            name: "Clutch",
            href: "https://clutch.co/",
            src: "/clutch-logo.png",
            tag: "Top Rated",
        },
        {
            name: "Shopify Partners",
            href: "https://www.shopify.com/partners",
            src: "https://cdn.simpleicons.org/shopify/7AB55C",
            tag: "Partner",
        },
        {
            name: "HubSpot",
            href: "https://ecosystem.hubspot.com/marketplace/solutions",
            src: "https://cdn.simpleicons.org/hubspot/FF7A59",
            tag: "Solutions Partner",
        },
        {
            name: "AWS",
            href: "https://partners.amazonaws.com/",
            src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg",
            tag: "Select Tier",
        },
    ];

    return (
        <>
            <section className="w-full bg-black py-20 px-6">
                <div className="mx-auto max-w-6xl text-center">
                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-gray-400 md:text-4xl">
                        Your Trusted Digital Marketing Partner
                    </h2>

                    {/* Subheading */}
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-white leading-relaxed">
                        We understand the unique challenges and opportunities of modern digital
                        marketing. From local businesses to global enterprises, we deliver
                        tailored digital marketing strategies that resonate with your audience
                        and drive measurable results for your business.
                    </p>

                    {/* Features */}
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl bg-gray-800 p-8 text-center shadow-lg shadow-[#2b47d9]">
                            <h3 className="text-lg font-semibold text-gray-400">
                                Market Knowledge
                            </h3>
                            <p className="mt-3 text-white text-base leading-relaxed">
                                Deep understanding of consumer behavior and market trends across
                                industries
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-800 p-8 text-center shadow-lg shadow-[#2b47d9]">
                            <h3 className="text-lg font-semibold text-gray-400">
                                Compliance Ready
                            </h3>
                            <p className="mt-3 text-white text-base leading-relaxed">
                                All campaigns comply with international marketing regulations and
                                best practices
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-800 p-8 text-center shadow-lg shadow-[#2b47d9]">
                            <h3 className="text-lg font-semibold text-gray-400">24/7 Support</h3>
                            <p className="mt-3 text-white text-base leading-relaxed">
                                Support and communication aligned with your business hours
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-20 px-6">
                <div className="mx-auto max-w-7xl">
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                            Trusted Partners & Certifications
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
                            We partner with industry leaders and maintain certifications with top platforms
                            to deliver exceptional results.
                        </p>
                    </div>

                    {/* Logo grid */}
                    <div className="mt-12 grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {PARTNERS.map((p) => (
                            <Link
                                key={p.name}
                                href={p.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={p.name}
                                title={p.name}
                                className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-md"
                            >
                                {/* Logo */}
                                <Image width={50} height={10} src={p.src} alt={p.name} loading="lazy" decoding="async" unoptimized className="h-10 w-auto opacity-90 transition-all duration-200 group-hover:opacity-100" />

                                {/* Label */}
                                <div className="mt-3 text-center">
                                    <p className="text-sm font-medium text-slate-800">{p.name}</p>
                                    {p.tag && (
                                        <p className="text-xs text-slate-500">{p.tag}</p>
                                    )}
                                </div>

                                {/* Subtle focus ring for a11y */}
                                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-primary/0 transition group-focus-visible:ring-2 group-focus-visible:ring-indigo-500" />
                            </Link>
                        ))}
                    </div>

                    {/* Divider note (optional) */}
                    <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
                        Logos are for identification only. All trademarks are the property of their respective owners.
                    </p>
                </div>
            </section>
        </>
    );
}
