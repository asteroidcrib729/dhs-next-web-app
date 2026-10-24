import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getStudioAuth, studioConfigured } from "@/lib/auth";
import StudioLogin from "@/components/editorial/StudioLogin";
import StudioSetup from "@/components/editorial/StudioSetup";
export default async function Page() {
  if (!studioConfigured()) return <StudioSetup />;
  const session = await getStudioAuth().api.getSession({ headers: await headers() });
  if (session?.user.editor) redirect("/studio");
  return <StudioLogin />;
}
