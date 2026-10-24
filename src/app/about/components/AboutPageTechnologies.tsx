import AboutSection from "./AboutSection";
import { Code2, Monitor, Network } from "lucide-react";
export default function AboutPageTechnologies() {
  return (
    <AboutSection
      id="our-capabilities"
      eyebrow="Connected capabilities"
      title="What We Build"
      intro="Choose a focused engagement or connect several areas through one delivery plan."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            Icon: Code2,
            title: "Websites & marketing systems",
            text: "Responsive websites, online stores, technical SEO and permission-based email workflows.",
          },
          {
            Icon: Monitor,
            title: "Custom desktop applications",
            text: "Focused applications, database integrations, validated imports and useful reporting tools.",
          },
          {
            Icon: Network,
            title: "IT infrastructure",
            text: "Cloud planning, networking and security improvements scoped to your environment.",
          },
        ].map(({ Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-border bg-white p-7">
            <Icon aria-hidden="true" className="h-7 w-7 text-primary" />
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </AboutSection>
  );
}
