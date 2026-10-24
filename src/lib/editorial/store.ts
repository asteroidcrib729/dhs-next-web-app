import { cache } from "react";
import { getPrisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import manifest from "../../../development-plans/assets-manifest.json";
import {
  contentSchema,
  publishingIssues,
  type EditorialContent,
  type EditorialKind,
  type PublicEntry,
} from "./schema";
import { resolvePublicSlug, isCurrentPublicContent } from "./catalogue-policy";
import { legacyEntries } from "./legacy";
import { StudioError } from "./access";
import { publicationDates, recoverPublicationHistory } from "./publication";

export const libraryImages = manifest.assets
  .filter((a) => a.output.startsWith("images/") && !a.output.includes("/logos/"))
  .map((a) => `/${a.output}`);
export async function validateImage(
  path: string,
  db: Pick<Prisma.TransactionClient, "editorialMedia"> = getPrisma(),
) {
  if (!path) return;
  if (libraryImages.includes(path)) return;
  if (
    path.startsWith("/media/") &&
    (await db.editorialMedia.findUnique({
      where: { id: path.slice(7) },
      select: { id: true },
    }))
  )
    return;
  throw new StudioError("The selected image does not exist in the media library.");
}
export const listPublished = cache(async (kind: EditorialKind): Promise<PublicEntry[]> => {
  if (!process.env.DATABASE_URL)
    return legacyEntries
      .filter((e) => e.kind === kind)
      .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const entries = await getPrisma().editorialEntry.findMany({
    where: { kind, publishedSlug: { not: null } },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      kind: true,
      published: true,
      createdAt: true,
      publishedAt: true,
      publishedUpdatedAt: true,
    },
  });
  return entries
    .map((e) => ({
      id: e.id,
      kind: e.kind,
      content: contentSchema.parse(e.published),
      createdAt: e.createdAt.toISOString(),
      publishedAt: e.publishedAt!.toISOString(),
      updatedAt: e.publishedUpdatedAt!.toISOString(),
    }))
    .filter((e) => isCurrentPublicContent(e.kind, e.content));
});
export const findPublished = cache(async (kind: EditorialKind, requestedSlug: string) => {
  const slug = resolvePublicSlug(kind, requestedSlug);
  if (!process.env.DATABASE_URL)
    return (
      legacyEntries.find(
        (e) =>
          e.kind === kind &&
          (e.content.slug === slug ||
            e.id === `legacy-${kind === "BLOG" ? "blog" : "case"}-${slug}`),
      ) ?? null
    );
  const selection = {
    id: true,
    kind: true,
    published: true,
    createdAt: true,
    publishedSlug: true,
    publishedAt: true,
    publishedUpdatedAt: true,
  } as const;
  const db = getPrisma();
  let entry = await db.editorialEntry.findUnique({
    where: { kind_publishedSlug: { kind, publishedSlug: slug } },
    select: selection,
  });
  if (!entry && /^\d+$/.test(slug))
    entry = await db.editorialEntry.findFirst({
      where: {
        id: `legacy-${kind === "BLOG" ? "blog" : "case"}-${slug}`,
        kind,
        publishedSlug: { not: null },
      },
      select: selection,
    });
  if (entry && !isCurrentPublicContent(entry.kind, contentSchema.parse(entry.published)))
    return null;
  if (entry)
    return {
      id: entry.id,
      kind: entry.kind,
      content: contentSchema.parse(entry.published),
      createdAt: entry.createdAt.toISOString(),
      publishedAt: entry.publishedAt!.toISOString(),
      updatedAt: entry.publishedUpdatedAt!.toISOString(),
    };
  const old = await getPrisma().editorialRedirect.findUnique({
    where: { kind_slug: { kind, slug } },
    select: { entry: { select: selection } },
  });
  entry = old?.entry ?? null;
  return entry?.publishedSlug &&
    entry.published &&
    isCurrentPublicContent(entry.kind, contentSchema.parse(entry.published))
    ? {
        id: entry.id,
        kind: entry.kind,
        content: contentSchema.parse(entry.published),
        createdAt: entry.createdAt.toISOString(),
        publishedAt: entry.publishedAt!.toISOString(),
        updatedAt: entry.publishedUpdatedAt!.toISOString(),
      }
    : null;
});
export async function mutateEntry(
  id: string,
  version: number,
  action: "save" | "publish" | "unpublish" | "delete",
  draft: EditorialContent,
) {
  const db = getPrisma();
  return db.$transaction(async (tx) => {
    const current = await tx.editorialEntry.findUnique({ where: { id } });
    if (!current) throw new StudioError("Article not found.", 404);
    if (current.version !== version)
      throw new StudioError(
        "Another editor changed this article. Reload it before saving. Your text is still in the editor.",
        409,
      );
    if (action === "delete") {
      if (current.publishedSlug)
        throw new StudioError("Unpublish this article before deleting it.", 409);
      const deleted = await tx.editorialEntry.deleteMany({
        where: { id, version, publishedSlug: null },
      });
      if (!deleted.count)
        throw new StudioError("The article changed. Reload it before deleting.", 409);
      return null;
    }
    if (draft.coverImage.startsWith("/media/")) {
      // Serialize publication/reference changes with unused-image deletion.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${draft.coverImage}, 0))`;
    }
    await validateImage(draft.coverImage, tx);
    if (action === "publish") {
      const issues = publishingIssues(draft, current.kind);
      if (issues.length) throw new StudioError(issues.join(" "));
      // A previous URL belonging to another article cannot be reused silently.
      const previous = await tx.editorialRedirect.findUnique({
        where: { kind_slug: { kind: current.kind, slug: draft.slug } },
      });
      if (previous && previous.entryId !== id)
        throw new StudioError(
          "This URL is reserved by an earlier article. Choose another slug.",
          409,
        );
    }
    const now = new Date();
    let dates: { publishedAt: Date; publishedUpdatedAt: Date } | undefined;
    if (action === "publish") {
      let previous = current.published ? contentSchema.parse(current.published) : null;
      let publishedAt = current.publishedAt;
      let updatedAt = current.publishedUpdatedAt;
      if (!publishedAt || !updatedAt) {
        // Older unpublishes cleared these dates. Recover only from recorded
        // publication events, excluding draft saves, imports and previews.
        const history = await tx.editorialRevision.findMany({
          where: { entryId: id, action: "publish" },
          orderBy: { version: "asc" },
          select: { snapshot: true, createdAt: true },
        });
        const recovered = recoverPublicationHistory(
          history.map((r) => ({
            snapshot: contentSchema.parse(r.snapshot),
            createdAt: r.createdAt,
          })),
        );
        previous ??= recovered.previous;
        publishedAt ??= recovered.publishedAt;
        updatedAt ??= recovered.updatedAt;
      } else if (!previous) {
        const revision = await tx.editorialRevision.findFirst({
          where: { entryId: id, action: "publish" },
          orderBy: { version: "desc" },
          select: { snapshot: true },
        });
        if (revision) previous = contentSchema.parse(revision.snapshot);
      }
      dates = publicationDates({ previous, next: draft, publishedAt, updatedAt, now });
    }
    const changed = await tx.editorialEntry.updateMany({
      where: { id, version },
      data: {
        draft,
        version: { increment: 1 },
        ...(action === "publish"
          ? {
              published: draft,
              publishedSlug: draft.slug,
              ...dates,
            }
          : {}),
        ...(action === "unpublish"
          ? {
              published: Prisma.DbNull,
              publishedSlug: null,
              // Keep the publication timeline while withdrawing public content.
            }
          : {}),
      },
    });
    if (!changed.count)
      throw new StudioError("Another editor saved first. Reload before saving.", 409);
    if (action === "publish" && current.publishedSlug && current.publishedSlug !== draft.slug)
      await tx.editorialRedirect.upsert({
        where: { kind_slug: { kind: current.kind, slug: current.publishedSlug } },
        create: { kind: current.kind, slug: current.publishedSlug, entryId: id },
        update: { entryId: id },
      });
    await tx.editorialRevision.create({
      data: { entryId: id, version: version + 1, snapshot: draft, action },
    });
    return tx.editorialEntry.findUniqueOrThrow({ where: { id } });
  });
}
