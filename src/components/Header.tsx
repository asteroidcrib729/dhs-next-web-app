"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/components/SiteConfigProvider";

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Case Studies", "/case-studies"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const config = useSiteConfig();
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target))
        setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const resize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    const historyChange = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    window.addEventListener("popstate", historyChange);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
      window.removeEventListener("popstate", historyChange);
    };
  }, [open]);

  const contactLinks = (
    <>
      {config.phone && (
        <a href={config.phoneHref} className="header-contact-link">
          <Phone size={13} aria-hidden="true" />
          <span>{config.phone}</span>
        </a>
      )}
      {config.whatsappHref && (
        <a
          href={config.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="header-contact-link"
        >
          <MessageCircle size={13} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      )}
      {config.email && (
        <a href={config.emailHref} className="header-contact-link">
          <Mail size={13} aria-hidden="true" />
          <span>{config.email}</span>
        </a>
      )}
    </>
  );

  return (
    <header
      ref={headerRef}
      className="site-header relative z-50"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="header-strip">
        <div className="header-utility mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          <div className="hidden min-w-0 items-center gap-5 lg:flex">{contactLinks}</div>
          <Link href="/contact" className="header-consultation" onClick={() => setOpen(false)}>
            <span className="header-status-dot" aria-hidden="true" />
            Free Consultation Available
          </Link>
        </div>
      </div>
      <div className="header-main mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Digital Horizon Systems home"
          className="relative block h-12 w-44 shrink-0 sm:h-14 sm:w-56"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/branding/digital-horizon-systems-logo-light.svg"
            alt="Digital Horizon Systems"
            fill
            sizes="(max-width: 639px) 176px, 224px"
            loading="eager"
            className="object-contain object-left"
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className="header-desktop-nav hidden items-center lg:flex"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className="header-nav-link"
            >
              <span className="header-nav-label">{label}</span>
            </Link>
          ))}
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="header-menu-button inline-flex lg:hidden"
        >
          <span>{open ? "Close" : "Menu"}</span>
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-navigation" hidden={!open} className="header-mobile-panel lg:hidden">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="header-mobile-link"
              >
                <span className="header-nav-label">{label}</span>
                {isActive(href) && (
                  <span aria-hidden="true" className="text-xs font-normal text-current">
                    Current page
                  </span>
                )}
              </Link>
            ))}
          </nav>
          {(config.phone || config.whatsappHref || config.email) && (
            <div className="header-mobile-contacts mt-5 flex flex-col gap-4 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Connect with us
              </p>
              {contactLinks}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
