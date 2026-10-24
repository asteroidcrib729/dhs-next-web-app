import Image from "next/image";
import AboutSection from "./AboutSection";
import { methodology } from "@/lib/about-content";
export default function AboutPageApproach() {
  return (
    <AboutSection
      id="methodology"
      eyebrow="A clear delivery process"
      title="Our Methodology"
      intro="Four connected stages keep the work grounded in your requirements, with review points before the next step."
      tinted
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <figure className="overflow-hidden rounded-2xl border border-border bg-white lg:sticky lg:top-40">
          <Image
            src="/images/about/strategy-and-measurement.webp"
            alt="Colleagues comparing charts and reviewing progress together"
            loading="eager"
            width={1200}
            height={800}
            sizes="(max-width:1023px) 100vw, 600px"
            className="aspect-[3/2] h-auto w-full object-cover"
          />
          <figcaption className="border-t border-border px-5 py-3 text-sm text-muted-foreground">
            Review progress against the scope, with evidence for the next decision.
          </figcaption>
        </figure>
        <ol className="space-y-6">
          {methodology.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border bg-white p-6"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </AboutSection>
  );
}
