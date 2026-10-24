import HeroBackground from "@/components/HeroBackground";
import Link from "next/link";
import { Globe2, Code2, Network } from "lucide-react";
export default function LandingPageTop() {
  return (
    <section className="horizon-hero relative overflow-hidden border-b border-border px-5 py-20 sm:px-8 sm:py-24">
      <HeroBackground />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div className="hero-entry">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.17em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />A new horizon for your business
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            Turn your next idea into <span className="text-primary">lasting digital growth.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Digital Horizon Systems connects thoughtful strategy, purposeful design and dependable
            technology. We help your business move forward with confidence.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/services" className="action-link">
              Explore Our Services
            </Link>
            <Link href="/contact" className="action-link action-link-secondary">
              Start a Conversation
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-primary/15 pt-5 text-xs font-medium text-muted-foreground">
            <span>Strategy with direction</span>
            <span>Design with purpose</span>
            <span>Technology that lasts</span>
          </div>
        </div>
        <div className="horizon-panel relative overflow-hidden rounded-3xl p-7 text-white sm:p-9">
          <div className="relative">
            <p className="text-[10px] font-medium uppercase tracking-[.22em] text-[#8bddc4]">
              Your next chapter starts here
            </p>
            <h2 className="mt-4 max-w-xs text-3xl font-medium leading-tight">
              One vision.
              <br />
              Connected possibilities.
            </h2>
            <div className="my-7 h-px bg-white/15" />
            <div className="space-y-6">
              {[
                {
                  Icon: Globe2,
                  title: "Web Development & SEO",
                  text: "Build a useful website and help people find it.",
                },
                {
                  Icon: Code2,
                  title: "Custom Desktop Applications",
                  text: "Simplify daily work with tools built for your team.",
                },
                {
                  Icon: Network,
                  title: "IT Infrastructure",
                  text: "Keep your business connected and ready to grow.",
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="rounded-xl border border-white/10 bg-white/5 p-3 text-[#8bddc4]">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="horizon-lines mt-9" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
