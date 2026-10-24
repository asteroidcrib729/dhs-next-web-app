"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { EditorialContent, EditorialKind } from "@/lib/editorial/schema";
type Entry = {
  id: string;
  kind: EditorialKind;
  draft: EditorialContent;
  publishedSlug: string | null;
  updatedAt: string;
};
export default function StudioDashboard() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/studio/entries", { signal: controller.signal })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw Error(data.error);
        setEntries(data.entries);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);
  async function create(type: EditorialKind) {
    setPending(true);
    setError("");
    try {
      const r = await fetch("/api/studio/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: type }),
      });
      const data = await r.json();
      if (!r.ok) throw Error(data.error);
      router.push(`/studio/edit/${data.entry.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create article.");
    } finally {
      setPending(false);
    }
  }
  const filtered = entries.filter(
    (e) =>
      (kind === "ALL" || kind === e.kind) &&
      (status === "ALL" || (status === "PUBLISHED") === Boolean(e.publishedSlug)) &&
      `${e.draft.title} ${e.draft.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-primary">CONTENT WORKSPACE</p>
          <h1 className="mt-2 text-4xl font-semibold">Stories with purpose.</h1>
          <p className="mt-3 text-muted-foreground">Plan, refine and publish your next insight.</p>
        </div>
        <button
          className="studio-button secondary"
          onClick={async () => {
            setPending(true);
            setError("");
            try {
              const response = await fetch("/api/auth/sign-out", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: "{}",
              });
              if (!response.ok) throw new Error("Could not sign out. Please try again.");
              router.replace("/studio/login");
              router.refresh();
            } catch (error) {
              setError(
                error instanceof Error ? error.message : "Could not sign out. Please try again.",
              );
            } finally {
              setPending(false);
            }
          }}
          disabled={pending}
        >
          Sign out
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button className="studio-button" disabled={pending} onClick={() => create("BLOG")}>
          New blog article
        </button>
        <button
          className="studio-button secondary"
          disabled={pending}
          onClick={() => create("CASE_STUDY")}
        >
          New case study
        </button>
      </div>
      <div className="studio-form mt-8 grid gap-4 sm:grid-cols-3">
        <label>
          Search
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title or category"
          />
        </label>
        <label>
          Content type
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="ALL">All content</option>
            <option value="BLOG">Blog articles</option>
            <option value="CASE_STUDY">Case studies</option>
          </select>
        </label>
        <label>
          Publication
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">All statuses</option>
            <option value="DRAFT">Drafts</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-6 text-red-800">
          {error}
        </p>
      )}
      {loading ? (
        <p className="mt-8" role="status">
          Loading content…
        </p>
      ) : (
        <div className="mt-8 grid gap-4">
          {!filtered.length && (
            <p className="rounded-2xl border border-border bg-white p-8 text-muted-foreground">
              No matching content. Create an article or import the existing catalogue using the
              setup command.
            </p>
          )}
          {filtered.map((e) => (
            <Link
              key={e.id}
              href={`/studio/edit/${e.id}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 hover:border-primary"
            >
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-primary">
                  {e.kind === "BLOG" ? "Blog" : "Case study"} ·{" "}
                  {e.publishedSlug ? "Published with editable draft" : "Draft"}
                </p>
                <h2 className="text-xl font-semibold">{e.draft.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {e.draft.category || "Uncategorized"}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                Updated{" "}
                {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(
                  new Date(e.updatedAt),
                )}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
