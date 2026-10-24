"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function StudioLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Editorial Studio
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Welcome back</h1>
      <p className="mt-4 text-muted-foreground">
        Sign in to manage articles, case studies and search previews.
      </p>
      <form
        className="studio-form mt-8 space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setPending(true);
          const data = new FormData(event.currentTarget);
          try {
            const response = await fetch("/api/auth/sign-in/email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.get("email"),
                password: data.get("password"),
                rememberMe: false,
              }),
            });
            if (!response.ok)
              throw Error(
                response.status === 429
                  ? "Too many attempts. Wait a minute and try again."
                  : "Unable to sign in. Check your credentials and try again.",
              );
            router.replace("/studio");
            router.refresh();
          } catch (e) {
            setError(e instanceof Error ? e.message : "Sign-in failed.");
          } finally {
            setPending(false);
          }
        }}
      >
        <label>
          Email
          <input name="email" type="email" autoComplete="username" required maxLength={254} />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={128}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-800">
            {error}
          </p>
        )}
        <button className="studio-button w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-sm text-muted-foreground">
          Accounts are provisioned privately. Contact the site operator if you need access or a
          password reset.
        </p>
      </form>
    </main>
  );
}
