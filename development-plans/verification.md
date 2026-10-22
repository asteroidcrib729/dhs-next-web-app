# Local verification - October 22, 2026

I verified the current PostgreSQL project on Windows with Node.js 24.21.0 and npm 11.19.1. Hosted GitHub Actions runs await commit/push; local validation does not establish that a hosted workflow has passed.

## Current repository and database checks

| Check                         | Result                                                                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean `npm ci`                | Passed with the regenerated lockfile; postinstall generated Prisma Client 7.10.1.                                                                                                           |
| Package/lockfile declarations | Direct dependency and development dependency declarations match exactly.                                                                                                                    |
| `npm run format:check`        | Passed Prettier and read-only Prisma formatting verification.                                                                                                                               |
| `npm run lint`                | Passed with zero warnings required.                                                                                                                                                         |
| `npm run typecheck`           | Passed.                                                                                                                                                                                     |
| `npm run db:validate`         | PostgreSQL schema valid.                                                                                                                                                                    |
| `npm run assets:check`        | All 97 output hashes, asset paths and size budgets passed; public assets remain 14.62 MiB.                                                                                                  |
| Production build              | Passed after PostgreSQL migration and repository-wide formatting; all pages prerendered and the contact API remained dynamic.                                                               |
| PostgreSQL baseline           | Applied successfully to isolated local PostgreSQL 18.4.                                                                                                                                     |
| `npm run db:drift`            | No difference between the initialized database and the Prisma schema.                                                                                                                       |
| `npm run db:check`            | Prisma create/read/update/delete, nullable/default fields, timestamps and a message over 191 characters passed.                                                                             |
| Contact API -> PostgreSQL     | Health HTTP 200, invalid payload HTTP 400, valid submission HTTP 200; the inquiry was independently read from PostgreSQL, then deleted. Email was disabled.                                 |
| Actionlint 1.7.12             | All three workflows passed local validation. Shellcheck/Pyflakes integration was disabled for the Windows tool invocation; the Ubuntu CI job uses Actionlint with available runner tooling. |
| Gitleaks 8.30.1               | No leaks found in 19 repository commits or in a copy of 223 nonignored working-tree files, including the new workflows. Output was redacted.                                                |
| Production npm audit          | Zero known vulnerabilities.                                                                                                                                                                 |
| Full npm audit                | Five high development-only findings, described below.                                                                                                                                       |
| Git hygiene                   | `.env` and `.local` remain ignored; `.env.example` is commit-ready. Public media disables line-ending conversion to preserve exact hashes on all platforms.                                 |

The local PostgreSQL instance was created solely for verification, bound to 127.0.0.1:55432, and never used external credentials or existing business data. Temporary tools/database data are removed after verification. `.env` still has no persistent database URL or Resend key. No production database was provisioned and no existing MySQL data was transferred.

## Asset cleanup and documentation

The optimized assets were verified before removing `.local/asset-originals`, freeing 143,200,132 bytes (136.57 MiB). The original paths are absent from `public`. Historical source hashes and byte counts remain in the manifest as provenance. Re-encoding now requires an explicit external source archive; the optimizer does not recreate an ignored local archive. Existing Git history still contains earlier blobs and has not been rewritten.

`docs` was renamed to `development-plans`; README links and asset tooling use the new directory. [AGENTS.md](../AGENTS.md) records project conventions, completed work, evidence, limitations and the requirement to keep that record updated.

## Browser baseline from the initial modernization

Before switching the database provider, the local production site was checked in installed Chrome: all ten public page routes returned HTTP 200, no page errors or failed local asset requests were recorded, all six MP4 previews loaded at 1280x720, the first preview played on hover, and mobile home had no horizontal overflow at 390x844. Invalid contact data returned 400 and an empty database configuration returned 503. No email was sent.

The initial home, mobile home and portfolio screenshots plus browser report remain ignored under `.local`. They were inspected for rendering/layout and were not compared with a captured pre-upgrade visual baseline. The later PostgreSQL check verifies the contact API, database and response path with successful persistence, as recorded above.

## Dependency constraints and audit limitation

The five full-audit entries are one development-tool chain: `eslint-config-next` -> `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`. Every affected lockfile node is marked development-only. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched version at this verification. Production-only audit is clean. Security CI blocks high/critical production findings and publishes the full audit and counts for review; development findings remain visible and unresolved.

ESLint 9.39.5 satisfies the current React/import/accessibility plugins' declared peer ranges, avoiding the previous ESLint 10 peer conflicts during clean installs. ESLint 9 is end-of-support upstream; review plugin support and upgrade them together. TypeScript 6.0.3 is within the current TypeScript ESLint parser's supported range; Prisma client/CLI/PostgreSQL adapter stay aligned at stable 7.10.1, and Node typings match Node 24. No peer-dependency override or legacy-peer-deps bypass is configured.

## Remaining boundaries

GitHub must execute the new workflows after commit/push; Linux CI, CodeQL uploads and scheduled Dependabot PR creation have not been observed locally. Repository security settings and branch protection remain operator configuration. See [development plan 01](development-plan-01.md).

Persistent PostgreSQL hosting, real local credentials and Vercel deployment remain future tasks. Set a real `DATABASE_URL` and deliberately apply the baseline only to an appropriate fresh PostgreSQL database. Existing MySQL data requires its own transfer plan if relevant.

`RESEND_API_KEY` remains empty. Provider acceptance and email delivery were not tested. Configure a verified sender and intended recipient before enabling notifications. Nunito is downloaded through `next/font/google`, so the first development/build font download needs network access.
