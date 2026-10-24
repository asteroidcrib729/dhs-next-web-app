import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { requireEditor } from "@/lib/editorial/access";
import { getPrisma } from "@/lib/prisma";
import StudioEditor from "@/components/editorial/StudioEditor";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    await requireEditor(await headers());
  } catch {
    redirect("/studio/login");
  }
  const { id } = await params;
  const entry = await getPrisma().editorialEntry.findUnique({
    where: { id },
    include: { revisions: { orderBy: { version: "desc" }, take: 30 } },
  });
  if (!entry) notFound();
  return <StudioEditor key={entry.id} initial={JSON.parse(JSON.stringify(entry))} />;
}
