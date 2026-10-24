import AboutSection from "./AboutSection";
import { principles } from "@/lib/about-content";
export default function AboutPageValues() {
  return (
    <AboutSection id="our-principles" eyebrow="What you can expect" title="Our Working Principles">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((item, i) => (
          <article key={item.title} className="rounded-2xl border border-border bg-white p-6">
            <p className="text-sm font-semibold text-primary">0{i + 1}</p>
            <h3 className="mt-5 text-xl font-semibold leading-snug">{item.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </div>
    </AboutSection>
  );
}
