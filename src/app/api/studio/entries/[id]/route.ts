import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import {
  requireEditor,
  requireSameOrigin,
  boundedJson,
  studioFailure,
  StudioError,
} from "@/lib/editorial/access";
import { contentSchema } from "@/lib/editorial/schema";
import { mutateEntry } from "@/lib/editorial/store";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try {
    await requireEditor(request.headers);
    const { id } = await context.params;
    const entry = await getPrisma().editorialEntry.findUnique({
      where: { id },
      include: { revisions: { orderBy: { version: "desc" }, take: 30 } },
    });
    if (!entry) throw new StudioError("Article not found.", 404);
    return Response.json({ entry }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioFailure(error);
  }
}
export async function PATCH(request: Request, context: Context) {
  try {
    await requireEditor(request.headers);
    requireSameOrigin(request);
    const { id } = await context.params;
    const input = z
      .object({
        version: z.number().int().positive(),
        action: z.enum(["save", "publish", "unpublish", "delete"]),
        draft: contentSchema,
      })
      .safeParse(await boundedJson(request, 450000));
    if (!input.success)
      throw new StudioError(
        input.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" "),
      );
    const entry = await mutateEntry(id, input.data.version, input.data.action, input.data.draft);
    return Response.json({ entry }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioFailure(error);
  }
}
