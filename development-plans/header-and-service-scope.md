# Header design and IT service scope

Updated October 24, 2026.

## Selected design

The header uses a compact brand row with a left-aligned wordmark and seven visible desktop links grouped inside a dark-green navigation shelf. A light sage current-page surface and full-label underline identify the active destination. Nested Blog and Case Studies routes retain their parent selection. The main row uses a forest-green gradient, the inverse wordmark and a darker navigation shelf. A soft-sage utility strip separates contact destinations from primary navigation. The mobile panel uses coordinated sage surfaces, with separate focus colors for dark and light backgrounds. The consultation text remains permanently linked to /contact; there is no large header call-to-action or pointer arrow.

On smaller screens, a visible Menu label accompanies its icon. The same seven destinations open in one scrollable panel, with optional configured phone, WhatsApp and email links below them. The panel closes on selection, Escape, an outside pointer interaction, focus leaving the header, history navigation or transition to desktop size. Escape returns focus to the menu button. This is a nonmodal disclosure, so the surrounding page remains available. Event listeners are installed only while open and cleaned up afterward.

The closed header measures 117 px on mobile and 125 px on desktop with current settings. The header now follows normal document flow and scrolls out of view. Shared and section-specific fragment offsets are 1.5 rem because a sticky-header allowance is no longer needed. Existing section-specific margins and reduced-motion-aware smooth scrolling remain available. Header transitions affect colors only.

## Research and rationale

The [NN/g menu-design checklist](https://www.nngroup.com/articles/menu-design/) informed the visible desktop choices, familiar logo placement, readable labels and clear current location. Its [mobile discoverability research](https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/) supports a labelled menu control. The compact public navigation at [Linear](https://linear.app/) supplied visual inspiration for grouping navigation and keeping secondary actions separate. These are design influences; the implementation uses this project's existing wordmark, colors and components.

## Removed offering

Server & Hardware Solutions is removed from IT Solutions and the contact form. IT now contains Cloud Solutions, Cybersecurity Solutions and Network Infrastructure. The contact API rejects hardware and other unsupported service values. About capabilities, the FAQ, portfolio copy, technology carousel and manufacturing case-study service copy now describe the retained software/cloud/network scope. The 31 blog entries contain no dedicated hardware offering, so no unrelated article was removed. Technical web-server validation and privacy disclosures about server logs remain accurate software/operational content.

Dell, HP and Lenovo promotional cards, their public configuration keys, template values and three unreferenced SVG logos were removed. The unused hardware-partner component was deleted after checking imports. Existing ignored environment values and private database records were preserved. Public assets now total 75 files / 13.97 MiB. No dependency or schema change was needed. Existing imported database drafts remain operator-managed; review their service wording and cover choices before publication.

## Verification

Chrome checks passed ten routes and widths 320, 390, 640, 768, 1024, 1280 and 1440 px without overflow. Checks include the seven destinations, full-label active underline, nested Blog state, fixed consultation destination, mobile keyboard navigation, focus restoration, outside-click dismissal, link dismissal, resize reset and a scrollable short-screen panel. IT displays exactly three cards, the contact dropdown excludes hardware, and the API rejects the retired value with HTTP 400. No page errors or image/hydration warnings occurred. Evidence is stored in ignored .local/header-hardware-verification.json and .local/header-redesign-*.png. Final quality and scroll-regression results are recorded in AGENTS.md.

Final npm run check passed all 24 tests plus formatting, lint, types, Prisma and 75 asset hashes. The production build and git diff --check passed. All 28 section-scroll regression combinations passed with the redesigned header, including reduced-motion preferences. The existing development server remains running at http://localhost:3000. No real inquiry, database migration, email, deployment, commit or push was performed.
