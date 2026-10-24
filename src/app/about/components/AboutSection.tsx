import type { ReactNode } from "react";
export default function AboutSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  tinted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id + "-heading"}
      className={
        "scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20 " + (tinted ? "bg-secondary" : "bg-background")
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id + "-heading"} className="mt-3 text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
