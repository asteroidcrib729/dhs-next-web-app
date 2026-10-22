# Project memory and working instructions

Last updated: October 22, 2026 (Asia/Karachi).

## Required working practices

- Read this file before changing the project. It is the ongoing project memory requested by the owner.
- Update this file after each meaningful task with the final decisions, changed paths, verification performed, limitations, and next authorized work. Preserve the Next.js-managed block below. Keep previous decisions accurate when replacing them; label historical facts clearly.
- All maintained source/configuration must be formatted. Run `npm run format` before finishing and `npm run check` plus relevant checks before reporting success. Format Markdown and workflow changes too. Do not hand-edit generated Prisma files, npm lockfiles, or encoded media.
- Use Node.js 24.21.0 (`.nvmrc`) and npm 11.19.1. On Windows, use `npm.cmd` when PowerShell blocks `npm.ps1`.
- Keep `.env`, credentials, tokens, local tools, and verification data out of Git. Never put secret values or contact submissions in this file or development plans. Never prefix secrets with `NEXT_PUBLIC_`.
- Preserve existing local settings. `npm run setup` creates `.env` only if absent. Page builds must work without database/email credentials. Do not run migrations against an external database or send real email without appropriate authorization.
- Work within the requested scope. Database hosting and Vercel deployment are future work; no cloud resource has been provisioned. Do not commit, push, rewrite Git history, or publish unless requested.
- Before recursive Windows cleanup, verify resolved absolute targets are within the intended workspace and named scope. Do not remove unrelated ignored data. The owner authorized removal of the original asset archive in this task.

## Application and important paths

- Tech Venture Solutions marketing website, Next.js 16.4.2 App Router, React 19.3.1, TypeScript 6.0.3, Tailwind CSS 4.3.3, Chakra UI 3.37.0, Motion 14.6.0.
- Routes: home, about, services, portfolio, blog, case studies, contact, privacy policy, cookie policy, terms and conditions. `src/app/api/contact/route.ts` validates inquiries, saves with Prisma, and optionally sends a Resend notification.
- PostgreSQL is the active database target. `prisma/schema.prisma` is the model source; `prisma.config.ts` loads `.env` for CLI commands; `src/lib/prisma.ts` caches a lazy client with `@prisma/adapter-pg`. Generated client output `src/generated/prisma` is ignored.
- `DATABASE_URL` is server-only. Optional email settings: `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`. `DEBUG_ERRORS` defaults false. Next.js manages `NODE_ENV`; `PORT` and `NODE_OPTIONS` are runtime options. `.env.example` contains no credentials.
- All project documentation is in `development-plans/`, renamed from `docs/`. Start with `development-plans/development-plan-01.md`, `assets.md`, `verification.md`, and the root README.

## Completed work: initial local setup and dependency/asset modernization

- Installed dependencies and regenerated the lockfile; added setup, schema/client, type-check and asset commands; documented fresh-clone operation.
- Upgraded Next.js, React, Prisma and UI packages; migrated flat ESLint config, Prisma 7 generation and adapter initialization. Removed unused Headless UI, bundle analyzer, Upstash, cross-env, react-bits and Nodemailer packages; animation source imports use `motion/react`.
- Replaced the removed Simple Icons LinkedIn export with the Font Awesome equivalent. Moved canvas animation setup into an effect, used animation-frame timing, and fixed cleanup for React's lifecycle checks. Fixed pre-existing missing image references and removed a missing CSS texture request.
- Compressed and reorganized 97 assets: 136.57 MiB to 14.62 MiB (89.3% smaller). Images use WebP/SVG, application icons remain PNG, and six H.264/AAC MP4 previews retain complete content at 720p/30 fps. Updated all source references.
- Browser verification before PostgreSQL migration: all ten page routes HTTP 200, no page errors or failed local asset responses, all six videos loaded at 1280x720, hover playback advanced, mobile home had no horizontal overflow. Invalid contact payload returned 400; empty database config returned 503; no email was sent.

## Completed work: PostgreSQL, cleanup, formatting and CI

