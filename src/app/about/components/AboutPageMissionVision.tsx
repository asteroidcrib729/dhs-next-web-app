import AboutSection from "./AboutSection";
export default function AboutPageMissionVision() {
  return (
    <AboutSection id="our-direction" eyebrow="What guides the work" title="Our Direction" tinted>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Our Mission",
            text: "Build useful digital experiences and business tools that fit real workflows, with clear communication and a responsible approach to information.",
          },
          {
            title: "Our Vision",
            text: "Help businesses develop a connected foundation where their website, internal software and infrastructure can evolve together.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border bg-white p-7 sm:p-8"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>
    </AboutSection>
  );
}
