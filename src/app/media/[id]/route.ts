import { getPrisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/editorial/access";
export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return new Response(null, { status: 404 });
  const { id } = await params;
  const path = `/media/${id}`;
  const published = await getPrisma().editorialEntry.count({
    where: { publishedSlug: { not: null }, published: { path: ["coverImage"], equals: path } },
  });
  if (!published) {
    try {
      await requireEditor(request.headers);
    } catch {
      return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
    }
  }
  const media = await getPrisma().editorialMedia.findUnique({ where: { id } });
  if (!media) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
