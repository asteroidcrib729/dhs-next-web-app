// import { Button } from "@/components/ui/button";
// import SpotlightCard from "@/components/SpotlightCard";
// import Image from "next/image";

"use client";

import LetterGlitch from "@/components/LetterGlitch";
import Link from "next/link";

export default function LandingPageTop() {
  return (
    <>
      <section className="relative w-full min-h-[86vh] bg-gradient-to-r from-blue-50 to-blue-100 px-6 text-center overflow-hidden flex items-center justify-center">
        {/* Glitch Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <LetterGlitch
            glitchSpeed={50}
            glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
            centerVignette={true}
            outerVignette={true}
            smooth={true}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Drive Business Growth with{" "}
            <span className="text-blue-600">Smart Digital Solutions</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            From strategy to execution, we help businesses unlock growth through modern marketing
            and IT infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/case-studies"
              className="px-6 py-3 rounded-lg bg-black hover:bg-gray-600 transition"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
