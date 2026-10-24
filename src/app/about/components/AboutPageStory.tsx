import Image from "next/image";
import AboutSection from "./AboutSection";
export default function AboutPageStory() {
  return (
    <AboutSection id="our-story" eyebrow="Why we exist" title="Our Story">
      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Digital Horizon Systems brings development, search optimization, email workflows and IT
            infrastructure into one connected approach. The aim is practical: make it easier for a
            business to be found, serve its customers and manage its daily work.
          </p>
          <p>
            A website should explain what you do. An internal application should remove friction
            from a real task. Infrastructure should support both reliably. We start with those needs
            and shape the technical work around them.
          </p>
          <p>
            From the first conversation to handover, we focus on clear scope, thoughtful
            implementation and checks that show whether the agreed requirements have been met.
          </p>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-border bg-white">
          <Image
            src="/images/about/collaborative-engineering.webp"
            alt="Engineering colleagues developing a shared plan at a whiteboard"
            loading="eager"
            width={1200}
            height={800}
            sizes="(max-width:1023px) 100vw, 600px"
            className="aspect-[3/2] h-auto w-full object-cover"
          />
          <figcaption className="border-t border-border px-5 py-3 text-sm text-muted-foreground">
            A shared understanding comes before a technical solution.
          </figcaption>
        </figure>
      </div>
    </AboutSection>
  );
}
