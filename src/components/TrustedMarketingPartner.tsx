"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, LayoutGrid } from "lucide-react";
import { ConfiguredLink, useSiteConfig } from "@/components/SiteConfigProvider";
import type { publicLinkKeys } from "@/lib/site-config";
import styles from "@/components/TrustedMarketingPartner.module.css";
const partners: {
  name: string;
  linkKey: (typeof publicLinkKeys)[number];
  src: string;
  tag?: string;
}[] = [
  {
    name: "Sangfor",
    linkKey: "SITE_PARTNER_SANGFOR",
    src: "/images/logos/sangfor-latest-logo.svg",
    tag: "Cybersecurity and cloud computing solutions",
  },
  {
    name: "VMWare",
    linkKey: "SITE_PARTNER_VMWARE",
    src: "/images/logos/vmware-latest-logo.svg",
    tag: "Virtualization and cloud infrastructure",
  },
  {
    name: "Microsoft",
    linkKey: "SITE_PARTNER_MICROSOFT",
    src: "/images/logos/microsoft-certified-latest-logo.webp",
    tag: "Certified Solutions Partner",
  },
  {
    name: "Oracle",
    linkKey: "SITE_PARTNER_ORACLE",
    src: "/images/logos/oracle-latest-logo.svg",
    tag: "Database and cloud solutions",
  },
  {
    name: "H3C",
    linkKey: "SITE_PARTNER_H3C",
    src: "/images/logos/h3c-latest-logo.webp",
    tag: "Network infrastructure and switching solutions",
  },
  {
    name: "Constructor Tech",
    linkKey: "SITE_PARTNER_CONSTRUCTOR",
    src: "/images/logos/constructor-tech-latest-logo.svg",
    tag: "Custom technology solutions and integration",
  },
  {
    name: "Veeam",
    linkKey: "SITE_PARTNER_VEEAM",
    src: "/images/logos/veeam-latest-logo.svg",
    tag: "Backup and disaster recovery solutions",
  },
  {
    name: "ZWSoft",
    linkKey: "SITE_PARTNER_ZWSOFT",
    src: "/images/logos/zwsoft-latest-logo.webp",
    tag: "Professional CAD/CAM software",
  },
  {
    name: "Barracuda",
    linkKey: "SITE_PARTNER_BARRACUDA",
    src: "/images/logos/barracuda-latest-logo.webp",
    tag: "Network and data security",
  },
  {
    name: "Solarwinds",
    linkKey: "SITE_PARTNER_SOLARWINDS",
    src: "/images/logos/solarwinds-latest-logo.webp",
    tag: "IT monitoring and management",
  },
  {
    name: "Google Partner",
    linkKey: "SITE_PARTNER_GOOGLE",
    src: "/images/logos/google-latest-logo.svg",
    tag: "Premier Partner",
  },
  {
    name: "Google Cloud",
    linkKey: "SITE_PARTNER_GOOGLE_CLOUD",
    src: "/images/logos/google-cloud-latest-logo.svg",
    tag: "Cloud Partner",
  },
  {
    name: "Meta Business Partner",
    linkKey: "SITE_PARTNER_META",
    src: "/images/logos/meta-latest-logo.svg",
    tag: "Business Partner",
  },
  {
    name: "X (F.K.A Twitter)",
    linkKey: "SITE_PARTNER_X",
    src: "/images/logos/twitter-latest-logo.svg",
    tag: "Official Advertising Partner",
  },
  {
    name: "TikTok",
    linkKey: "SITE_PARTNER_TIKTOK",
    src: "/images/logos/tiktok-latest-logo.svg",
    tag: "Official Marketing Partner",
  },
  {
    name: "Clutch",
    linkKey: "SITE_PARTNER_CLUTCH",
    src: "/images/logos/clutch-logo.webp",
    tag: "Top Rated",
  },
  {
    name: "Shopify Partners",
    linkKey: "SITE_PARTNER_SHOPIFY",
    src: "/images/logos/shopify.svg",
    tag: "Partner",
  },
  {
    name: "HubSpot",
    linkKey: "SITE_PARTNER_HUBSPOT",
    src: "/images/logos/hubspot.svg",
    tag: "Solutions Partner",
  },
  {
    name: "AWS",
    linkKey: "SITE_PARTNER_AWS",
    src: "/images/logos/aws.svg",
    tag: "Select Tier",
  },
];
const features = [
  {
    title: "Market Knowledge",
    description: "Deep understanding of consumer behavior and market trends across industries",
  },
  {
    title: "Compliance Ready",
    description: "All campaigns comply with international marketing regulations and best practices",
  },
  {
    title: "24/7 Support",
    description: "Support and communication aligned with your business hours",
  },
];
export default function TrustedMarketingPartner() {
  const config = useSiteConfig();
  const region = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [all, setAll] = useState(false);
  useEffect(() => {
    let visible = false;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    if (region.current) observer.observe(region.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  const card = (partner: (typeof partners)[number], duplicate = false) => {
    const contents = (
      <>
        <div className="relative mx-auto h-16 w-36">
          <Image
            src={partner.src}
            alt={duplicate ? "" : partner.name}
            fill
            sizes="144px"
            className="object-contain"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-foreground">{partner.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{partner.tag}</p>
        </div>
      </>
    );
    return (
      <li key={partner.name} className={styles.card}>
        {duplicate ? (
          <div className="h-full p-5">{contents}</div>
        ) : (
          <ConfiguredLink
            href={config.links[partner.linkKey]}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full rounded-xl p-5 focus-visible:outline-2 focus-visible:outline-primary"
          >
            {contents}
          </ConfiguredLink>
        )}
      </li>
    );
  };
  return (
    <>
      <section className="border-b border-border bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Strategy meets technology</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Technology That Works Together
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We understand the need for connected websites, software and business infrastructure.
              From local businesses to global enterprises, we deliver tailored strategies that
              resonate with your audience and drive measurable results.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature, i) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-background p-7"
              >
                <span className="text-xs font-semibold text-primary">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Our technology ecosystem</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Technology Ecosystem
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Platforms and tools relevant to our software, cloud, cybersecurity and networking
              work. The right combination depends on your requirements.
            </p>
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium hover:border-primary"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              {paused ? "Resume animation" : "Pause animation"}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium hover:border-primary"
              onClick={() => setAll(!all)}
              aria-pressed={all}
            >
              <LayoutGrid size={14} />
              {all ? "Show slider" : "View all partners"}
            </button>
          </div>
          <div
            ref={region}
            className={styles.mask}
            data-active={active && !paused}
            data-all={all}
            role="region"
            aria-label="Trusted partners"
            onFocusCapture={(event) => {
              if ((event.target as HTMLElement).closest("a")) setAll(true);
            }}
          >
            <div className={styles.track}>
              <ul className={styles.row}>{partners.map((p) => card(p))}</ul>
              <ul className={styles.row} aria-hidden="true">
                {partners.map((p) => card(p, true))}
              </ul>
            </div>
          </div>
          <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
            Logos are for identification only. All trademarks are the property of their respective
            owners.
          </p>
        </div>
      </section>
    </>
  );
}
