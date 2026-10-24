# Digital Horizon Systems rebrand

Completed October 23, 2026 (Asia/Karachi). This extends the [earlier visual refresh](visual-refresh.md). No commit, push, deployment, cloud provisioning or external database changes are included.

## Identity and visible copy

Digital Horizon Systems replaces the former brand in visible source, titles, descriptions, accessible logo names, footer copyright and the npm package name. The repository folder and GitHub URL retain their existing identifiers. The owner requested that **no personal names remain visible**. The About story now explains the brand’s purpose without named founders or inherited founding claims. Blog bylines identify Digital Horizon Systems. Named testimonials were replaced with working principles, and the retained, unimported team component describes capabilities without individual names or profile links. Personal profile environment keys are no longer serialized to the client.

Visible copy has no em dashes, en dashes or double-dash punctuation. CSS custom-property syntax and command flags retain their required double hyphens. Top-right/external pointer icons were removed from all live controls, including social labels and portfolio links.

## Logo assets

The source artwork is an original geometric horizon mark and an outlined Space Grotesk wordmark. It is authored as vector geometry, rather than a raster image embedded in an SVG. Logo text does not depend on a browser font. The lettering uses [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), distributed under the [SIL Open Font License](https://github.com/floriankarsten/space-grotesk/blob/master/OFL.txt).

| Variant          | Files under public/branding                          | Use                           |
| ---------------- | ---------------------------------------------------- | ----------------------------- |
| Main wordmark    | digital-horizon-systems-logo.svg / .png / .jpg       | Header and light surfaces     |
| Inverse wordmark | digital-horizon-systems-logo-light.svg / .png / .jpg | Dark footer and dark surfaces |
| Symbol           | digital-horizon-systems-mark.svg / .png / .jpg       | Browser and application icons |

SVG and PNG backgrounds are transparent. **JPEG cannot store transparency**: main/symbol JPG exports use white, and the inverse JPG uses the dark brand color. SVG wordmarks are 450 × 128; raster wordmarks are 1040 × 296; raster symbols are 512 × 512. Browser favicon is a real ICO containing a 64 px PNG. The existing 192/512 px application icons were replaced, and a 180 px Apple touch icon was added. Old brand logo files were removed.

Edit the SVG masters, then run `npm run assets:brand` to regenerate PNG/JPG files, icons and manifest hashes. `scripts/generate-brand-assets.mjs` uses the already installed Sharp package. The general optimizer preserves entries marked as generated rather than expecting them in an external photo archive. A local downloadable logo archive is available in ignored `.local/Digital-Horizon-Systems-Brand-Kit.zip`.

## Header, footer and hero

The header uses the full wordmark, a subtle gradient strip and active-page underline. Its large green CTA is removed. **Free Consultation Available always links to /contact**, even when `SITE_CONSULTATION_URL` changes; that setting still controls other consultation actions.

The footer uses the transparent inverse logo over a dark gradient. Desktop spacing separates the brand block from a tighter group of Services, Company, Helpful Links and Social Media. Social Media sits near the right edge, with no arrow icons. On mobile, the logo precedes Services. Old-brand default social URLs were cleared from the template and matching local defaults; custom local values were preserved. Platform labels stay visible without a clickable destination until valid new handles are configured. No new handles or addresses were invented.

The hero uses a static horizon motif, stronger typography and a dark services panel. It adds no continuous animation or canvas. Existing reduced-motion support remains in place.

## Imagery and layout repairs

Both About photos were replaced with relevant collaboration/strategy photography. The editorial image review covered all 45 blog records. Mismatched ROI, engagement, disaster-recovery and payment visuals were replaced: two ROI posts share the new analytics photo, the recovery post reuses the existing data-center photo, and content-planning/payment topics have relevant new photos. Other appropriate blog images were retained. These stock photos illustrate topics and do not depict actual staff or clients.

| Asset                                | Photographer        | Source                                                                                                   |
| ------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------- |
| images/about/methodology.webp        | olia danilevich     | [Source](https://www.pexels.com/photo/persons-using-laptops-on-table-with-charts-8145328/)               |
| images/about/our-story.webp          | Tima Miroshnichenko | [Source](https://www.pexels.com/photo/colleagues-planning-together-while-looking-at-the-screen-5685890/) |
| images/blog/marketing-analytics.webp | Negative Space      | [Source](https://www.pexels.com/photo/marketing-iphone-smartphone-notebook-34069/)                       |
| images/blog/content-planning.webp    | MART PRODUCTION     | [Source](https://www.pexels.com/photo/woman-sitting-by-desk-writing-in-notebook-7718746/)                |
| images/blog/secure-payments.webp     | Pavel Danilyuk      | [Source](https://www.pexels.com/photo/a-woman-using-her-laptop-while-holding-a-credit-card-7191167/)     |

These sources use the [Pexels license](https://www.pexels.com/license/). New photos are 1200 × 800 WebP, quality 78 / effort 6, with source URLs, download URLs and hashes in the manifest. All **57 editorial photos/illustrations and portfolio posters** are landscape. Logos and application symbols retain the aspect ratios required by their use. Five obsolete blog assets were removed; shared replacement images avoid duplicate files.

The service category bar now uses intrinsic height, consistent padding, contained tab buttons and a single focus outline. All three categories remain keyboard accessible; the active panel stays inside the bar at mobile and desktop widths.

Portfolio previews now use native video with 16:9 frames, no media border, object-cover and 1.2% static overdraw to hide source/subpixel edge seams. Hover, focus and explicit tap/keyboard playback are supported; leave/blur pauses playback and reduced motion disables automatic preview playback. MP4 content was not re-encoded. Removing ReactPlayer pruned 49 unused packages through npm; the lockfile was regenerated, not hand-edited.

## Legal pages and policy dates

Terms, Privacy and Cookies now identify Digital Horizon Systems and describe the current inquiry, optional email notification, external-link and browser-storage behavior. Removed stale newsletter/analytics claims and promises of automatic fixed-schedule deletion. Terms distinguish website information from agreed service contracts and avoid assuming an unconfirmed corporate entity or court jurisdiction. FAQs were rewritten around current services, proposals, inquiry handling and agreed support arrangements.

Privacy/cookie wording was checked against the [ICO transparency guidance](https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/cookies-and-privacy-notices-in-detail/) as a drafting reference. This is a description of implemented behavior, not a jurisdiction-specific legal certification. Revisit policies when actual hosting, retention and processor arrangements are selected.

| Policy  | Effective date              | Reviewed date                   |
| ------- | --------------------------- | ------------------------------- |
| Terms   | SITE_TERMS_EFFECTIVE_DATE   | SITE_TERMS_LAST_REVIEWED_DATE   |
| Privacy | SITE_PRIVACY_EFFECTIVE_DATE | SITE_PRIVACY_LAST_REVIEWED_DATE |
| Cookies | SITE_COOKIES_EFFECTIVE_DATE | SITE_COOKIES_LAST_REVIEWED_DATE |

Use ISO YYYY-MM-DD in `.env`. Each setting is independent. Invalid or missing dates fall back deterministically to October 23, 2026. UTC formatting avoids timezone shifts, and HTML time elements carry the ISO date. These are intentionally public values in the configuration whitelist. Restart dev / rebuild production after edits. Three date tests cover independent settings, impossible/leap dates, arbitrary text and timezone stability; the suite now has eight tests.

Current public inventory: **112 assets / 14.87 MiB**, below the 20 MiB budget.

## Verification

The final production build, `npm run check`, `npm ls --depth=0` and `git diff --check` passed. Asset checks verify transparent PNG/SVG variants, outlined SVGs, all editorial aspect ratios, manifest hashes and package/lock agreement. Chrome development verification passed all ten main routes, nine blog category filters and fifteen responsive route checks at 320/390/768 px. It found no stale brand/name/dash copy, top-right pointer icons, broken media, page errors or image/hydration warnings. All six videos load at 1280 × 720 and support playback/pause/reduced motion. Tab button geometry fits the bar at desktop/mobile widths. At 1440 px, the measured logo-to-Services gap is about 143 px, the link-column step is about 211 px, and Social Media aligns with the footer’s right content edge.

Production Chrome repeated all checks with zero warnings, page errors or failed assets; all six previews advanced past 0.2 seconds. The development server, its workers and the temporary production server were stopped, and ports 3000/3100 are closed. Browser screenshots and reports are under ignored `.local/rebrand-*`.
