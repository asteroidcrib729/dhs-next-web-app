# Service and editorial content refresh

Updated October 23, 2026. This task changes the existing local project; it does not provision a database or deploy it.

## Offering and content

- Two service groups: Development & Marketing Solutions and IT Solutions. SEO and email workflows belong to the first group. Customized Desktop Solutions replaces mobile app development. Shared service data drives the page and contact choices, and the API rejects retired choices.
- Removed 20 posts in Digital Marketing, Content Marketing, PPC and Social Media. The remaining 25 summaries retain noindex until expanded and reviewed. Six original articles add three posts each in Web Development and Desktop Solutions.
- Replaced the H3C startup and restaurant cases with clearly labelled illustrative desktop-workflow and website/SEO/email scenarios. No new client identities, measured outcomes or growth percentages were invented. Former URLs resolve to their replacements; a configured database must publish those replacements before they are public. Four other legacy cases retain their existing unverified metrics and noindex state.
- Home insights read published articles rather than obsolete hardcoded links and render dynamically so studio publications appear without rebuilding the app.
- Public database reads hide retired categories and case slugs, while private drafts and history remain intact. The import command remains idempotent and preserves existing database entries.

## Components

The Contact form uses one Radix select system for Industry, Services and currency, with equal chevron padding and a quiet focus border. Currency retains exact string-based amount formatting. Phone validation supports local/international punctuation and extensions without a country-specific mask. This is syntax checking, not verification that a number exists. The fixed-height message field scrolls vertically and cannot be resized. Labels identify their controls.

About now uses a shared section component and structured content for story, direction, principles, four delivery stages and capabilities. The two landscape story/methodology images remain relevant. Team stays unimported. Print was removed from the shared legal shell, leaving Back to top on all three pages.

## Current image credits

All blog covers now use high-resolution landscape sources encoded locally to 1600 by 1067 WebP at quality 84. Photographs illustrate topics; they do not depict identified clients or completed engagements. The [Pexels license](https://www.pexels.com/license/) applies. Manifest entries retain source/download URLs, dimensions, encoding and hashes.

| Asset                                         | Photographer and source                                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `images/editorial/development-code.webp`      | [Daniil Komov](https://www.pexels.com/photo/modern-workspace-with-laptop-and-code-display-34804016/) |
| `images/editorial/desktop-workstation.webp`   | [Christina Morillo](https://www.pexels.com/photo/woman-sitting-while-operating-macbook-pro-1181676/) |
| `images/editorial/interface-design.webp`      | [Rodrigo Santos](https://www.pexels.com/photo/opened-program-for-working-online-on-laptop-3888149/)  |
| `images/editorial/data-center.webp`           | [Brett Sayles](https://www.pexels.com/photo/2881232/)                                                |
| `images/editorial/network-cabling.webp`       | [Brett Sayles](https://www.pexels.com/photo/cables-connected-on-server-2881229/)                     |
| `images/editorial/security-review.webp`       | [Tima Miroshnichenko](https://www.pexels.com/photo/close-up-view-of-system-hacking-5380642/)         |
| `images/editorial/online-commerce.webp`       | [Julio Lopez](https://www.pexels.com/photo/modern-online-shopping-with-mobile-payment-29502376/)     |
| `images/editorial/business-analysis.webp`     | [Lukas](https://www.pexels.com/photo/590016/)                                                        |
| `images/editorial/project-collaboration.webp` | [fauxels](https://www.pexels.com/photo/top-view-photo-of-people-near-wooden-table-3183150/)          |
| `images/editorial/order-logistics.webp`       | [Tiger Lily](https://www.pexels.com/photo/4483610/)                                                  |

Reference-scanned cleanup removed 44 superseded images. Current public inventory is 78 files / 13.97 MiB, under the 20 MiB budget. No source archive or secret file was touched.

## Local operation and verification

The owner explicitly requested that the development server remain running at handoff, superseding earlier stop-server preferences. Studio setup and daily publishing steps are in [the studio guide](editorial-studio.md). The local permanent database is still unconfigured; inquiry persistence and real editor login require operator setup.

Final validation passed: npm run check (22 tests plus formatting/lint/type/schema/asset gates), npm run build and git diff --check. Development Chrome verified ten public routes, sixteen responsive combinations, all requested form controls, 31 posts, seven categories, 20 removed-post 404s, two permanent replacement redirects, About organization and legal controls, with zero page errors or image warnings. Test inquiries were intercepted or rejected by unconfigured storage; no real message was stored or emailed. The local sitemap returns 16 URLs: ten site pages and six new articles. The existing project server remains running at http://localhost:3000.
