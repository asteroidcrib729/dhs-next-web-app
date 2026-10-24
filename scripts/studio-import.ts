import "dotenv/config";
import { legacyEntries } from "../src/lib/editorial/legacy";
import { getPrisma } from "../src/lib/prisma";
// Explicit first-deployment migration of content already public in the bundled catalogue.
// Existing database entries are always preserved; the default import remains drafts only.
const publishCurrent = process.argv.includes("--publish-current");
const db = getPrisma();
try {
  let count = 0;
  await db.$transaction(
    async (tx) => {
      for (const entry of legacyEntries) {
        const exists = await tx.editorialEntry.findUnique({ where: { id: entry.id } });
        if (exists) continue;
        await tx.editorialEntry.create({
          data: {
            id: entry.id,
            kind: entry.kind,
            createdAt: new Date(entry.createdAt),
            draft: entry.content,
            ...(publishCurrent
              ? {
                  published: entry.content,
                  publishedSlug: entry.content.slug,
                  publishedAt: new Date(entry.publishedAt),
                  publishedUpdatedAt: new Date(entry.updatedAt),
                }
              : {}),
            revisions: {
              create: {
                version: 1,
                snapshot: entry.content,
                action: publishCurrent ? "publish" : "import",
              },
            },
          },
        });
        count++;
      }
    },
    { timeout: 60000 },
  );
  console.log(
    publishCurrent
      ? `Migrated ${count} currently public catalogue entries, preserving content, dates and noindex flags. Existing database entries were preserved.`
      : `Imported ${count} catalogue entries as drafts. Existing entries were preserved. Review, expand and verify content before publishing. A configured database shows only published content.`,
  );
} finally {
  await db.$disconnect();
}
