import Link from "next/link";
export default function StudioSetup() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Private publishing workspace
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Set up your editorial studio</h1>
      <p className="mt-5 text-muted-foreground">
        The studio needs a PostgreSQL database and private authentication settings. Public pages
        remain available while these are being configured.
      </p>
      <ol className="mt-8 list-decimal space-y-4 pl-5 leading-relaxed">
        <li>
          Set DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET and SITE_URL in your local
          environment.
        </li>
        <li>
          Run <code>npm run db:deploy</code> against your intended database.
        </li>
        <li>
          Run <code>npm run studio:admin</code> with STUDIO_ADMIN_EMAIL and STUDIO_ADMIN_PASSWORD
          set privately.
        </li>
        <li>
          Optionally run <code>npm run studio:import</code> to import the existing catalogue as
          drafts for review.
        </li>
        <li>Restart the application and sign in here.</li>
      </ol>
      <p className="mt-8 text-sm text-muted-foreground">
        See the README and development-plans/editorial-studio.md for complete setup, account
        recovery and publishing instructions.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary">
        Return to website
      </Link>
    </main>
  );
}
