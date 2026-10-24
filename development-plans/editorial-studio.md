# Editorial studio and audience measurement

Implemented October 23, 2026. Deployment and permanent database provisioning remain separate work.

## Local operation

The studio lives at `/studio`. It uses the existing PostgreSQL database through Prisma, with Better Auth for private editor accounts. It has no public registration or hosted CMS dependency. Marketing pages still work without a database; the studio shows setup instructions until its settings are present.

1. Configure `DATABASE_URL` for your intended PostgreSQL database.
2. Set `BETTER_AUTH_URL` to the exact application origin, such as `http://localhost:3000`. Use HTTPS outside loopback development. Generate a private `BETTER_AUTH_SECRET` of at least 32 random characters. The existing ignored local `.env` has a generated secret; fresh clones must supply their own.
3. Set `SITE_URL` to the public canonical origin. Use localhost for development and the real HTTPS domain before release. This supplies canonical addresses, sharing image URLs and the sitemap. No public domain is guessed.
4. Run `npm run db:deploy`. The forward migration adds editorial/authentication tables and preserves the contact table. No cloud database is created automatically.
5. Set `STUDIO_ADMIN_EMAIL` and a unique `STUDIO_ADMIN_PASSWORD` of 14 to 128 characters privately, then run `npm run studio:admin`. Clear these bootstrap values afterward. The account display name is “Editorial team”; search metadata retains organization attribution.
6. Restart the application, open `/studio` and sign in.

Provision additional editors by repeating the account command with another email. To reset a known account intentionally, run `npm run studio:admin -- --reset-password` with its email and new password set privately. This replaces the password and revokes all existing sessions. There is no unconfigured email-reset flow. Never put passwords in command arguments or committed files.

Next.js reads its usual environment files. CLI scripts read `.env` through dotenv and preserve values already set in the launching shell. Keep database/authentication values consistent between CLI and server. Private credentials are excluded from the public configuration whitelist.

## Existing content

`npm run studio:import` imports 31 blog entries (25 retained summaries and six original articles) and six case-study records as **drafts**. It is idempotent and never overwrites an existing entry. The 25 retained posts contain short summaries; six new original articles cover Web Development and Desktop Solutions. Historical case-study metrics require owner verification, and the two replacement cases are clearly labelled illustrative scenarios. Review, expand, check permissions and publish deliberately.

Without `DATABASE_URL`, public catalogues use the preserved bundled records. Once a database is configured, public listings, detail routes and sitemap use **only published database records**, including an intentionally empty catalogue. No fallback resurrects withdrawn articles or conceals a database outage. Importing drafts does not publish them.

Retained summary detail pages and all case studies start with noindex enabled because the summaries and claims need review. The six new complete articles are indexable after deliberate publication, but importing still creates private drafts. Clear that control after completing the article and verifying its content if it should appear in search. Newly created articles default to indexable when published.

## Service and category refresh

The public blog offers IT Solutions, SEO, Cybersecurity, E-commerce, Network Infrastructure, Web Development and Desktop Solutions. The editor offers these categories for blog posts. Digital Marketing, Content Marketing, PPC and Social Media are retired categories: publication rejects them, and existing database publications in those categories are excluded from catalogues, detail routes and sitemap. Social profile links in the footer remain available.

The bundled H3C startup and restaurant cases have been replaced by a desktop operations workflow and a business website with SEO/email workflows. Their former slugs redirect to the replacements when those replacements are published. Without a configured database, the bundled replacements are available immediately. If a database was imported earlier, the import command preserves those existing drafts: update/review them in the studio, set the new slugs and covers, and publish the replacements. Retired records can be unpublished and deleted in the studio; this code update does not silently delete private database history. Superseded bundled covers were removed from the local library, so choose a current editorial image for older saved drafts before publishing them.

## Editing and publishing

- Dashboard: create blog articles or case studies, search by title/category and filter by type/status.
- Editor: title, slug, excerpt, category, tags, featured flag, safe Markdown, accessible cover, and a search appearance preview. Case studies also have client/industry, challenge, solution and results fields. Use anonymized client wording when appropriate.
- Markdown supports headings, links, lists, tables, quotes and code. The title supplies H1. Raw HTML, tracking images and inline image embeds are disabled; use the managed landscape cover. This is a Markdown editorial workflow, not arbitrary JSX or executable content.
- Save draft preserves the live snapshot. Publish validates required content, image accessibility and SEO fields, then atomically replaces the live snapshot. Public detail pages and metadata read the published snapshot, never unsaved work or the private draft.
- Saved previews require a live editor session and carry noindex metadata. They are not public share links. Save before previewing; unsaved changes are marked and leaving the editor warns about them.
- Every save/publication/unpublication records a revision. The editor lists the latest 30; the database retains the full history until the entry is deleted. Restoring loads content into the editor; save or publish to apply it.
- Version checks reject conflicting saves with HTTP 409 instead of overwriting another editor. Keep the current text and reload/reconcile before retrying.
- Unpublish removes public access and sitemap inclusion while retaining the draft and revisions. Delete requires an unpublished entry and removes its history. A published slug change creates a permanent redirect from the former URL. Conflicting live or reserved URLs are rejected.

## Article dates and reading estimates

