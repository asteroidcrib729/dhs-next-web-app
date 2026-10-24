"use client";
export default function StudioError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-semibold">The studio is temporarily unavailable</h1>
      <p className="my-5 text-muted-foreground">
        Please try again. If this continues, check the PostgreSQL connection and apply the
        documented migrations. Your saved content is retained.
      </p>
      <button className="studio-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