- Replaced MySQL/MariaDB with PostgreSQL, installed matching stable Prisma 7.10.1 PostgreSQL adapter plus pg, and updated environment templates/documentation. No external database or existing user data was accessed or migrated.
- Removed the obsolete MySQL migration and generated `20261022000000_postgresql_init` from the active schema. The table is consistently lowercase `contact`; the old SQL created uppercase `Contact`. PostgreSQL TEXT supports long messages. This is a fresh-database baseline, not a MySQL data-transfer tool.
- Added `db:drift` and `db:check`. The CRUD check requires `DATABASE_TEST_ALLOW_WRITE=true` and an isolated test database, creates/reads/updates/deletes inside a transaction, and sends no email. Locally applied the baseline to isolated PostgreSQL 18.4, confirmed zero schema drift, and verified CRUD, defaults and long text.
- After verifying all optimized hashes, removed `.local/asset-originals` (143,200,132 bytes). No old asset copies remain under `public`. Manifest source hashes/sizes are provenance only. The optimizer now requires an explicit external source archive argument and never recreates a local archive. Old assets remain in Git history; history has not been rewritten.
- Renamed `docs` to `development-plans` and updated script/README links. Asset manifest: `development-plans/assets-manifest.json`. Budget: 5 MiB per asset and 20 MiB total; `assets:check` validates hashes, inventory and source URLs.
- Added Prettier 3.9.10, formatting write/check commands, Prisma formatting verification, EditorConfig and Git line-ending rules. `check` combines formatting, lint, types, schema and asset checks. Public media, generated code, local data and build output are excluded from Prettier; npm generates the lockfile and Prisma generates SQL.
- Added GitHub Actions workflows: `code-quality.yml` (Linux/Windows checks/build, PostgreSQL 18 integration, Actionlint), `security.yml` (audit and Gitleaks), and `codeql.yml` (JavaScript/TypeScript and Actions). Actions use full commit pins; downloaded tools use version/checksum pins; permissions are minimal; no application secrets are required.
- Added weekly npm/Actions Dependabot updates with compatible package grouping. No auto-merge. Hosted CI runs await commit/push; local Actionlint validation and Gitleaks scans passed (19 history commits and 223 nonignored working-tree files, no leaks). Clean npm ci, the quality checks and the production build passed. The configured contact API returned 200, independently persisted a long inquiry in PostgreSQL, and the test row was removed; email stayed disabled.

## Current delivery task: formatting confirmation and hosted CI

- The owner authorized committing and pushing the modernization work and fixing failures in the resulting GitHub Actions runs.
- Verified both formatting commands traverse the repository root and documented their exact behavior and intentional exclusions in README. CI performs a read-only formatting gate; it does not write formatting commits. Public media preserves original bytes/whitespace in Git and is validated by hashes, while source formatting and whitespace checks remain enforced.
- Stopped the local development server and confirmed TCP port 3000 is closed. Keep it stopped unless the owner requests a restart.
- Delivery scope includes the prior local setup, dependency updates, optimized asset replacements, PostgreSQL migration, formatting conventions, project documentation and CI/Dependabot configuration. Exclude ignored secrets, dependencies, build output and local evidence.
- Hosted run results will be recorded after the initial push and any required CI fixes.

## Dependency constraints and remaining boundaries

- Pin matching stable Prisma client, CLI and adapter versions (7.10.1); the registry's CLI latest tag pointed to an 8.0 release candidate. Do not switch to a prerelease implicitly.
- TypeScript 6.0.3 is inside typescript-eslint's declared range `>=4.8.4 <6.1.0`; TypeScript 7 is outside it. Node typings match Node 24.
- ESLint 9.39.5 satisfies the current React/import/accessibility plugins' peer ranges. ESLint 9 is end-of-support upstream; review and upgrade those plugins together before moving back to ESLint 10. Do not hide peer conflicts with legacy-peer-deps or broad overrides.
- Latest full dependency audit had five high development-only entries from one unpatched braces chain through eslint-config-next. Production-only audit was clean. Security CI gates high/critical production findings and publishes the full audit for review, including development findings; it does not claim all findings are fixed.
- No persistent PostgreSQL credentials or hosting has been configured. `.env` remains local. A real successful contact submission requires a configured database. Email/provider acceptance/delivery is unverified; do not claim otherwise.
- Nunito uses `next/font/google`, so initial dev/build font download requires network access. Deployment and visual/product improvements remain later work. Review contact validation, abuse controls and notification HTML before a public production release.
- CodeQL and Dependabot security features may require GitHub repository settings/plan support. Adding YAML does not configure branch protection, enable alerts, execute hosted workflows, or deploy anything.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
