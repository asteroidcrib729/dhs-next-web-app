import "dotenv/config";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { getPrisma } from "../src/lib/prisma";
import { createStudioAuth } from "../src/lib/auth";
import { mutateEntry, listPublished, findPublished } from "../src/lib/editorial/store";
import { emptyContent } from "../src/lib/editorial/schema";
if (process.env.DATABASE_TEST_ALLOW_WRITE !== "true")
  throw new Error("Set DATABASE_TEST_ALLOW_WRITE=true only for an isolated verification database.");
const db = getPrisma();
const suffix = randomUUID();
let userId: string | undefined;
let entryId: string | undefined;
let caseId: string | undefined;
try {
  const auth = createStudioAuth(true);
  const account = await auth.api.signUpEmail({
    body: {
      name: "Editorial team",
      email: `editorial-${suffix}@example.invalid`,
      password: `Private-check-${suffix}`,
    },
  });
  userId = account.user.id;
  assert.equal(account.user.editor, false, "New accounts cannot promote themselves.");
  await db.user.update({ where: { id: userId }, data: { editor: true } });
  const draft = {
    ...emptyContent,
    title: "Editorial integration check",
    slug: `check-${suffix}`,
    excerpt: "An isolated check of the editorial publication process.",
    category: "Infrastructure",
    body: "## A dependable publishing process\n\nThis integration check verifies drafts, publication snapshots, conflicts and revisions without changing real content.",
    coverImage: "/images/case-studies/infrastructure.webp",
    coverAlt: "Server racks in a data center",
    seoTitle: "Editorial integration check",
    seoDescription: "An isolated check of drafts, publication and search metadata.",
  };
  const entry = await db.editorialEntry.create({ data: { kind: "BLOG", draft } });
  entryId = entry.id;
  assert.ok(!(await listPublished("BLOG")).some((e) => e.id === entry.id));
  const published = await mutateEntry(entry.id, 1, "publish", draft);
  assert.equal(published!.publishedSlug, draft.slug);
  const edited = { ...draft, title: "Unpublished changes" };
  await mutateEntry(entry.id, 2, "save", edited);
  const afterDraft = await db.editorialEntry.findUniqueOrThrow({ where: { id: entry.id } });
  assert.equal((afterDraft.published as { title: string }).title, draft.title);
  assert.equal((afterDraft.draft as { title: string }).title, edited.title);
  await assert.rejects(() => mutateEntry(entry.id, 2, "save", draft), /Another editor/);
  const results = await Promise.allSettled([
    mutateEntry(entry.id, 3, "save", edited),
    mutateEntry(entry.id, 3, "save", draft),
  ]);
  assert.equal(
    results.filter((r) => r.status === "fulfilled").length,
    1,
    "Only one simultaneous save can win.",
  );
  const changed = { ...draft, slug: `renamed-${suffix}` };
  await mutateEntry(entry.id, 4, "publish", changed);
  const redirect = await db.editorialRedirect.findUniqueOrThrow({
    where: { kind_slug: { kind: "BLOG", slug: draft.slug } },
  });
  assert.equal(redirect.entryId, entry.id);
  await assert.rejects(() => mutateEntry(entry.id, 5, "delete", draft), /Unpublish/);
  const caseEntry = await db.editorialEntry.create({ data: { kind: "CASE_STUDY", draft } });
  caseId = caseEntry.id;
  await assert.rejects(() => mutateEntry(caseEntry.id, 1, "publish", draft), /challenge/);
  await mutateEntry(caseEntry.id, 1, "publish", {
    ...draft,
    challenge: "An infrastructure planning challenge.",
    solution: "A measured and documented approach.",
    results: "Verified acceptance checks completed.",
  });
  await mutateEntry(caseEntry.id, 2, "unpublish", draft);
  await mutateEntry(caseEntry.id, 3, "delete", draft);
  caseId = undefined;
  assert.equal(await db.editorialRevision.count({ where: { entryId: entry.id } }), 4);
  await mutateEntry(entry.id, 5, "unpublish", draft);
  assert.equal(
    (await db.editorialEntry.findUniqueOrThrow({ where: { id: entry.id } })).published,
    null,
  );
  await mutateEntry(entry.id, 6, "delete", draft);
  entryId = undefined;
  assert.equal(await db.editorialRedirect.count({ where: { entryId: entry.id } }), 0);
  // A separate record exercises public dates without depending on clock sleeps.
  const datesCreated = new Date("2026-01-01T08:00:00Z");
  const datesPublished = new Date("2026-01-10T08:00:00Z");
  const dateEntry = await db.editorialEntry.create({
    data: { kind: "BLOG", draft, createdAt: datesCreated },
  });
  entryId = dateEntry.id;
  let dateVersion = 1;
  async function dateAction(action: "save" | "publish" | "unpublish", content = draft) {
    const result = await mutateEntry(dateEntry.id, dateVersion, action, content);
    dateVersion++;
    return result!;
  }
  const firstPublication = await dateAction("publish");
  assert.equal(firstPublication.createdAt.toISOString(), datesCreated.toISOString());
  assert.equal(
    firstPublication.publishedAt!.toISOString(),
    firstPublication.publishedUpdatedAt!.toISOString(),
  );
  await db.editorialEntry.update({
    where: { id: dateEntry.id },
    data: { publishedAt: datesPublished, publishedUpdatedAt: datesPublished },
  });
  await db.editorialRevision.updateMany({
    where: { entryId: dateEntry.id, action: "publish" },
    data: { createdAt: datesPublished },
  });
  function unchangedDates(value: typeof firstPublication) {
    assert.equal(value.createdAt.toISOString(), datesCreated.toISOString());
    assert.equal(value.publishedAt!.toISOString(), datesPublished.toISOString());
    assert.equal(value.publishedUpdatedAt!.toISOString(), datesPublished.toISOString());
  }
  unchangedDates(
    await dateAction("save", { ...draft, body: draft.body + " Private draft changes." }),
  );
  unchangedDates(await dateAction("publish"));
  unchangedDates(await dateAction("publish", { ...draft, featured: true }));
  unchangedDates(await dateAction("unpublish"));
  assert.equal(await findPublished("BLOG", draft.slug), null);
  assert.ok(!(await listPublished("BLOG")).some((e) => e.id === dateEntry.id));
  unchangedDates(await dateAction("publish"));
  const corrected = {
    ...draft,
    body: draft.body + " A published correction.",
    coverAlt: "Accessible revised cover description",
  };
  const correction = await dateAction("publish", corrected);
  assert.equal(correction.publishedAt!.toISOString(), datesPublished.toISOString());
  assert.ok(correction.publishedUpdatedAt!.getTime() > datesPublished.getTime());
  const visible = await findPublished("BLOG", draft.slug);
  assert.equal(visible!.createdAt, datesCreated.toISOString());
  assert.equal(visible!.updatedAt, correction.publishedUpdatedAt!.toISOString());
  const unchanged = await dateAction("publish", corrected);
  assert.equal(
    unchanged.publishedUpdatedAt!.toISOString(),
    correction.publishedUpdatedAt!.toISOString(),
  );
  await db.editorialEntry.update({
    where: { id: dateEntry.id },
    data: { publishedUpdatedAt: new Date("2026-01-15T00:00:00Z") },
  });
  const reverted = await dateAction("publish");
  assert.ok(reverted.publishedUpdatedAt!.getTime() > new Date("2026-01-15T00:00:00Z").getTime());
  assert.equal(reverted.createdAt.toISOString(), datesCreated.toISOString());
  await dateAction("unpublish");
  await mutateEntry(dateEntry.id, dateVersion, "delete", draft);
  entryId = undefined;

  // Recover timelines cleared by the older unpublish implementation.
  const historical = await db.editorialEntry.create({
    data: {
      kind: "BLOG",
      draft: corrected,
      version: 4,
      createdAt: datesCreated,
      revisions: {
        create: [
          { version: 1, action: "publish", snapshot: draft, createdAt: datesPublished },
          {
            version: 2,
            action: "publish",
            snapshot: corrected,
            createdAt: new Date("2026-01-15T00:00:00Z"),
          },
          {
            version: 3,
            action: "publish",
            snapshot: { ...corrected, featured: true },
            createdAt: new Date("2026-01-18T00:00:00Z"),
          },
        ],
      },
    },
  });
  entryId = historical.id;
  const recovered = await mutateEntry(historical.id, 4, "publish", corrected);
  assert.equal(recovered!.publishedAt!.toISOString(), datesPublished.toISOString());
  assert.equal(recovered!.publishedUpdatedAt!.toISOString(), "2026-01-15T00:00:00.000Z");
  await mutateEntry(historical.id, 5, "unpublish", corrected);
  await mutateEntry(historical.id, 6, "delete", corrected);
  entryId = undefined;
  console.log(
    "Editorial auth schema, private drafts, immutable live snapshots, concurrent-save conflict protection, publication, redirects, revisions, case-study validation, publication dates, unchanged/featured-only republishes, withdrawal/republication, revisions and historical date recovery passed.",
  );
} finally {
  if (entryId) await db.editorialEntry.deleteMany({ where: { id: entryId } });
  if (caseId) await db.editorialEntry.deleteMany({ where: { id: caseId } });
  if (userId) await db.user.deleteMany({ where: { id: userId } });
  await db.$disconnect();
}
