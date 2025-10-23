import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // experimental: {
  //   outputFileTracingIncludes: {
  //     // adjust these globs to where your server code lives
  //     'app/**': [
  //       './node_modules/.prisma/**',
  //       './node_modules/@prisma/**',
  //     ],
  //     'pages/api/**': [
  //       './node_modules/.prisma/**',
  //       './node_modules/@prisma/**',
  //     ],
  //   },
  // },
};

export default nextConfig;
