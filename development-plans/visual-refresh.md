# Visual refresh and public website settings

Completed October 22, 2026. The [subsequent Digital Horizon Systems rebrand](digital-horizon-rebrand.md) supersedes its footer identity, personal bylines, legal dates, some editorial photos and video preview implementation. This work is limited to the requested presentation, motion, public contact configuration, newsletter removal and section visibility changes. Database hosting, deployment and unfinished content pages remain separate work.

## Design decisions

- Off-white surfaces, forest-green text, teal primary actions and a restrained pale green accent share semantic tokens in `src/app/globals.css`.
- [Space Grotesk on Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) serves large headings; [Inter on Google Fonts](https://fonts.google.com/specimen/Inter) serves body text, smaller headings and controls. Both are variable fonts loaded through Next.js with swap and self-hosted delivery.
- The hero uses a static composition and brief transform/opacity entry. Continuous header effects and the active canvas were removed. Cards use borders and short transform/color transitions instead of scale/glow effects. Operating-system dark mode no longer creates a partial, mismatched theme.
- Slider logos are local. Two equal groups provide a seamless single-transform loop; the duplicate group contains no focusable links. IntersectionObserver and document visibility pause offscreen/background work. Hover, focus, a pause button, a full-grid button and reduced-motion layouts are supported. Reduced motion also prevents portfolio video autoplay.
- Header, slider, service and about logo containers use `fill` with `object-contain` and explicit sizes, preserving source aspect ratios. Above-the-fold story and featured-blog photos load eagerly.
- Footer: logo then Services, Company, Helpful Links, Social Media; compact column gaps and light background keep the logo readable. On mobile the logo precedes Services. Newsletter and Legal/Downloads columns are removed; bottom legal links remain.

## Public configuration

`src/lib/site-config.ts` is a strict whitelist. The server layout creates its serializable public configuration; `SiteConfigProvider` supplies client components. `DATABASE_URL`, Resend settings and arbitrary environment variables cannot enter that object. Contact fields are blank pending current details; consultation defaults to `/contact`. Existing social, partner, project and retained team destinations moved to editable environment settings. Invalid/empty URLs disable optional destinations. Asset paths and SVG namespace identifiers are not configurable navigation destinations. The commented Next.js starter fragment has no active outbound links.

`.env.example` documents every public setting. Existing local settings were preserved while missing public settings were added to ignored `.env`. Restart dev / rebuild production after edits. Email notifications now require a configured key, sender and recipient, with no hardcoded addresses.

## Hidden sections and newsletter removal

`AboutPageTeams.tsx` remains available without an import in the about page. The formerly inline contact cards now live in `ContactInformationCard.tsx` and `ContactQuickActionsCard.tsx`, and the existing `ContactPageMap.tsx` remains available. None are imported by the contact page/form. They use the same public configuration if restored.

Newsletter state, checkbox, form payload, API mapping and Prisma model field are removed. Forward migration `20261022010000_remove_newsletter` drops only that column; the committed initial migration remains unchanged. Updated CRUD verification modifies company data instead of newsletter preferences. Run `npm run db:deploy` on an existing PostgreSQL installation before accepting inquiries with this version.

## Image sources

The following stock photos illustrate industry topics and do not depict actual clients or their projects. Sources were searched and reviewed on Pexels and downloaded under the [Pexels license](https://www.pexels.com/license/). Images are served locally, resized/cropped to 1200 × 800 and encoded as WebP at quality 78 / effort 6. Cybersecurity uses a bottom crop; others use a centered crop.

| Asset               | Photographer        | Source                                                                                                   | Optimized size |
| ------------------- | ------------------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| ecommerce.webp      | Polina Tankilevitch | [Pexels source](https://www.pexels.com/photo/a-person-shopping-online-using-a-laptop-5585793/)           | 59.7 KiB       |
| manufacturing.webp  | Deniz SENGUL        | [Pexels source](https://www.pexels.com/photo/worker-operating-machinery-in-industrial-factory-32407077/) | 152.7 KiB      |
| healthcare.webp     | RDNE Stock project  | [Pexels source](https://www.pexels.com/photo/doctors-and-nurses-in-a-hospital-6129502/)                  | 51.8 KiB       |
| cybersecurity.webp  | cottonbro studio    | [Pexels source](https://www.pexels.com/photo/laptop-with-cyber-security-text-on-the-screen-5483240/)     | 10.1 KiB       |
| infrastructure.webp | Brett Sayles        | [Pexels source](https://www.pexels.com/photo/server-racks-on-data-center-5480781/)                       | 193.0 KiB      |
| restaurant.webp     | Matheus Bertelli    | [Pexels source](https://www.pexels.com/photo/interior-of-a-restaurant-17294748/)                         | 174.0 KiB      |

Three formerly remote partner marks now live in `public/images/logos`: [Shopify](https://cdn.simpleicons.org/shopify/7AB55C), [HubSpot](https://cdn.simpleicons.org/hubspot/FF7A59), and [AWS](https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg). These are brand-identification assets. Source URLs and hashes are retained in the manifest.

Public inventory at that stage: **106 assets, 15.25 MiB**. No original-photo copies or downloaded database tools belong in Git.

## Verification

- Production build succeeds; format, lint, five public-configuration tests, TypeScript, Prisma validation and all asset hashes/budgets are checked.
- Chrome: all ten main routes return 200; seven marketing routes have no horizontal overflow at 390 px; desktop uses 1440 px. Font families, responsive menu, footer columns/social relocation/logo order, hidden sections and six loaded case-study photos were inspected.
- Slider runs only in view, pauses/resumes through its control, has no focusable duplicate links and becomes a static grid with reduced motion. The active home page mounts no canvas.
- Isolated PostgreSQL 18.4: upgrade preserves an existing inquiry while dropping the newsletter field; fresh installation applies both migrations; both paths have zero schema drift. Prisma CRUD and the contact handler persist inquiries without newsletter data; email remained disabled and test records were deleted.
- Existing blog-detail destinations (including `/blog/4` and `/blog/5`) still return 404 on prefetch. Their routes/content were not part of this visual task. No deployment or Git delivery was requested for this change.

Local screenshots and machine-readable browser/database reports are kept in ignored `.local`. Development-mode checks on six routes reported no image-sizing, LCP or hydration warnings and no page errors. An intercepted form submission contained no newsletter field. Final production checks verified document-visibility pausing, reduced-motion removal of both animation and will-change, a 24 px gap between logo and Services, and mobile logo order. All development/test servers were stopped; ports 3000, 3100, 3101 and 55432 have no listeners. Temporary PostgreSQL tools and cluster were removed.
