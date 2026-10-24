"use client";
import Image from "next/image";
import Link from "next/link";
import { useSiteConfig } from "@/components/SiteConfigProvider";
const columns = [
  {
    title: "Services",
    links: [
      ["Development & Marketing", "/services#service-section"],
      ["Custom Desktop Applications", "/services#service-section"],
      ["IT Solutions", "/services#service-section"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Contact Us", "/contact"],
      ["Our Portfolio", "/portfolio"],
    ],
  },
  {
    title: "Helpful Links",
    links: [
      ["Contact Us", "/contact"],
      ["Our Blog", "/blog"],
      ["FAQs", "/#faq-section"],
    ],
  },
];
export default function Footer() {
  const { links } = useSiteConfig();
  const socials = [
    ["Facebook", links.SITE_SOCIAL_FACEBOOK_URL || "https://www.facebook.com/"],
    ["Instagram", links.SITE_SOCIAL_INSTAGRAM_URL || "https://www.instagram.com/"],
    ["LinkedIn", links.SITE_SOCIAL_LINKEDIN_URL || "https://www.linkedin.com/"],
  ];
  return (
    <footer className="brand-footer text-white">
      <div className="mx-auto max-w-7xl px-5 pb-7 pt-16 sm:px-8">
        <div className="footer-layout">
          <div className="footer-brand">
            <Link
              href="/"
              aria-label="Digital Horizon Systems home"
              className="relative block h-20 w-64 sm:w-72"
            >
              <Image
                src="/branding/digital-horizon-systems-logo-light.svg"
                alt="Digital Horizon Systems"
                fill
                sizes="288px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-6 max-w-64 text-sm leading-relaxed text-white/65">
              A clearer direction for your digital growth. Strategy, experiences and systems that
              work together.
            </p>
            <span className="mt-6 inline-block rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[.18em] text-[#8bddc4]">
              Built for what comes next
            </span>
          </div>
          <div className="footer-links">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-5 space-y-3 text-sm text-white/65">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="cursor-pointer transition-colors hover:text-[#8bddc4]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="footer-social">
              <h3 className="text-sm font-semibold text-white">Social Media</h3>
              <ul className="mt-5 space-y-3 text-sm text-white/65">
                {socials.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer transition-colors hover:text-[#8bddc4]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 Digital Horizon Systems. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {[
              ["Terms & Conditions", "/terms-and-conditions"],
              ["Privacy Policy", "/privacy-policy"],
              ["Cookie Policy", "/cookie-policy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
