import assert from "node:assert/strict";
import { test } from "node:test";
import { sendContactNotification } from "../src/lib/contact-notification";

const inquiry = {
  id: 42,
  firstName: "Visitor",
  lastName: "Example",
  email: "visitor@example.com",
  company: '<a href="https://untrusted.example">Injected & company</a>',
  service: "web-development",
  budget: "PKR 10,000",
  message: '<script>alert("message")</script>\nSecond line',
};
const environment = {
  RESEND_API_KEY: "test-only-not-a-real-key",
  CONTACT_EMAIL_FROM: "Notifications <notify@example.com>",
  CONTACT_EMAIL_TO: "owner@example.com",
};

test("incomplete notification configuration never invokes the provider", async () => {
  for (const missing of Object.keys(environment)) {
    const result = await sendContactNotification(
      inquiry,
      { ...environment, [missing]: " " },
      async () => {
        assert.fail("Email provider must not be called without complete configuration");
      },
    );
    assert.equal(result, "skipped");
  }
});

test("notification escapes all submitted HTML and includes a complete plain-text alternative", async () => {
  const result = await sendContactNotification(inquiry, environment, async (payload, options) => {
    assert.equal(payload.from, environment.CONTACT_EMAIL_FROM);
    assert.equal(payload.to, environment.CONTACT_EMAIL_TO);
    assert.ok(payload.html?.includes("&lt;script&gt;"));
    assert.ok(
      payload.html?.includes(
        "&lt;a href=&quot;https://untrusted.example&quot;&gt;Injected &amp; company&lt;/a&gt;",
      ),
    );
    assert.ok(!payload.html?.includes("<script>"));
    assert.ok(!payload.html?.includes('<a href="https://untrusted.example">'));
    assert.ok(payload.html?.includes("<br>Second line"));
    assert.ok(payload.text?.includes(inquiry.message));
    assert.ok(payload.text?.includes(inquiry.budget));
    assert.ok(payload.text?.includes(inquiry.email));
    assert.equal(options.idempotencyKey, "dhs/preview/contact-inquiry/42");
    return { data: { id: "mock-accepted" }, error: null };
  });
  assert.equal(result, "accepted");
});

test("API errors, empty provider results and thrown transport failures are not reported as accepted", async () => {
  for (const response of [
    { data: null, error: { name: "validation_error", message: "Rejected" } },
    { data: null, error: null },
  ])
    assert.equal(
      await sendContactNotification(inquiry, environment, async () => response),
      "failed",
    );
  assert.equal(
    await sendContactNotification(inquiry, environment, async () => {
      throw new Error("Sensitive transport details must not escape");
    }),
    "failed",
  );
});

test("idempotency keys remain stable per inquiry and separate production from preview", async () => {
  const keys: (string | undefined)[] = [];
  for (const VERCEL_ENV of ["production", "production", "preview", "development", undefined])
    await sendContactNotification(
      inquiry,
      { ...environment, VERCEL_ENV },
      async (_payload, options) => {
        keys.push(options.idempotencyKey);
        return { data: { id: "mock-accepted" }, error: null };
      },
    );
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[0], keys[2]);
  assert.equal(keys[2], keys[3]);
  assert.equal(keys[3], keys[4]);
});