Created at uses the entry's original creation date. Updated at starts at first publication and changes when revised public article content or SEO fields are published. Draft saves, previewing, loading an old revision without publishing, unchanged republishes and featured-only changes do not advance it. Unpublishing preserves the timeline; unchanged republication keeps both public version dates. Restoring and publishing content that differs from the current public version counts as an update. All dates display in UTC; same-day edits can share a visible date while retaining distinct timestamps.

Future imports preserve recorded catalogue creation dates without changing existing records. Bundled records use their existing dates and can explicitly supply createdAt/updatedAt metadata for known historical changes. Do not assign a fresh date just because code was rebuilt. The dashboard's activity time still describes private studio work, separately from public Updated at. Reading estimates are computed from the excerpt, body and additional case-study sections at approximately 200 words per minute; unused legacy readTime strings are not used. See [the complete event matrix](publication-dates-and-ci.md).

## On-page SEO

Each entry supports an SEO title, description, canonical override, noindex and cover alternative text. Published pages emit one H1, labelled creation/published-version dates, a calculated reading estimate, Open Graph/Twitter sharing metadata and escaped Article/BlogPosting JSON-LD. `/sitemap.xml` includes published, indexable articles with their last publication-update time and omits external-canonical duplicates. `/robots.txt` excludes studio/API routes. Private studio responses additionally carry `X-Robots-Tag` headers.

Canonical overrides must be complete HTTPS URLs without credentials, query strings or fragments. The default canonical uses `SITE_URL` and the published slug. Search-preview length hints are editorial guidance; they do not promise how search engines display or rank content.

## Media

Editors can select existing local landscape images or upload landscape JPEG, PNG, WebP or AVIF. Uploads are authenticated, limited to 4 MiB and 24 megapixels, decoded and validated, oriented and converted to metadata-stripped WebP at up to 1600 px width. Animated and SVG uploads are rejected. Identical optimized bytes are deduplicated.

Optimized uploads are stored in PostgreSQL, not the repository or a serverless filesystem. Database backups must include editorial/media tables. This is suitable for a modest editorial library; monitor database size before expanding to a large media collection. Existing `public` assets retain manifest/hash validation and the 20 MiB budget.

Draft-only uploaded covers require an editor session. An uploaded cover becomes publicly readable while a published article references it; unpublishing removes public access if no other publication uses it. Uploaded bytes use private/no-store responses, and Next Image optimization is bypassed for these authenticated URLs to avoid caching a private preview publicly. Covers on a published article are public content and must contain no confidential information.

The unused-upload delete action refuses images referenced by a draft, publication or retained revision. Deleting an entry does not automatically remove reusable media. Bundled repository images cannot be deleted from the studio.

## Analytics and privacy choice

Vercel Web Analytics is enabled by default in the application. The Cookie Policy contains a persistent browser opt-out, linked from Privacy and Terms. `dhs-analytics-disabled=true` in local storage blocks subsequent analytics events; clearing site data resets the default. Changes synchronize across tabs. If storage is blocked, the in-memory choice lasts until that tab reloads/closes.

The client checks the saved preference before mounting Analytics and checks it again in `beforeSend`, so previously loaded scripts cannot send through this integration after opt-out. The hook removes URL query strings/fragments and excludes studio, preview and API paths. No inquiry data, editor identity or custom events are sent. Analytics does not use analytics cookies; necessary editor session cookies are separate. Opt-out does not delete measurements already received.

Local development uses the SDK’s debug behavior. Hosted collection requires enabling **Web Analytics in the intended Vercel project dashboard** and deploying this code. No Vercel project or account setting was changed. The integration does not imply that a hosted dashboard has already received visits. Production retention and provider processing locations depend on the eventual service/account configuration.

References: [Vercel Analytics privacy](https://vercel.com/docs/analytics/privacy-policy), [redaction and opt-out](https://vercel.com/docs/analytics/redacting-sensitive-data), [Better Auth Prisma adapter](https://better-auth.com/docs/adapters/prisma), [Better Auth rate limiting](https://better-auth.com/docs/concepts/rate-limit).

## Requested visual changes

Header navigation ends with Contact, including mobile. Active-page underlines span the full link text, including nested Blog/Case Studies routes. Footer links use four equal grid tracks with a common gap; the logo retains a separate larger gap. The About story and methodology now use new landscape URLs, avoiding cached images from the former filenames:

- Story: [ThisIsEngineering, Pexels 3862370](https://www.pexels.com/photo/engineers-planning-structure-3862370/), collaborative planning at a whiteboard.
- Methodology: [Kindel Media, Pexels 7651636](https://www.pexels.com/photo/two-people-holding-document-papers-7651636/), colleagues reviewing charts.

Both are 1200×800 WebP under the [Pexels license](https://www.pexels.com/license/). Source/download URLs, encoding and hashes are in `assets-manifest.json`. Obsolete About files were removed after reference updates.

## Verification

`npm run check` covers formatting, lint, types, schema, assets and unit tests for editorial validation, safe Markdown, structured data and analytics filtering. `npm run studio:check` requires `DATABASE_TEST_ALLOW_WRITE=true` and a disposable PostgreSQL database with authentication settings. It verifies private defaults, draft/live isolation, concurrent-save conflicts, revisions, redirects and publication lifecycle, then removes its rows. It is also part of PostgreSQL CI.

Browser verification uses a disposable database/account and stubs hosted analytics collection so test traffic is not sent to a real project. Final evidence and limitations are recorded in AGENTS.md. No deployment, commit or push is part of this task.
