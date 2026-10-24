import assert from "node:assert/strict";
import { test } from "node:test";
import { studioOrigin } from "../src/lib/studio-origin";

test("production and local authentication use their exact configured origins", () => {
  assert.equal(
    studioOrigin({ BETTER_AUTH_URL: "https://digitalhorizonsystems.vercel.app" }),
    "https://digitalhorizonsystems.vercel.app",
  );
  assert.equal(studioOrigin({ BETTER_AUTH_URL: "http://localhost:3000" }), "http://localhost:3000");
  assert.equal(
    studioOrigin({
      VERCEL: "1",
      VERCEL_ENV: "production",
      VERCEL_URL: "other.vercel.app",
      BETTER_AUTH_URL: "https://digitalhorizonsystems.vercel.app",
    }),
    "https://digitalhorizonsystems.vercel.app",
  );
});
test("preview origins require a valid trusted Vercel deployment hostname", () => {
  const env = {
    VERCEL: "1",
    VERCEL_ENV: "preview",
    BETTER_AUTH_URL: "https://digitalhorizonsystems.vercel.app",
  };
  assert.equal(
    studioOrigin({ ...env, VERCEL_URL: "digitalhorizonsystems-ab12-owner.vercel.app" }),
    "https://digitalhorizonsystems-ab12-owner.vercel.app",
  );
  for (const hostname of [
    "",
    "https://demo.vercel.app",
    "demo.vercel.app/extra",
    "demo.vercel.app.evil.invalid",
    "demo@evil.invalid",
    "evil.invalid",
    "demo.vercel.app:443",
  ])
    assert.equal(studioOrigin({ ...env, VERCEL_URL: hostname }), undefined);
});
test("authentication rejects malformed, credential-bearing and nonlocal HTTP origins", () => {
  for (const origin of [
    "",
    "invalid",
    "http://example.com",
    "https://user:pass@example.com",
    "https://example.com/path",
    "https://example.com?x=1",
    "https://example.com#fragment",
  ])
    assert.equal(studioOrigin({ BETTER_AUTH_URL: origin }), undefined);
});
