# Digital Horizon Systems

I built this marketing website with Next.js, React, Tailwind CSS, and Chakra UI. The contact API stores inquiries in PostgreSQL through Prisma and can send notifications through Resend. I manage blog articles and case studies through a private editorial studio, with draft previews, revisions, publishing and on-page SEO controls.

## Local development

I use Node.js 24 LTS (24.21.0 is recorded in `.nvmrc`) and npm 11. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

```powershell
npm.cmd ci
npm.cmd run setup
npm.cmd run dev
```

Open http://localhost:3000. Installation generates the Prisma client; setup creates `.env` from `.env.example` if it does not exist. It preserves existing local settings. The marketing pages work without database or email credentials.

To enable contact storage, create a local PostgreSQL database and user, set `DATABASE_URL` in `.env`, and apply the PostgreSQL migrations:

```powershell
npm.cmd run db:deploy
```

I do not run migrations automatically during installation. Database creation and credentials belong to the local database operator. Use `npm run db:migrate` when deliberately changing the schema. Optional email notifications require a sending-only Resend API key, an allowed sender and the intended recipient. I configured the owner-selected onboarding@resend.dev sender; Resend restricts this sender to its account email. See [notification setup](development-plans/deployment.md#contact-email-notifications).

## Editorial studio

I open `/studio` to create and manage blogs and case studies. It needs PostgreSQL, `BETTER_AUTH_URL` (the exact site origin), a private random `BETTER_AUTH_SECRET` of at least 32 characters, and `SITE_URL` for canonical/share URLs and the sitemap. I apply `npm run db:deploy`, provision an account with `npm run studio:admin` using private `STUDIO_ADMIN_EMAIL` and `STUDIO_ADMIN_PASSWORD` settings, then clear those bootstrap values and restart the app. Public registration is disabled. Passwords must have 14 to 128 characters.

I can run `npm run studio:import` to import 31 blog entries (25 retained summaries and six original articles) and six case studies as drafts. I review the original articles, expand retained summaries and verify case-study claims before publishing. Once I configure a database, the public catalogue shows only published database entries; imported drafts stay private. Without a database, the bundled catalogue remains available. Retired Digital Marketing, Content Marketing, PPC and Social Media posts are removed; the new categories are Web Development and Desktop Solutions.

Saving a draft preserves the live article. Publishing updates its content, metadata, structured data and sitemap; changing a published slug preserves the former URL through a redirect. I can preview saved drafts privately, restore revisions, unpublish and delete drafts. Landscape cover uploads are optimized to WebP and stored in PostgreSQL, so they persist independently of Git and serverless filesystems. For daily use: create or open an entry, edit its content and SEO fields, save the draft, preview it, then publish when reviewed. Public articles show Created at and Updated at once near the cover, with a calculated reading estimate. I preserve creation dates and advance the published-version date only when publishing changed content, images, tags, URLs or SEO settings. Draft saves, unchanged republishes and featured-only changes do not advance it. Withdrawing and republishing unchanged content preserves the timeline. See the [date rules and CI credential decision](development-plans/publication-dates-and-ci.md). See the [complete studio guide](development-plans/editorial-studio.md) for setup, publishing, media, account recovery and verification.

## Analytics and visitor choice

I integrated Vercel Web Analytics with measurement enabled by default. Visitors can disable future measurement for their browser on the Cookie Policy at `/cookie-policy#analytics-choice`; Privacy and Terms link to that control. The preference persists in local storage and synchronizes across tabs. Query strings, fragments, private studio/preview routes and API paths are excluded. Inquiry fields and editor identities are not analytics events.

Development uses the SDK’s debug behavior. Hosted collection still requires enabling Web Analytics in the intended Vercel project dashboard and deploying the code. No deployment or Vercel account settings have been changed. See [analytics details](development-plans/editorial-studio.md#analytics-and-privacy-choice).

## Environment variables

`.env` and other local environment files are ignored by Git; `.env.example` is committed with empty credentials. Next.js loads `.env` automatically. Prisma CLI commands explicitly load it through `dotenv` in `prisma.config.ts`. Local override files follow Next.js precedence, but the Prisma CLI reads `.env` only; keep database configuration in `.env` or the launching shell.

| Variable             | Used by                                 | Purpose                                                                                                                         |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | `prisma.config.ts`, `src/lib/prisma.ts` | PostgreSQL URL; required for database commands, contact persistence and the editorial studio. URL-encode credentials.           |
| `RESEND_API_KEY`     | `src/lib/contact-notification.ts`       | Optional server-side email key. Empty means no notification is sent.                                                            |
| `CONTACT_EMAIL_FROM` | Contact API                             | Verified sender, or onboarding@resend.dev restricted to the Resend account email.                                               |
| `CONTACT_EMAIL_TO`   | Contact API                             | Notification recipient.                                                                                                         |
| `DEBUG_ERRORS`       | Contact API                             | Enables database error codes in error responses; keep `false` in production.                                                    |
| `NODE_ENV`           | Next.js, custom production server       | Managed by `dev`, `build`, and `start`; do not set it in `.env`.                                                                |
| `PORT`               | Next.js CLI, `server.mjs`               | Optional listen port, default 3000. For development, `npm run dev -- --port 3001` is explicit.                                  |
| `NODE_OPTIONS`       | Node.js itself                          | Optional runtime options set before starting Node; the old assignment inside `server.mjs` was ineffective and has been removed. |

I found no `NEXT_PUBLIC_*` or `import.meta.env` reads. Database and email values stay on the server. With an empty database URL, valid contact submissions receive HTTP 503; invalid submissions receive HTTP 400. Notifications require all three email settings; there are no hardcoded sender/recipient fallbacks. Missing email configuration does not prevent a configured database from saving an inquiry. Notifications escape submitted HTML, include plain text and handle provider rejection without exposing submission contents in logs. Email failure does not undo a stored inquiry. There is no automatic retry queue. A database health check returns a generic 503 when unavailable.

### Public contact details and outbound links

I accept an optional project budget as a numeric amount in PKR or USD. The contact form adds thousands separators while typing and supports up to two decimal places without currency conversion. It submits `budgetAmount` and `budgetCurrency`; the API validates them and stores a currency-qualified value such as `PKR 10,000` or `USD 1,500.50` in the existing optional budget text field. Existing inquiry records need no migration.

I configure public contact details and website destinations in the `SITE_*` entries in [.env.example](.env.example). Local `.env` has the same settings. These values are deliberately public; database credentials and email provider settings are excluded from the client configuration.

| Settings                                                  | Behavior                                                                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `SITE_PHONE`                                              | Display phone number; spaces and punctuation are normalized for the telephone link.                                  |
| `SITE_WHATSAPP_NUMBER`                                    | International number with country code; creates the WhatsApp link independently of the phone number.                 |
| `SITE_PUBLIC_EMAIL`                                       | Public email address and mail link; independent of private notification recipients.                                  |
| `SITE_CONSULTATION_URL`                                   | Local route or HTTP(S) booking destination; defaults to `/contact`.                                                  |
| `SITE_SOCIAL_*_URL`                                       | Facebook, Instagram, LinkedIn profile destinations in the footer. Blank values open the official platform homepages. |
| `SITE_PARTNER_*`, `SITE_PROJECT_*`                        | Technology partner and portfolio website destinations.                                                               |
| `SITE_ADDRESS`, `SITE_OFFICE_HOURS`, `SITE_MAP_EMBED_URL` | Settings for preserved contact cards/map if I re-enable their imports later.                                         |

I left outdated phone, WhatsApp and public email values empty until current details are available. Empty contact settings hide their links. Social items are always clickable: configured profile URLs take priority, and empty or invalid social settings fall back to the official platform homepages. Empty partner/project destinations render readable content without a dead link. Old-brand social defaults were cleared; partner and portfolio URLs remain in the template for review. URL settings reject unsupported schemes and embedded credentials.

**Restart development after editing settings. Rebuild production to update public values**, because marketing pages are statically generated. Next.js environment precedence still applies. I never put secrets in `SITE_*` settings.

## Visual design and motion

I use [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) for large headings and [Inter](https://fonts.google.com/specimen/Inter) for body copy, controls and smaller headings. Next.js self-hosts the fonts. The shared theme uses warm neutral surfaces, dark green text and teal accents across page heroes, forms, cards and navigation.

The partner slider animates a single transform, pauses outside the viewport and in background tabs, and offers pause and full-grid controls. Reduced-motion preferences replace it with a static grid and disable video hover autoplay and decorative entry motion. The homepage hero uses a static sage grid with eight small animated signal marks distributed from top to bottom. Only the 20 by 3 px marks animate, avoiding the earlier oversized moving gradient layers. Motion pauses while the page scrolls, offscreen, in hidden tabs and through its pause control; reduced motion uses a static background. Practical Insights displays up to three published articles, prioritizing featured articles and filling available spaces with the most recent other articles. It never invents entries when fewer than three have been published. The earlier canvas effect remains unmounted. The current brand, header, hero and dark footer use a shared horizon motif. The header scrolls naturally with the page. The compact header groups seven desktop links and uses a labelled, keyboard-accessible mobile menu; current-page styling spans the full label. All active partner logos use fixed containers with aspect-preserving image fitting.

Development & Marketing Solutions contains Web Development, E-Commerce & Email Marketing, and Custom Desktop Applications. SEO is part of the web offering and is available on demand, with scope and pricing discussed for each project. Service cards publish no starting prices or pricing placeholders. IT services cover cloud, cybersecurity and networking. Server/hardware sales, configuration and procurement are no longer offered; related vendor promotions and contact choices were removed. The team component and contact information, quick actions and map components remain in source but are excluded from page imports. Newsletter UI, request handling and storage are removed. On an existing PostgreSQL installation, run `npm run db:deploy` again to apply the forward migration: it drops the newsletter preference column and preserves the other inquiry fields. Fresh databases apply all three migrations, including the editorial studio tables.

Case studies use relevant local landscape stock photos with [current source credits and encoding settings](development-plans/service-content-refresh.md). These are illustrative industry images. The footer contains Services, Company, Helpful Links and Social Media, with legal links along the bottom, an inverse logo separated from the tighter desktop link columns, and the logo above Services on mobile. Portfolio previews use native video and preserve reduced-motion support.

### Policy dates

I configure each legal page independently with `SITE_TERMS_EFFECTIVE_DATE` / `SITE_TERMS_LAST_REVIEWED_DATE`, `SITE_PRIVACY_EFFECTIVE_DATE` / `SITE_PRIVACY_LAST_REVIEWED_DATE`, and `SITE_COOKIES_EFFECTIVE_DATE` / `SITE_COOKIES_LAST_REVIEWED_DATE`. Values use ISO `YYYY-MM-DD`. Invalid/missing values use October 23, 2026; formatting is timezone independent. Restart dev / rebuild production after changes. The header consultation link permanently opens `/contact`; `SITE_CONSULTATION_URL` applies to other consultation actions.

### Brand assets

My Digital Horizon Systems logo set lives in [public/branding](public/branding). It includes main and inverse wordmarks plus the symbol in SVG, PNG and JPG. SVG/PNG files are transparent; JPG files use a solid matte because JPEG has no alpha channel. Header/footer SVGs contain outlined lettering. Favicon and touch/application icons use the same mark. Run `npm run assets:brand` after editing the SVG masters to regenerate exports and hashes.

I removed visible personal identities, replaced named testimonials with working principles and retain organization attribution in article search metadata. About and mismatched blog imagery now use relevant landscape stock photos. See the [rebrand record and image credits](development-plans/digital-horizon-rebrand.md) for assets, layout fixes, legal-content decisions and validation.

## Checks and production build

```powershell
npm.cmd run format
npm.cmd run check
npm.cmd run build
npm.cmd start
```

`next/font/google` downloads Inter and Space Grotesk during the first build, so that build needs access to Google Fonts. `npm start` is the normal production entry point; `server.mjs` remains available for hosts requiring a custom HTTP server.

## Dependencies

I pin direct dependencies and commit `package-lock.json` for reproducible `npm ci` installs. This upgrade uses Next.js 16.4.2, React 19.3.1, Prisma 7.10.1, and Tailwind CSS 4.3.3, resolved from the npm registry on October 22, 2026.

TypeScript is pinned to **6.0.3**, the newest stable release supported by the current ESLint TypeScript parser (`>=4.8.4 <6.1.0`); TypeScript 7.0.2 is outside that range. Node typings use the latest Node 24 release rather than Node 26 types. Prisma uses matching stable client, CLI, and PostgreSQL adapter versions; the CLI's `latest` tag pointed to an 8.0 release candidate during this upgrade.

I removed unused Headless UI, bundle analyzer, Upstash, cross-env, react-bits, Nodemailer, and legacy ESLint compatibility packages. Animation imports now use `motion/react` instead of installing a separate `framer-motion` entry.

The major-version migrations follow the [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) and [Prisma 7 upgrade guide](https://docs.prisma.io/docs/guides/upgrade-prisma-orm/v7). Prisma uses the generated client in `src/generated/prisma` and the PostgreSQL driver adapter.

## Assets

See [asset organization and maintenance](development-plans/assets.md) for layout, optimization settings, external source archives, size budgets, and Git history considerations. `npm run assets:check` verifies every manifest hash, source URL, and storage budget without requiring FFmpeg or original media.

See [local verification results](development-plans/verification.md) for browser checks, the remaining development-tool advisory, and database/email configuration boundaries.

## Formatting and CI

Both formatting commands start at the repository root (`.`), so they traverse the entire project wherever their formatters apply, including nested source files, scripts, GitHub workflow YAML, JSON configuration, Markdown, and CSS.

| Command                | Behavior                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run format`       | Runs `prettier --write .`, then `prisma format`; writes formatting changes.                                                                    |
| `npm run format:check` | Runs `prettier --check .`, then verifies Prisma formatting on a temporary copy; leaves source files unchanged and fails if formatting differs. |

Prettier covers its supported file types; Prisma's formatter covers `prisma/schema.prisma`. Generated clients, build output, dependencies, local data/secrets, npm-generated lockfile formatting, and public media are intentionally excluded through `.prettierignore` and Git ignore rules. Public asset hashes are checked separately; migration SQL is generated by Prisma. CI runs the read-only format check as part of `npm run check`; it does not rewrite files or create formatting commits automatically.

`npm run check` runs formatting checks, ESLint, public-configuration/editorial/privacy tests, TypeScript, Prisma schema validation, and asset verification. GitHub Actions repeats code quality and builds on Linux and Windows, generates fresh masked database/authentication keys per PostgreSQL job, applies migrations to a disposable PostgreSQL 18 container bound to loopback, checks schema drift, contact CRUD and editorial publication, audits dependencies, scans secrets with Gitleaks, and analyzes TypeScript/JavaScript and Actions with CodeQL. Dependabot checks npm packages and Actions weekly. See [CI and PostgreSQL plan](development-plans/development-plan-01.md).

I monitor hosted results in [Code quality](https://github.com/asteroidcrib729/dhs-next-web-app/actions/workflows/code-quality.yml), [Security](https://github.com/asteroidcrib729/dhs-next-web-app/actions/workflows/security.yml), and [CodeQL](https://github.com/asteroidcrib729/dhs-next-web-app/actions/workflows/codeql.yml). The [verification report](development-plans/verification.md#hosted-github-actions-verification) records the successful first hosted runs.

The current React ESLint plugins declare support through ESLint 9. ESLint is pinned to 9.39.5 for peer-consistent clean installs; that major is end-of-support upstream. Review the plugins and upgrade ESLint together when they declare ESLint 10 support. No dependency-peer override or legacy-peer-deps setting is used.

The PostgreSQL migration replaces the old MySQL migration history. It initializes a fresh database; it does not transfer existing MySQL data. If an external database already contains business data, plan an export, transformation, and import separately. Vercel deployment uses the Singapore region and separate Prisma Postgres production/preview databases. Local development uses preview only. See [deployment operations](development-plans/deployment.md).

For an isolated test database only, set `DATABASE_TEST_ALLOW_WRITE=true`, then run `npm run db:deploy`, `npm run db:drift`, and `npm run db:check`. The CRUD check inserts, reads, updates, and deletes a temporary inquiry inside one transaction; it must never target a production database. This flag is read only by the verification script and is not an application setting.

## Hosted environments

I deploy the site at https://digitalhorizonsystems.vercel.app. Vercel runs the existing forward migrations before building. Production has its own database and auth secret; preview and local development share a separate database. Application traffic uses pooled TLS connections, and migrations use `DIRECT_DATABASE_URL` when configured. Preview authentication uses the trusted generated deployment hostname, while production uses its exact configured origin.

The normal `npm run studio:import` command still imports private drafts. The explicit `npm run studio:import -- --publish-current` option is only for moving the existing bundled public catalogue into a new database, preserving its dates and noindex decisions. It never changes existing database entries. I used it once per new cloud database. Future editorial changes go through the Studio save/publish workflow. See [deployment operations](development-plans/deployment.md) for environment boundaries and account setup.

I leave the local development server stopped until I need it and start it manually with `npm run dev`. The ignored `.local/deployment/studio-credentials.json` contains actual temporary login passwords, not hashes; Better Auth stores password hashes in PostgreSQL. Production and preview credentials are separate. See [editorial account operations](development-plans/deployment.md#editorial-accounts).
