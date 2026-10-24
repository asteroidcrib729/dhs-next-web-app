"use client";
import { MotionConfig } from "motion/react";
import { createContext, useContext } from "react";
import Link from "next/link";
import type { SiteConfig } from "@/lib/site-config";
const SiteConfigContext = createContext<SiteConfig | null>(null);
export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteConfigContext.Provider>
  );
}
export function useSiteConfig() {
  const config = useContext(SiteConfigContext);
  if (!config) throw new Error("SiteConfigProvider is required.");
  return config;
}
export function ConfiguredLink({
  href,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
