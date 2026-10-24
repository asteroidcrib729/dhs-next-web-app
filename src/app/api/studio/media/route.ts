import sharp from "sharp";
import { createHash } from "node:crypto";
import { getPrisma } from "@/lib/prisma";
import {
  boundedBytes,
  requireEditor,
  requireSameOrigin,
  StudioError,
  studioFailure,
  boundedJson,
} from "@/lib/editorial/access";
import { libraryImages } from "@/lib/editorial/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireEditor(request.headers);
    const media = await getPrisma().editorialMedia.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, alt: true, filename: true, width: true, height: true },
    });
    return Response.json(
      {
        images: [
          ...media.map((m) => ({ url: `/media/${m.id}`, alt: m.alt, label: m.filename })),
          ...libraryImages.map((url) => ({ url, alt: "", label: url.split("/").pop()! })),
        ],
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
    let alt = "";
    try {
      alt = decodeURIComponent(request.headers.get("x-image-alt") ?? "").trim();
    } catch {
      throw new StudioError("Invalid alternative text.");
    }
    if (!alt || alt.length > 250)
      throw new StudioError("Add descriptive alternative text (1 to 250 characters).");
    const original = await boundedBytes(request, 4 * 1024 * 1024);
    let data: Buffer;
    let width: number;
    let height: number;
    try {
      const image = sharp(original, { limitInputPixels: 24000000, animated: false });
      const meta = await image.metadata();
      if (!["jpeg", "png", "webp", "avif"].includes(meta.format ?? "") || (meta.pages ?? 1) > 1)
        throw Error("format");
      const oriented = await image.rotate().toBuffer({ resolveWithObject: true });
      if (oriented.info.width <= oriented.info.height) throw Error("landscape");
      const output = await sharp(oriented.data)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toBuffer({ resolveWithObject: true });
      data = output.data;
      width = output.info.width;
      height = output.info.height;
    } catch {
      throw new StudioError(
        "Upload a valid landscape JPEG, PNG, WebP or AVIF under 4 MiB and 24 megapixels.",
      );
    }
    const sha256 = createHash("sha256").update(data).digest("hex");
    const media = await getPrisma().editorialMedia.upsert({
      where: { sha256 },
      create: {
        filename: `photo-${sha256.slice(0, 12)}.webp`,
        alt,
        width,
        height,
        data: new Uint8Array(data),
        sha256,
      },
      update: {},
      select: { id: true, alt: true },
    });
    return Response.json({ url: `/media/${media.id}`, alt: media.alt }, { status: 201 });
  } catch (error) {
    return studioFailure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    await requireEditor(request.headers);
    requireSameOrigin(request);
    const input = await boundedJson(request, 500);
    if (typeof input?.id !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(input.id))
      throw new StudioError("Choose an uploaded image.");
    const path = `/media/${input.id}`;
    const db = getPrisma();
    await db.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${path}, 0))`;
      const [entries, revisions] = await Promise.all([
        tx.editorialEntry.count({
          where: {
            OR: [
              { draft: { path: ["coverImage"], equals: path } },
              { published: { path: ["coverImage"], equals: path } },
            ],
          },
        }),
        tx.editorialRevision.count({ where: { snapshot: { path: ["coverImage"], equals: path } } }),
      ]);
      if (entries || revisions)
        throw new StudioError(
          "This image is used by an article or saved revision. Keep it to preserve that content.",
          409,
        );
      await tx.editorialMedia.deleteMany({ where: { id: input.id } });
    });
    return Response.json({ deleted: true });
  } catch (error) {
    return studioFailure(error);
  }
}
