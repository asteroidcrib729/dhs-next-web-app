import "dotenv/config";
import { legacyEntries } from "../src/lib/editorial/legacy";
import { getPrisma } from "../src/lib/prisma";
const db = getPrisma();
try {
  let count = 0;
  await db.$transaction(async (tx) => {
    for (const entry of legacyEntries) {
      const exists = await tx.editorialEntry.findUnique({ where: { id: entry.id } });
      if (exists) continue;
      await tx.editorialEntry.create({
        data: {
          id: entry.id,
          kind: entry.kind,
          createdAt: new Date(entry.createdAt),
          draft: entry.content,
          revisions: { create: { version: 1, snapshot: entry.content, action: "import" } },
        },
      });
      count++;
    }
  });
  console.log(
    `Imported ${count} catalogue entries as drafts. Existing entries were preserved. Review, expand and verify content before publishing. A configured database shows only published content.`,
  );
} finally {
  await db.$disconnect();
}
