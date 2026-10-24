export default function CaseStudiesPageResults() {
  return (
    <section className="border-y border-border bg-secondary px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold">From the brief to the handover</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Explore the problem, proposed approach and acceptance criteria. Illustrative scenarios are
          labelled; historical figures remain subject to editorial verification.
        </p>
        <ol className="mt-7 grid gap-5 sm:grid-cols-3">
          {[
            "Understand the workflow",
            "Build and verify the solution",
            "Document the handover",
          ].map((text, i) => (
            <li key={text} className="flex items-center gap-3 text-sm font-medium">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-primary">
                {i + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
