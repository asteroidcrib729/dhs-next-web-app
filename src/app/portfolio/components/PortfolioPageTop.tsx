export default function PortfolioPageTop() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Work We&#39;re Proud Of
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A curated selection of projects delivered by Digital Horizon Systems, blending smart
            digital strategy with robust IT foundations.
          </p>

          {/* stat chips */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-border bg-white/70 px-4 py-1 text-sm text-foreground backdrop-blur">
              500+ Projects
            </span>
            <span className="rounded-full border border-border bg-white/70 px-4 py-1 text-sm text-foreground backdrop-blur">
              98% Satisfaction
            </span>
            <span className="rounded-full border border-border bg-white/70 px-4 py-1 text-sm text-foreground backdrop-blur">
              Average 350% ROI
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
