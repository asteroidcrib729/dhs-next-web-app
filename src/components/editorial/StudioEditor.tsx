"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "./Markdown";
import { formatArticleDate } from "@/lib/editorial/article-info";
import { blogCategories } from "@/lib/editorial/catalogue-policy";
import {
  contentPath,
  publishingIssues,
  slugify,
  type EditorialContent,
  type EditorialKind,
} from "@/lib/editorial/schema";
type Revision = {
  id: string;
  version: number;
  snapshot: EditorialContent;
  action: string;
  createdAt: string;
};
type Entry = {
  id: string;
  kind: EditorialKind;
  version: number;
  draft: EditorialContent;
  publishedSlug: string | null;
  revisions: Revision[];
};
type Media = { url: string; alt: string; label: string };
export default function StudioEditor({ initial }: { initial: Entry }) {
  const router = useRouter();
  const [entry, setEntry] = useState(initial);
  const [draft, setDraft] = useState(initial.draft);
  const [saved, setSaved] = useState(JSON.stringify(initial.draft));
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState<Media[]>([]);
  const [tab, setTab] = useState("write");
  const [uploadAlt, setUploadAlt] = useState("");
  const [mediaError, setMediaError] = useState("");
  const [uploading, setUploading] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [tagText, setTagText] = useState(initial.draft.tags.join(", "));
  const dirty = JSON.stringify(draft) !== saved;
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    const guard = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (
        dirty &&
        anchor &&
        anchor.target !== "_blank" &&
        anchor.origin === window.location.origin &&
        anchor.pathname !== window.location.pathname &&
        !window.confirm("Leave without saving your changes?")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    document.addEventListener("click", guard, true);
    return () => {
      window.removeEventListener("beforeunload", handler);
      document.removeEventListener("click", guard, true);
    };
  }, [dirty]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/studio/media", { signal: controller.signal })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw Error(data.error);
        setImages(data.images);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setMediaError(e.message);
      });
    return () => controller.abort();
  }, []);
  function change<K extends keyof EditorialContent>(key: K, value: EditorialContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setMessage("");
  }
  async function act(action: "save" | "publish" | "unpublish" | "delete") {
    if (
      (action === "unpublish" || action === "delete") &&
      !window.confirm(
        action === "delete"
          ? "Permanently delete this draft and its revision history?"
          : "Remove this article from the public website?",
      )
    )
      return;
    setPending(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/studio/entries/${entry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: entry.version, action, draft }),
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error);
      if (!data.entry) {
        router.push("/studio");
        return;
      }
      const reload = await fetch(`/api/studio/entries/${entry.id}`, { cache: "no-store" });
      if (!reload.ok)
        throw Error("Saved, but could not refresh revision history. Reload before editing again.");
      const fresh = (await reload.json()).entry;
      setEntry(fresh);
      setDraft(fresh.draft);
      setTagText(fresh.draft.tags.join(", "));
      setSaved(JSON.stringify(fresh.draft));
      setMessage(
        action === "publish"
          ? "Published. The live article and search metadata are updated."
          : action === "unpublish"
            ? "Unpublished. Your draft and revisions are preserved."
            : "Draft saved. The live version is unchanged.",
      );
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save content.");
    } finally {
      setPending(false);
    }
  }
  function insert(before: string, after = "") {
    const node = bodyRef.current;
    if (!node) return;
    const start = node.selectionStart;
    const end = node.selectionEnd;
    change(
      "body",
      draft.body.slice(0, start) +
        before +
        draft.body.slice(start, end) +
        after +
        draft.body.slice(end),
    );
    requestAnimationFrame(() => {
      node.focus();
      node.setSelectionRange(start + before.length, end + before.length);
    });
  }
  function field(
    key: Exclude<keyof EditorialContent, "tags" | "noindex" | "featured">,
    label: string,
    options: { area?: boolean; hint?: string; max?: number } = {},
  ) {
    return (
      <label>
        {label}
        {options.area ? (
          <textarea
            value={draft[key]}
            maxLength={options.max}
            rows={4}
            onChange={(e) => change(key, e.target.value)}
          />
        ) : (
          <input
            value={draft[key]}
            maxLength={options.max}
            onChange={(e) => change(key, e.target.value)}
          />
        )}{" "}
        {options.hint && <span className="studio-hint">{options.hint}</span>}
      </label>
    );
  }
  const issues = publishingIssues(draft, entry.kind);
  const seoTitle = draft.seoTitle || draft.title;
  const seoDescription = draft.seoDescription || draft.excerpt;
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/studio" className="text-sm text-primary">
          All content
        </Link>
        <p role="status" className="text-sm text-muted-foreground">
          {entry.publishedSlug ? "Published" : "Draft"} · Revision {entry.version} ·{" "}
          {dirty ? "Unsaved changes" : "All changes saved"}
        </p>
      </div>
      <div className="my-6 flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {entry.kind === "BLOG" ? "Blog article" : "Case study"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Shape your story.</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="studio-button secondary"
            disabled={pending || uploading}
            onClick={() => act("save")}
          >
            Save draft
          </button>
          <Link
            href={`/studio/preview/${entry.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={dirty}
            onClick={(e) => {
              if (dirty) {
                e.preventDefault();
                setError("Save your draft before opening its preview.");
              }
            }}
            className="studio-button secondary"
          >
            Preview saved draft
          </Link>
          <button
            className="studio-button"
            disabled={pending || uploading}
            onClick={() => act("publish")}
          >
            {pending ? "Working…" : "Publish"}
          </button>
        </div>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Created at stays fixed. Updated at starts with first publication and changes when you
        publish revised article content, images, tags, URLs or SEO settings. Saving a draft,
        restoring a revision without publishing, or changing only Featured content does not advance
        it.
      </p>
      {message && (
        <p role="status" className="mb-5 rounded-lg border border-primary/30 bg-secondary p-4">
          {message}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900"
        >
          {error}
        </p>
      )}
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="studio-panel studio-form">
            <h2>Article details</h2>
            {field("title", "Title", { max: 180 })}
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                {field("slug", "URL slug", { max: 140, hint: contentPath(entry.kind, draft.slug) })}
              </div>
              <button
                type="button"
                className="studio-button secondary mb-6 shrink-0"
                onClick={() => change("slug", slugify(draft.title))}
              >
                From title
              </button>
            </div>
            {field("excerpt", "Excerpt", {
              area: true,
              max: 500,
              hint: `${draft.excerpt.length}/500 characters`,
            })}
            {entry.kind === "BLOG" ? (
              <label>
                Category
                <select value={draft.category} onChange={(e) => change("category", e.target.value)}>
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {!blogCategories.some((c) => c === draft.category) && draft.category && (
                    <option value={draft.category} disabled>
                      {draft.category} (choose a current category)
                    </option>
                  )}
                  {blogCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="studio-hint">
                  Use a category aligned with the current services.
                </span>
              </label>
            ) : (
              field("category", "Category", { max: 80 })
            )}
            <label>
              Tags
              <input
                value={tagText}
                onChange={(e) => {
                  setTagText(e.target.value);
                  change(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  );
                }}
                placeholder="SEO, Strategy, Infrastructure"
              />
              <span className="studio-hint">Up to 12 tags, separated by commas.</span>
            </label>
            <label className="studio-check">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => change("featured", e.target.checked)}
              />
              Featured content
            </label>
          </section>
          <section className="studio-panel studio-form">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Article content</h2>
              <div className="flex gap-2">
                {["write", "preview"].map((t) => (
                  <button
                    type="button"
                    key={t}
                    aria-pressed={tab === t}
                    className="studio-button secondary"
                    onClick={() => setTab(t)}
                  >
                    {t === "write" ? "Write" : "Preview"}
                  </button>
                ))}
              </div>
            </div>
            {tab === "write" ? (
              <>
                <div className="my-3 flex flex-wrap gap-2" aria-label="Markdown tools">
                  {[
                    ["Heading", "\n## ", ""],
                    ["Bold", "**", "**"],
                    ["List", "\n- ", ""],
                    ["Link", "[", "](https://)"],
                  ].map(([label, start, end]) => (
                    <button
                      type="button"
                      key={label}
                      className="rounded-md border border-border px-3 py-1 text-sm"
                      onClick={() => insert(start, end)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <label className="sr-only" htmlFor="article-body">
                  Article body
                </label>
                <textarea
                  id="article-body"
                  ref={bodyRef}
                  className="min-h-96 font-mono text-sm"
                  value={draft.body}
                  maxLength={100000}
                  onChange={(e) => change("body", e.target.value)}
                />
                <p className="studio-hint">
                  Markdown supports headings, lists, links, tables and code. The page title supplies
                  H1. Raw HTML and inline images are disabled; use the accessible landscape cover.
                </p>
              </>
            ) : (
              <div className="py-5">
                <Markdown body={draft.body} />
              </div>
            )}
          </section>
          {entry.kind === "CASE_STUDY" && (
            <section className="studio-panel studio-form">
              <h2>Case study</h2>
              {field("client", "Client or anonymized organization")}
              {field("industry", "Industry")}
              {field("challenge", "Challenge", { area: true, max: 2000 })}
              {field("solution", "Solution", { area: true, max: 4000 })}
              {field("results", "Results", {
                area: true,
                max: 4000,
                hint: "Publish only verified results you have permission to share.",
              })}
            </section>
          )}
          <section className="studio-panel studio-form">
            <h2>Search and sharing</h2>
            {field("seoTitle", "SEO title", {
              max: 100,
              hint: `${draft.seoTitle.length} characters. Aim for a clear, concise title around 50 to 60 characters.`,
            })}
            {field("seoDescription", "SEO description", {
              area: true,
              max: 320,
              hint: `${draft.seoDescription.length} characters. Around 140 to 160 often reads well; search engines may rewrite it.`,
            })}
            {field("canonicalUrl", "Canonical URL override", {
              hint: "Optional HTTPS URL. Leave blank to use this article’s SITE_URL address.",
            })}
            <label className="studio-check">
              <input
                type="checkbox"
                checked={draft.noindex}
                onChange={(e) => change("noindex", e.target.checked)}
              />
              Ask search engines not to index this article
            </label>
            <div className="mt-5 rounded-xl border border-border bg-background p-5">
              <p className="text-xs text-muted-foreground">Search preview</p>
              <p className="mt-2 break-all text-xs text-muted-foreground">
                {draft.canonicalUrl || contentPath(entry.kind, draft.slug)}
              </p>
              <p className="mt-2 text-xl text-primary">{seoTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{seoDescription}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                The cover is also used for social sharing. Actual search appearance can vary.
              </p>
            </div>
          </section>
        </div>
        <aside className="space-y-6">
          <section className="studio-panel studio-form">
            <h2>Cover image</h2>
            {draft.coverImage && (
              <div className="relative my-4 aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={draft.coverImage}
                  alt={draft.coverAlt}
                  fill
                  sizes="340px"
                  className="object-cover"
                  unoptimized={draft.coverImage.startsWith("/media/")}
                />
              </div>
            )}
            <label>
              Media library
              <select
                aria-label="Media library"
                value={draft.coverImage}
                onChange={(e) => {
                  const m = images.find((i) => i.url === e.target.value);
                  setDraft((d) => ({
                    ...d,
                    coverImage: e.target.value,
                    coverAlt: m?.alt || d.coverAlt,
                  }));
                }}
              >
                <option value="">Select an image</option>
                {images.map((i) => (
                  <option key={i.url} value={i.url}>
                    {i.label}
                  </option>
                ))}
              </select>
            </label>
            {field("coverAlt", "Cover alternative text", { max: 250 })}
            <div className="mt-5 border-t border-border pt-4">
              <label>
                Alternative text for upload
                <input
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  maxLength={250}
                />
              </label>
              <label>
                Upload landscape photo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  disabled={pending || uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setMediaError("");
                    if (!uploadAlt.trim()) {
                      setMediaError("Describe the image before uploading.");
                      e.target.value = "";
                      return;
                    }
                    if (file.size > 4 * 1024 * 1024) {
                      setMediaError("Choose an image under 4 MiB.");
                      return;
                    }
                    setUploading(true);
                    try {
                      const response = await fetch("/api/studio/media", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/octet-stream",
                          "x-image-alt": encodeURIComponent(uploadAlt),
                        },
                        body: file,
                      });
                      const data = await response.json();
                      if (!response.ok) throw Error(data.error);
                      setImages((items) => [
                        { url: data.url, alt: data.alt, label: file.name },
                        ...items.filter((i) => i.url !== data.url),
                      ]);
                      setDraft((d) => ({ ...d, coverImage: data.url, coverAlt: uploadAlt }));
                      setUploadAlt("");
                    } catch (err) {
                      setMediaError(err instanceof Error ? err.message : "Upload failed.");
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </label>
              {draft.coverImage.startsWith("/media/") && (
                <button
                  type="button"
                  className="studio-button secondary mt-4"
                  disabled={pending || uploading}
                  onClick={async () => {
                    if (!window.confirm("Delete this upload if no article or revision uses it?"))
                      return;
                    setMediaError("");
                    try {
                      const response = await fetch("/api/studio/media", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: draft.coverImage.slice(7) }),
                      });
                      const data = await response.json();
                      if (!response.ok) throw Error(data.error);
                      setImages((items) => items.filter((i) => i.url !== draft.coverImage));
                      change("coverImage", "");
                    } catch (error) {
                      setMediaError(
                        error instanceof Error ? error.message : "Could not delete image.",
                      );
                    }
                  }}
                >
                  Delete unused upload
                </button>
              )}
              <p className="studio-hint">
                Landscape JPEG, PNG, WebP or AVIF, up to 4 MiB. Optimized to WebP and stored in
                PostgreSQL, so uploads persist on Vercel.
              </p>
              {uploading && <p role="status">Optimizing image…</p>}
              {mediaError && (
                <p role="alert" className="text-sm text-red-800">
                  {mediaError}
                </p>
              )}
            </div>
          </section>
          <section className="studio-panel">
            <h2>Publication checklist</h2>
            {issues.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-primary">Ready for your final review.</p>
            )}
            {entry.publishedSlug && (
              <div className="mt-5 space-y-4">
                <Link
                  href={contentPath(entry.kind, entry.publishedSlug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary"
                >
                  View published article
                </Link>
                <button
                  className="studio-button secondary"
                  disabled={pending}
                  onClick={() => act("unpublish")}
                >
                  Unpublish
                </button>
              </div>
            )}
          </section>
          <section className="studio-panel studio-form">
            <h2>Revision history</h2>
            <label>
              Restore a saved draft
              <select
                defaultValue=""
                onChange={(e) => {
                  const revision = entry.revisions.find((r) => r.id === e.target.value);
                  if (
                    revision &&
                    (!dirty || window.confirm("Replace your unsaved text with this revision?"))
                  ) {
                    setDraft(revision.snapshot);
                    setTagText(revision.snapshot.tags.join(", "));
                    setMessage("Revision loaded into the editor. Save or publish to apply it.");
                  }
                  e.target.value = "";
                }}
              >
                <option value="">Choose a revision</option>
                {entry.revisions.map((r) => (
                  <option key={r.id} value={r.id}>
                    v{r.version} · {r.action} · {formatArticleDate(r.createdAt)}
                  </option>
                ))}
              </select>
            </label>
            <p className="studio-hint">
              The latest 30 revisions are listed. Restoring does not change the live article until
              you publish.
            </p>
          </section>
          {!entry.publishedSlug && (
            <section className="studio-panel">
              <h2>Delete draft</h2>
              <p className="my-3 text-sm text-muted-foreground">
                Permanently removes this draft and its revisions.
              </p>
              <button
                className="studio-button danger"
                disabled={pending}
                onClick={() => act("delete")}
              >
                Delete draft
              </button>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
