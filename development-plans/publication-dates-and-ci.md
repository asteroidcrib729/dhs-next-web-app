# Publication dates and disposable CI credentials

Updated October 24, 2026.

## Public presentation

Blog and case-study details show Created at and Updated at together above the cover. The redundant organization byline and bottom Last updated line are removed. Organization author/publisher information remains in search metadata. Reading time remains because it is computed from actual content, with case-study fields now included. It is an approximate 200-word-per-minute estimate, not a promised reading duration.

Created at is the immutable article record creation time, which can precede publication. First publication is a separate timestamp for Open Graph and JSON-LD datePublished. Updated at identifies the current published version; it initializes at first publication and advances on a qualifying publication. JSON-LD also emits dateCreated. Public modification time feeds the visible time, Open Graph, JSON-LD dateModified and the article sitemap entry consistently. Dates display in UTC, with precise ISO timestamps in time elements and metadata. This follows [Google's recommendation to label dates and keep equivalent values consistent](https://developers.google.com/search/docs/appearance/publication-dates).

## What changes the dates

| Event                                                             | Creation date                         | Published version update                |
| ----------------------------------------------------------------- | ------------------------------------- | --------------------------------------- |
| Create a draft                                                    | Set once                              | Not public yet                          |
| First publication                                                 | Preserved                             | Initialized to first publication time   |
| Save draft, preview or upload an unused image                     | Preserved                             | Unchanged                               |
| Load a revision without publishing                                | Preserved                             | Unchanged                               |
| Publish identical content                                         | Preserved                             | Unchanged                               |
| Publish a featured-only placement change                          | Preserved                             | Unchanged                               |
| Publish title, excerpt, body, category or tag changes             | Preserved                             | Advances                                |
| Publish cover, alternative-text, case details or results changes  | Preserved                             | Advances                                |
| Publish slug, SEO title/description, canonical or noindex changes | Preserved                             | Advances                                |
| Restore and publish an older, different version                   | Preserved                             | Advances                                |
| Unpublish, then republish unchanged content                       | Preserved                             | Preserved while withdrawn and on return |
| Edit while withdrawn and publish changed content                  | Preserved                             | Advances on publication                 |
| Rebuild/deploy or change global layout, fonts or configuration    | Preserved                             | Unchanged                               |
| Delete and create a different record                              | New record gets its own creation date | New publication timeline                |

Comparison ignores object-key order, leading/trailing string whitespace and CRLF/LF differences. Internal Markdown spacing and tag order can affect rendering and count as changes. Featured is the only content field deliberately excluded; future content fields therefore count by default. Same-day changes retain distinct server timestamps even when the visible calendar date is identical. Dates are not editable browser fields and do not use the reader's clock.

Unpublishing clears the public snapshot and slug but retains publication timestamps. The latest publish revision supplies comparison content for republication. Where older unpublishes cleared dates, retained publish revisions recover the first publication and last qualifying version; saves/imports and featured-only/no-op publications do not create a false update. If older code erased the original values, revision-event times are the best retained evidence and can differ slightly from the original transaction timestamps. Existing populated historical timestamps are preserved rather than bulk rewritten. Normal version/conflict checks still make the snapshot and dates atomic.

## Existing and bundled content

No schema migration is needed: creation, first-publication, public-version and private activity timestamps already exist. Studio record updatedAt remains the last private operation, not the public date. New catalogue imports preserve recorded source creation dates; repeat imports preserve existing rows. A configured database remains authoritative and drafts stay private.

Bundled content has recorded catalogue dates rather than a complete historical audit. Its existing date is the baseline, never the build time or filesystem modification time. Optional createdAt/updatedAt source metadata can record known historical edits while keeping the original publication date. Do not invent missing history. Managed uploaded media uses immutable references, so changing the cover requires publishing the new reference. Direct source edits to bundled articles/assets require the maintainer to record the real editorial update date explicitly.

## GitGuardian finding and CI change

The screenshot matches the fixed disposable PostgreSQL test password in commit 7a5a22b, not a production credential. The current workflow also had a fixed editorial test key. Both have been removed from the workflow. Each PostgreSQL job now generates separate 32-byte random database and authentication values, masks them before use, and passes them to later steps through GITHUB_ENV. No repository secret is needed for fork pull requests. The password is inherited by Docker through an environment variable rather than expanded into Docker arguments.

The disposable PostgreSQL 18 container binds only 127.0.0.1:5432, keeps password authentication, must become healthy before checks run, and is removed with its volumes in an always cleanup step. [GitHub's PostgreSQL container guidance](https://docs.github.com/en/actions/tutorials/use-containerized-services/create-postgresql-service-containers) and the [official image's authentication documentation](https://github.com/docker-library/docs/blob/master/postgres/README.md) informed this setup. The change does not enable trust authentication in CI.

Historical commit content and GitGuardian's external alert state are unchanged. GitHub's accessible commit checks/comments did not expose that private alert. Classifying the historical disposable fixture as a false positive in GitGuardian is separate from removing literals in current code; no history rewrite, production credential rotation, push or hosted workflow dispatch was performed.

## Validation

Unit checks cover every content field, no-op/featured changes, whitespace normalization, same-day edits, reversions, historical recovery, computed reading times and separate search dates. Disposable password-authenticated PostgreSQL verifies the publication lifecycle, concurrency, dates and source-date-preserving idempotent imports. Final browser checks passed the publishing flow in America/Los_Angeles against UTC-rendered dates, private draft previews, no-op/featured publications, withdrawal/republication, consistent search dates and sitemap, four responsive widths and no-JavaScript bundled rendering. The final run had no hydration/application errors or unexpected warnings. Three framework CSS-prefetch notices appeared during rapid navigation and are retained separately in the report; no runtime preload behavior was changed for this task. Evidence is in ignored .local/article-date-browser-report.json and article-dates-*.png. All 31 tests, the full quality suite and production build passed; details are recorded in AGENTS.md.

Actionlint, Bash syntax and local Gitleaks checks cover the revised workflow. Mocked Docker bootstrap checks exercise healthy, unhealthy and timeout branches, distinct random/masked values, loopback binding and password exclusion from Docker arguments. Docker is unavailable locally, so this is not a claim that the new container bootstrap or hosted workflow ran successfully. No permanent database or local .env values are changed. Leave localhost:3000 running.
