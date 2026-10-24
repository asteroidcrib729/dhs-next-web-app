import { getStudioAuth, studioConfigured } from "@/lib/auth";

export class StudioError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export async function requireEditor(headers: Headers) {
  if (!studioConfigured())
    throw new StudioError("The editorial studio is not configured yet.", 503);
  const session = await getStudioAuth().api.getSession({ headers });
  if (!session?.user.editor) throw new StudioError("Sign in with an editor account.", 401);
  return session;
}
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(process.env.BETTER_AUTH_URL!).origin)
    throw new StudioError("Request origin is not allowed.", 403);
}
export async function boundedJson(request: Request, max = 120000) {
  const bytes = await boundedBytes(request, max);
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new StudioError("Send valid JSON.");
  }
}
export async function boundedBytes(request: Request, max: number) {
  if (Number(request.headers.get("content-length") ?? 0) > max)
    throw new StudioError("Request is too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new StudioError("Request body is missing.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > max) {
      await reader.cancel();
      throw new StudioError("Request is too large.", 413);
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
export function studioFailure(error: unknown) {
  if (error instanceof StudioError)
    return Response.json(
      { error: error.message },
      { status: error.status, headers: { "Cache-Control": "no-store" } },
    );
  if (error && typeof error === "object" && "code" in error && error.code === "P2002")
    return Response.json(
      { error: "That published URL already exists. Choose another slug." },
      { status: 409 },
    );
  console.error("Editorial request failed", error instanceof Error ? error.name : "Unknown error");
  return Response.json(
    {
      error:
        "The studio could not complete this request. Check the database connection and try again.",
    },
    { status: 503 },
  );
}
