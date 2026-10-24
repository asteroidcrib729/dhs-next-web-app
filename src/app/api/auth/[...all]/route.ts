import { getStudioAuth, studioConfigured } from "@/lib/auth";
export const dynamic = "force-dynamic";
async function handle(request: Request) {
  if (!studioConfigured())
    return Response.json({ error: "Editorial authentication is not configured." }, { status: 503 });
  return getStudioAuth().handler(request);
}
export { handle as GET, handle as POST };
