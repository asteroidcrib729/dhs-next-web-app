"use client";

import { useReducedMotion } from "motion/react";
import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfiguredLink as Link, useSiteConfig } from "@/components/SiteConfigProvider";

export default function PortfolioPageGrid() {
  const config = useSiteConfig();
  const reduceMotion = useReducedMotion();
  const projects = [
    {
      id: 1,
      title: "ENG Properties",
      desc: "End-to-end ecommerce revamp with speed, UX, and CRO improvements for a nationwide F&B brand.",
      href: config.links.SITE_PROJECT_ENG,
      logo: "/images/logos/eng-properties-latest-logo.webp",
      video: "/videos/portfolio/ENG-Properties.mp4",
      thumbnail: "/images/portfolio/ENG-Properties.webp",
      width_class: "md:h-36",
      height_class: "md:w-72",
    },
    {
      id: 2,
      title: "JSN Medical",
      desc: "HIPAA-aware site with gated content hub, marketing automation, and analytics.",
      href: config.links.SITE_PROJECT_JSN,
      logo: "/images/logos/jsn-medical-latest-logo.webp",
      video: "/videos/portfolio/JSN-Medical.mp4",
      thumbnail: "/images/portfolio/JSN-Medical.webp",
      width_class: "md:h-32",
      height_class: "md:w-84",
    },
    {
      id: 3,
      title: "Mission Health Care",
      desc: "Corporate site + resources library integrated with Sangfor stack and compliance notices.",
      href: config.links.SITE_PROJECT_MISSION,
      logo: "/images/logos/mission-healthcare-latest-logo.svg",
      video: "/videos/portfolio/Mission-Health-Care.mp4",
      thumbnail: "/images/portfolio/Mission-Health-Care.webp",
      width_class: "md:h-48",
      height_class: "md:w-84",
    },
    {
      id: 4,
      title: "Nectronix",
      desc: "A technology services website with clear service pages, project information and inquiry paths.",
      href: config.links.SITE_PROJECT_NECTRONIX,
      logo: "/images/logos/nectronix-digital-latest-logo.webp",
      video: "/videos/portfolio/Nectronix.mp4",
      thumbnail: "/images/portfolio/Nectronix.webp",
      width_class: "md:h-30",
      height_class: "md:w-full",
    },
    {
      id: 5,
      title: "711 Max Bachat",
      desc: "High-converting PDP/PLP templates, SEO-ready architecture, and lightning search.",
      href: config.links.SITE_PROJECT_711,
      logo: "/images/logos/711-max-bachat-latest-logo.webp",
      video: "/videos/portfolio/711-Max-Bachat.mp4",
      thumbnail: "/images/portfolio/711-Max-Bachat.webp",
      width_class: "md:h-40",
      height_class: "md:w-80",
    },
    {
      id: 6,
      title: "Sharz Properties",
      desc: "Feature-rich microsite with interactive diagrams and spec downloads.",
      href: config.links.SITE_PROJECT_SHARZ,
      logo: "/images/logos/sharz-properties-latest-logo.svg",
      video: "/videos/portfolio/Sharz-Properties.mp4",
      thumbnail: "/images/portfolio/Sharz-Properties.webp",
      width_class: "md:h-48",
      height_class: "md:w-96",
    },
  ];

  return (
    <section className="bg-linear-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-semibold">Featured Portfolio</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-white p-0 hover:border-primary/40"
            >
              <CardHeader className="px-5 pt-5 pb-0">
                <div className="portfolio-media relative aspect-video w-full overflow-hidden rounded-xl bg-background">
                  <video
                    src={project.video}
                    poster={project.thumbnail}
                    muted
                    playsInline
                    preload="none"
                    aria-label={
                      project.title +
                      " website preview. Focus to preview; press space to pause or play."
                    }
                    className="absolute inset-0 block h-full w-full border-0 object-cover"
                    tabIndex={0}
                    onPointerEnter={(event) => {
                      if (!reduceMotion && event.pointerType === "mouse")
                        void event.currentTarget.play().catch(() => {});
                    }}
                    onPointerLeave={(event) => event.currentTarget.pause()}
                    onFocus={(event) => {
                      if (!reduceMotion) void event.currentTarget.play().catch(() => {});
                    }}
                    onBlur={(event) => event.currentTarget.pause()}
                    onKeyDown={(event) => {
                      if (event.key === " " || event.key === "Enter") {
                        event.preventDefault();
                        const video = event.currentTarget;
                        if (video.paused) void video.play().catch(() => {});
                        else video.pause();
                      }
                    }}
                    onClick={(event) => {
                      const video = event.currentTarget;
                      if (video.paused) void video.play().catch(() => {});
                      else video.pause();
                    }}
                  />
                </div>
                <CardTitle className="mt-5 text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-5">
                <CardDescription>{project.desc}</CardDescription>
              </CardContent>
              <CardFooter className="mt-auto px-5 pb-5">
                <Button asChild className="w-full">
                  <Link href={project.href} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
