import Link from "next/link";
export default function AboutPageTop() {
  return (
    <section className="page-hero px-5 sm:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Purposeful technology. Clear direction.</p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">About Digital Horizon Systems</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          We connect websites, customized desktop software and dependable infrastructure around the
          way your business works.
        </p>
        <nav aria-label="Explore this page" className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            ["Our Story", "#our-story"],
            ["How We Work", "#methodology"],
            ["Our Principles", "#our-principles"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-sm font-medium text-primary hover:bg-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
