# Vercel and Prisma deployment

The owner authorized deployment on October 24, 2026. Target public origin: https://digitalhorizonsystems.vercel.app.

## Resources and isolation

- Vercel team: farazhussain-5000s-projects (team_grJesWXYv44pv3DuOPkWPa9z).
- Vercel project: digitalhorizonsystems (prj_q8SilSUQloxBnDheQyBOQwV837hm), linked to asteroidcrib729/dhs-next-web-app. Node 24; functions in Singapore (sin1).
- Existing Prisma workspace: Personal workspace (wksp_d92jyphfrn32hycz9voueezd).
- One Prisma project: Digital Horizon Systems (proj_p0nq6s36wcod40owpw3xaso1), default region ap-southeast-1.
- Production database: dhs-production (db_aic0uqga8auwqpri609xtlgc), on the Prisma main production environment.
- Preview database: dhs-preview (db_iqm0hazncpndvk9ridbpw3xm), on the Prisma master preview environment. These Prisma environment names are separate from Vercel/Git deployment selection: the repository master branch deploys production on Vercel. Vercel environment variables explicitly select the correct database.
- Local .env points only to preview. Existing non-database settings and its auth secret were preserved. Production and preview auth secrets are independent. Secrets, .vercel linkage, local credentials and verification reports are ignored by Git.

The Prisma plugin created/verified the workspace project and issued the approved Vercel credentials. Its database creation tool lacks a project selector and would create extra projects, so the official Prisma 8.0.0-rc.15 CLI was used only to create databases within the selected project. The application's Prisma ORM, generated client, adapter and migrations remain version 7.10.1.

## Deployment behavior

Vercel applies db:deploy before build using the direct database URL. Application traffic uses the PostgreSQL pooler with explicit certificate/hostname verification and a maximum of two connections per process. Preview authorization uses the server-provided VERCEL_URL hostname, never a request Host header; production and local use their exact configured auth origins. Use the generated preview URL when testing Studio authentication.

Both databases receive the existing three forward migrations. Preview permits explicit disposable integration checks; production must never run db:check or studio:check. Test records are owned by those checks and removed afterwards. No real email is sent during verification; optional Resend notifications remain unconfigured.

The explicit studio:import -- --publish-current operation preserves the already visible bundled public catalogue, original creation/publication/update dates and noindex flags. Existing database entries are skipped. Ordinary imports remain private drafts. Legacy summaries and illustrative/unverified case studies keep their existing noindex decisions; deployment does not certify their results.

## Editorial accounts

The owner selected the configured public contact email for private editor accounts. Separate random temporary passwords for production and preview are stored only in the ignored .local/deployment/studio-credentials.json file. Public signup is disabled. Sign in at /studio on the production origin or localhost for preview/local. Rotate credentials privately with studio:admin -- --reset-password when needed; that revokes existing sessions. Never put passwords, cookies or database URLs in documentation, issue comments or chat.

## Verification and handoff

Preview migrations, zero drift, inquiry CRUD, editorial lifecycle checks and repeated catalogue import passed before production setup. Final hosted build, public route, editor auth, environment isolation, analytics and Git/CI verification are recorded in the final handoff after deployment. A green CodeQL job alone does not mean no alerts; check the actual alert state as well.

Hosted checkpoint `1cb43b5` passed all 35 tests and all hosted workflows. Production and preview reached READY in Singapore from that commit. Production returned HTTP 200 on 13 routes; authenticated APIs returned all 37 entries, anonymous access 401 and foreign-origin mutation 403. Chrome verified production and protected preview sign-in, mobile layouts, no page errors/warnings and analytics proxy loading/opt-out. A temporary private preview test link was explicitly approved by the owner after automatic review initially rejected sharing. Its bearer value is not recorded here. Vercel Web Analytics reporting still requires project activation at this checkpoint.

The owner enabled Web Analytics in Vercel after the initial deployment verification. The final documentation push triggers a fresh production build with the enabled project setting. Browser controls default analytics on and offer the persistent opt-out at /cookie-policy#analytics-choice. The local development server remains running against preview. Production Studio credentials are in the ignored local credential file described above, not in this document.

Final verification: checkpoint `4d39fd0` is served by production deployment `dpl_2E2peHc1kVgZVKiUAkR17LvwdEqC`, READY in sin1 on the requested public domain. All CI workflows passed. Vercel reporting accepts analytics queries after activation, and live production HTTP/auth checks pass. The temporary private preview sharing link was revoked after testing. The following documentation-only handoff preserves this verified application source. Local development remains on port 3000 against preview.
