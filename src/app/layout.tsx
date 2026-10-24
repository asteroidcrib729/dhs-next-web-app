import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SiteConfigProvider } from "@/components/SiteConfigProvider";
import { createSiteConfig } from "@/lib/site-config";
import ProgressBar from "@/components/ProgressBar";
import { WebsiteAnalytics } from "@/components/AnalyticsPreferences";
import "@/app/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home - Digital Horizon Systems",
  description:
    "Digital Horizon Systems brings website development, customized desktop applications, SEO, email workflows and IT infrastructure together to help businesses grow.",
  icons: {
    icon: [
      { url: "/branding/digital-horizon-systems-mark.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icons/web-app-manifest-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <SiteConfigProvider config={createSiteConfig(process.env)}>
          <ProgressBar />
          {children}
          <WebsiteAnalytics />
        </SiteConfigProvider>
      </body>
    </html>
  );
}
