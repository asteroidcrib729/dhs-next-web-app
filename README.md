# Tech Venture Solutions

I built this marketing website with Next.js, React, Tailwind CSS, and Chakra UI. The contact API stores inquiries in PostgreSQL through Prisma and can send notifications through Resend.

## Local development

I use Node.js 24 LTS (24.21.0 is recorded in `.nvmrc`) and npm 11. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

```powershell
npm.cmd ci
npm.cmd run setup
npm.cmd run dev
```

Open http://localhost:3000. Installation generates the Prisma client; setup creates `.env` from `.env.example` if it does not exist. It preserves existing local settings. The marketing pages work without database or email credentials.

To enable contact storage, create a local PostgreSQL database and user, set `DATABASE_URL` in `.env`, and apply the PostgreSQL baseline migration to a fresh database:

```powershell
npm.cmd run db:deploy
```

I do not run migrations automatically during installation. Database creation and credentials belong to the local database operator. Use `npm run db:migrate` when deliberately changing the schema. Optional email notifications require a Resend API key, a verified sender, and the intended recipient.

## Environment variables

`.env` and other local environment files are ignored by Git; `.env.example` is committed with empty credentials. Next.js loads `.env` automatically. Prisma CLI commands explicitly load it through `dotenv` in `prisma.config.ts`. Local override files follow Next.js precedence, but the Prisma CLI reads `.env` only; keep database configuration in `.env` or the launching shell.

| Variable             | Used by                                 | Purpose                                                                                                                         |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | `prisma.config.ts`, `src/lib/prisma.ts` | PostgreSQL URL; required for database commands and contact persistence. URL-encode credentials.                                 |
| `RESEND_API_KEY`     | `src/app/api/contact/route.ts`          | Optional server-side email key. Empty means no notification is sent.                                                            |
| `CONTACT_EMAIL_FROM` | Contact API                             | Sender; must be verified with Resend for production.                                                                            |
| `CONTACT_EMAIL_TO`   | Contact API                             | Notification recipient.                                                                                                         |
| `DEBUG_ERRORS`       | Contact API                             | Enables database error codes in error responses; keep `false` in production.                                                    |
| `NODE_ENV`           | Next.js, custom production server       | Managed by `dev`, `build`, and `start`; do not set it in `.env`.                                                                |
| `PORT`               | Next.js CLI, `server.mjs`               | Optional listen port, default 3000. For development, `npm run dev -- --port 3001` is explicit.                                  |
| `NODE_OPTIONS`       | Node.js itself                          | Optional runtime options set before starting Node; the old assignment inside `server.mjs` was ineffective and has been removed. |

I found no `NEXT_PUBLIC_*` or `import.meta.env` reads. Database and email values stay on the server. With an empty database URL, valid contact submissions receive HTTP 503; invalid submissions receive HTTP 400. A missing email key does not prevent a configured database from saving an inquiry. A database health check returns a generic 503 when unavailable.

## Checks and production build

```powershell
npm.cmd run format
npm.cmd run check
npm.cmd run build
npm.cmd start
```

`next/font/google` downloads Nunito during the first build, so that build needs access to Google Fonts. `npm start` is the normal production entry point; `server.mjs` remains available for hosts requiring a custom HTTP server.

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

`npm run check` runs formatting checks, ESLint, TypeScript, Prisma schema validation, and asset verification. GitHub Actions repeats code quality and builds on Linux and Windows, applies PostgreSQL migrations to an isolated PostgreSQL 18 service, checks schema drift and CRUD, audits dependencies, scans secrets with Gitleaks, and analyzes TypeScript/JavaScript and Actions with CodeQL. Dependabot checks npm packages and Actions weekly. See [CI and PostgreSQL plan](development-plans/development-plan-01.md).

I monitor hosted results in [Code quality](https://github.com/asteroidcrib729/tvs-next-web-app/actions/workflows/code-quality.yml), [Security](https://github.com/asteroidcrib729/tvs-next-web-app/actions/workflows/security.yml), and [CodeQL](https://github.com/asteroidcrib729/tvs-next-web-app/actions/workflows/codeql.yml). The [verification report](development-plans/verification.md#hosted-github-actions-verification) records the successful first hosted runs.

The current React ESLint plugins declare support through ESLint 9. ESLint is pinned to 9.39.5 for peer-consistent clean installs; that major is end-of-support upstream. Review the plugins and upgrade ESLint together when they declare ESLint 10 support. No dependency-peer override or legacy-peer-deps setting is used.

The PostgreSQL migration replaces the old MySQL migration history. It initializes a fresh database; it does not transfer existing MySQL data. If an external database already contains business data, plan an export, transformation, and import separately. Database hosting and Vercel deployment remain later work.

For an isolated test database only, set `DATABASE_TEST_ALLOW_WRITE=true`, then run `npm run db:deploy`, `npm run db:drift`, and `npm run db:check`. The CRUD check inserts, reads, updates, and deletes a temporary inquiry inside one transaction; it must never target a production database. This flag is read only by the verification script and is not an application setting.
