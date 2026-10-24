import { Compass, Layers3, MessageCircle } from "lucide-react";
const principles = [
  {
    Icon: Compass,
    title: "A clear direction",
    description:
      "We start with your objectives, ask useful questions and turn the brief into a practical plan.",
  },
  {
    Icon: Layers3,
    title: "Connected expertise",
    description:
      "Marketing, design and engineering work toward the same goals, with decisions grounded in your business needs.",
  },
  {
    Icon: MessageCircle,
    title: "A collaborative process",
    description:
      "Expect clear updates, thoughtful feedback and a shared understanding of what happens next.",
  },
];
export default function TestimonialsSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">The Digital Horizon approach</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Built around your goals.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map(({ Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-border bg-background p-7">
              <Icon size={25} className="text-primary" />
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
