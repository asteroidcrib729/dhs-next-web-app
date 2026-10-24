type Environment = Readonly<Record<string, string | undefined>>;

// Only trusted server configuration selects the auth origin; never use request headers.
export function studioOrigin(env: Environment = process.env): string | undefined {
  if (env.VERCEL === "1" && env.VERCEL_ENV === "preview") {
    const hostname = env.VERCEL_URL ?? "";
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.vercel\.app$/i.test(hostname)) return undefined;
    return "https://" + hostname;
  }
  try {
    const url = new URL(env.BETTER_AUTH_URL ?? "");
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/")
      return undefined;
    if (
      url.protocol !== "https:" &&
      !(url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
