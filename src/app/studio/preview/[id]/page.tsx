import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireEditor } from "@/lib/editorial/access";
import { getPrisma } from "@/lib/prisma";
import { contentSchema } from "@/lib/editorial/schema";
import Article from "@/components/editorial/Article";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    await requireEditor(await headers());
  } catch {
    redirect("/studio/login");
  }
  const { id } = await params;
  const entry = await getPrisma().editorialEntry.findUnique({ where: { id } });
  if (!entry) notFound();
  return (
    <main>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link className="text-primary" href={`/studio/edit/${id}`}>
          Return to editor
        </Link>
      </div>
      <Article
        preview
        entry={{
          id,
          kind: entry.kind,
          content: contentSchema.parse(entry.draft),
          createdAt: entry.createdAt.toISOString(),
          publishedAt: entry.createdAt.toISOString(),
          updatedAt: entry.updatedAt.toISOString(),
        }}
      />
    </main>
  );
}
