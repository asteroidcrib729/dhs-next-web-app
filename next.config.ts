import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        source: "/api/studio/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
  // uncomment the next line for shipping standalone output:
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "svgmix.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eng-properties.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jsnmedical.com.au",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "missionhealthcare.com.au",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nectronix.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sharzproperties.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "711maxbachat.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
