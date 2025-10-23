"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import styles from "@/components/TrustedMarketingPartner.module.css";

export default function TrustedMarketingPartner() {
    type Partner = {
        name: string;
        href: string;
        src: string;
        tag?: string;
        tagClass?: string;
        imgClass?: string;
    };

    const PARTNERS: Partner[] = [
        {
            name: "Sangfor",
            href: "https://www.sangfor.com/partners/become-a-partner",
            src: "/sangfor-latest-logo.svg",
            tag: "Cybersecurity and cloud computing solutions",
            tagClass: "",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Dell",
            href: "https://www.delltechnologies.com/partner/en-pk/partner/partner.htm",
            src: "/dell-latest-logo.svg",
            tag: "Enterprise servers, workstations, and storage solutions",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "HP",
            href: "https://partner.hp.com/",
            src: "/hp-latest-logo.svg",
            tag: "Business laptops, printers, and server infrastructure",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "VMWare",
            href: "https://partnerportal.broadcom.com/web/partner-portal",
            src: "/vmware-latest-logo.svg",
            tag: "Virtualization and cloud infrastructure",
            imgClass: "h-10 w-auto mt-16 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Lenovo",
            href: "https://www.lenovopartnerhub.com/",
            src: "/lenovo-latest-logo.svg",
            tag: "ThinkPad laptops, desktops, and data center solutions",
            imgClass: "h-10 w-auto mt-16 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Microsoft",
            href: "https://partner.microsoft.com/",
            src: "/microsoft-certified-latest-logo.png",
            tag: "Certified Solutions Partner",
            imgClass: "h-auto w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Oracle",
            href: "https://www.oracle.com/partnernetwork/program",
            src: "/oracle-latest-logo.svg",
            tag: "Database and cloud solutions",
            imgClass: "h-10 w-auto mt-16 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "H3C",
            href: "https://www.h3c.com/en/Partners/",
            src: "/h3c-latest-logo.png",
            tag: "Network infrastructure and switching solutions",
            imgClass: "h-10 w-auto mt-16 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Constructor Tech",
            href: "https://constructor.tech/partners",
            src: "/constructor-tech-latest-logo.svg",
            tag: "Custom technology solutions and integration",
            imgClass: "h-10 w-auto mt-16 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Veeam",
            href: "https://www.veeam.com/partners/propartner.html",
            src: "/veeam-latest-logo.svg",
            tag: "Backup and disaster recovery solutions",
            imgClass: "h-10 w-auto mt-16 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "ZWSoft",
            href: "https://partnerportal.zwsoft.com/",
            src: "/zwsoft-latest-logo.png",
            tag: "Professional CAD/CAM software",
            tagClass: "relative bottom-[15px]",
            imgClass: "h-auto w-auto opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Barracuda",
            href: "https://www.barracuda.com/partners/become-a-partner",
            src: "/barracuda-latest-logo.png",
            tag: "Network and data security",
            tagClass: "relative bottom-[15px]",
            imgClass: "h-auto w-auto opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Solarwinds",
            href: "https://www.solarwinds.com/partners",
            src: "/solarwinds-latest-logo.png",
            tag: "IT monitoring and management",
            tagClass: "relative bottom-[15px]",
            imgClass: "h-auto w-auto opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Google Partner",
            href: "https://www.google.com/partners/",
            src: "/google-latest-logo.svg",
            tag: "Premier Partner",
            imgClass: "h-30 w-auto mt-6 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Google Cloud",
            href: "https://cloud.google.com/partners",
            src: "/google-cloud-latest-logo.svg",
            tag: "Cloud Partner",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Meta Business Partner",
            href: "https://www.facebook.com/business/partner-directory",
            src: "/meta-latest-logo.svg",
            tag: "Business Partner",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "X (F.K.A Twitter)",
            href: "https://business.x.com/",
            src: "/twitter-latest-logo.svg",
            tag: "Official Advertising Partner",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "TikTok",
            href: "https://ads.tiktok.com/marketing-partners/",
            src: "/tiktok-latest-logo.svg",
            tag: "Official Marketing Partner",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Clutch",
            href: "https://clutch.co/",
            src: "/clutch-logo.png",
            tag: "Top Rated",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "Shopify Partners",
            href: "https://www.shopify.com/partners",
            src: "https://cdn.simpleicons.org/shopify/7AB55C",
            tag: "Partner",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "HubSpot",
            href: "https://ecosystem.hubspot.com/marketplace/solutions",
            src: "https://cdn.simpleicons.org/hubspot/FF7A59",
            tag: "Solutions Partner",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
        {
            name: "AWS",
            href: "https://partners.amazonaws.com/",
            src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg",
            tag: "Select Tier",
            imgClass: "h-20 w-auto mt-10 opacity-90 transition-all duration-200 group-hover/link:opacity-100",
        },
    ];

    const Features = [
        {
            title: "Market Knowledge",
            description:
                "Deep understanding of consumer behavior and market trends across industries",
        },
        {
            title: "Compliance Ready",
            description:
                "All campaigns comply with international marketing regulations and best practices",
        },
        {
            title: "24/7 Support",
            description: "Support and communication aligned with your business hours",
        },
    ];

    /** Type-safe style for CSS custom property (no "unexpected any") */
    type SliderStyle = React.CSSProperties & { ["--slider-speed"]?: string };
    const trackStyle: SliderStyle = { ["--slider-speed"]: "30s" }; // tweak speed here

    return (
        <>
            <section className="w-full bg-black py-20 px-6">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Your Trusted Digital Marketing Partner
                    </h2>

                    <p className="mt-6 mx-auto max-w-3xl text-lg text-white/90 leading-relaxed">
                        We understand the unique challenges and opportunities of modern
                        digital marketing. From local businesses to global enterprises, we
                        deliver tailored strategies that resonate with your audience and
                        drive measurable results.
                    </p>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Features.map((Feature, index) => (
                            <Card
                                key={index}
                                className="rounded-2xl bg-gray-800 p-8 text-center hover:scale-[103%] hover:shadow-lg hover:shadow-[#2b47d9] transition-all duration-300"
                            >
                                <CardContent className="mt-3 text-white text-base leading-relaxed">
                                    <CardHeader className="text-lg font-semibold text-gray-300">
                                        {Feature.title}
                                    </CardHeader>
                                    {Feature.description}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#94a3b8] py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                            Trusted Marketing Partners & Certifications
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
                            We partner with industry-leading brands to deliver enterprise-grade hardware and software solutions that
                            power your business operations.
                        </p>
                    </div>

                    {/* Auto-scrolling logo slider */}
                    <div
                        className={`${styles.mask} group relative mt-12`}
                        role="region"
                        aria-label="Trusted partners carousel"
                    >
                        {/* Edge fades (Tailwind-only) */}
                        {/*
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
                        */}

                        {/* TRACK (animated by CSS Module) */}
                        <div className={styles.track} style={trackStyle}>
                            {/* ROW A */}
                            <ul className="flex items-stretch gap-4 my-4">
                                {PARTNERS.map((p) => (
                                    <li key={`A-${p.name}`} className="w-[240px] h-64">
                                        <Link
                                            href={p.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            aria-label={p.name}
                                            title={p.name}
                                            className="group/link relative flex h-full flex-col items-center justify-center rounded-2xl border-solid border-[2px] border-slate-200 bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
                                        >
                                            <Image
                                                width={56}
                                                height={24}
                                                src={p.src}
                                                alt={p.name}
                                                loading="lazy"
                                                decoding="async"
                                                unoptimized
                                                className={p.imgClass}
                                            />
                                            
                                            <div className={`${p.tagClass} mt-auto text-center`}>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {p.name}
                                                </p>
                                                {p.tag && (
                                                    <p className="text-xs text-slate-500">{p.tag}</p>
                                                )}
                                            </div>
                                            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-primary/0 transition group-focus-visible:ring-2 group-focus-visible:ring-indigo-500" />
                                            
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* ROW B (duplicate of A) */}
                            <ul className="flex items-stretch gap-4 my-4" aria-hidden="true">
                                {PARTNERS.map((p) => (
                                    <li key={`B-${p.name}`} className="w-[240px] h-64">
                                        <Link
                                            href={p.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            aria-label={p.name}
                                            title={p.name}
                                            className="group/link relative flex h-full flex-col items-center justify-center rounded-2xl border-solid border-[2px] border-slate-200 bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
                                        >
                                            <Image
                                                width={56}
                                                height={24}
                                                src={p.src}
                                                alt={p.name}
                                                loading="lazy"
                                                decoding="async"
                                                unoptimized
                                                className={p.imgClass}
                                            />

                                            
                                            <div className={`${p.tagClass} mt-auto text-center`}>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {p.name}
                                                </p>
                                                {p.tag && (
                                                    <p className="text-xs text-slate-500">{p.tag}</p>
                                                )}
                                            </div>
                                            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-primary/0 transition group-focus-visible:ring-2 group-focus-visible:ring-indigo-500" />
                                            
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
                        Logos are for identification only. All trademarks are the property
                        of their respective owners.
                    </p>
                </div>
            </section>
        </>
    );
}
