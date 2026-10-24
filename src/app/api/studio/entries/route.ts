import { getPrisma } from "@/lib/prisma";
import {
  requireEditor,
  requireSameOrigin,
  boundedJson,
  studioFailure,
  StudioError,
} from "@/lib/editorial/access";
import { emptyContent, kindSchema, contentSchema } from "@/lib/editorial/schema";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireEditor(request.headers);
    const entries = await getPrisma().editorialEntry.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        kind: true,
        draft: true,
        publishedSlug: true,
        version: true,
        updatedAt: true,
      },
    });
    return Response.json(
      {
        entries: entries.map(({ draft, ...entry }) => {
          const content = contentSchema.parse(draft);
          return { ...entry, draft: { title: content.title, category: content.category } };
        }),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return studioFailure(error);
  }
}
export async function POST(request: Request) {
  try {
    await requireEditor(request.headers);
    requireSameOrigin(request);
    const input = await boundedJson(request, 1000);
    const kind = kindSchema.safeParse(input?.kind);
    if (!kind.success) throw new StudioError("Choose a blog or case study.");
    const entry = await getPrisma().editorialEntry.create({
      data: {
        kind: kind.data,
        draft: emptyContent,
        revisions: { create: { version: 1, snapshot: emptyContent, action: "create" } },
      },
    });
    return Response.json({ entry }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioFailure(error);
  }
}
