# Hero motion and normal header flow

Updated October 24, 2026.

## Header behavior

The global Header uses relative positioning and scrolls with the document. Its forest/sage palette, inverse logo, size, seven destinations, active states, consultation destination and mobile disclosure remain unchanged. Relative positioning anchors the existing mobile panel. Section offsets use 1.5 rem instead of a sticky-header allowance. Independently sticky content panels are unchanged.

## Replacing the first animation

The first candidate comparison considered [aurora](https://reactbits.dev/backgrounds/aurora), [particles](https://reactbits.dev/backgrounds/particles) and [waves](https://reactbits.dev/backgrounds/waves). The original CSS aurora/horizon implementation was rejected after the owner observed bottom-heavy movement and scrolling lag. Its earlier stationary frame-cadence sample did not measure scrolling or prove performance on the owner's device.

The replacement uses a static sage gradient and fine grid across the full hero, with eight short connection tracks distributed between 8% and 94% of its height. Each track has one small signal mark moving along it. This relates to the connected-systems brand without a dense particle simulation or large moving surfaces. The former moving radial gradients, elliptical horizon, 880 px orbit and orbit shadows have been removed.

Each animated mark is 20 by 3 px, inside a static 104 by 12 px track. Only transform and opacity animate, following [web.dev rendering guidance](https://web.dev/articles/animations-guide). There are no forced will-change hints, animated shadows or filters, per-frame JavaScript animation loops, cursor tracking, new packages, assets, canvas or video. Main hero copy stays server-rendered. A small client component handles observation and controls, with cleanup on unmount.

## Controls and fallback

Pause hero animation freezes every signal; Resume restores motion. The explicit selection survives visibility changes within the page visit. IntersectionObserver pauses offscreen motion, and document visibility events pause hidden tabs. Live reduced-motion changes remove the animations and hide the control. Without JavaScript, server-rendered copy and static decoration remain available, with the inactive control hidden. A passive scroll listener changes pause state once at the beginning of a scroll. Native [scrollend](https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollend_event) resumes the signals after the gesture finishes; older browsers use a 180 ms debounce. There are no per-scroll geometry reads or animation-frame updates. Manual pause continues to take priority. Listeners and fallback timers are removed on unmount. Pause controls follow [W3C user-control guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Practical Insights

The homepage selects up to three articles from the store's existing newest-first published list. Featured articles come first, followed by recent non-featured articles, preserving order within each group. The fallback catalogue currently has two featured articles, so the third slot now receives another complete published article. This does not change editorial flags or retrieve drafts. Empty or small published catalogues remain honest about available content; a configured database remains authoritative. The component stays on the server.

## Verification

The regression test covers the current two-featured catalogue, three unique complete articles, no-featured selection, fewer-than-three/empty lists and input-order preservation. Browser checks cover eight advancing bounded animations, pause/resume, scrolling, visibility, reduced motion, no-JavaScript rendering, four responsive widths and three working article links. A local four-times CPU-throttled synthetic scroll comparison measured main-thread task time of 2.95 s before and 2.05 s after, with style recalculation time of 0.185 s before and 0.066 s after. Median frame interval stayed 16.7 ms and p95 was approximately 33.3 ms in both runs; these measurements do not establish a frame-rate improvement. Layer inspection confirmed the two oversized moving surfaces were replaced with small signal/track layers. Evidence: ignored .local/hero-scroll-baseline.json, .local/hero-scroll-signals-final.json and .local/signal-hero-verification.json. Final quality checks are recorded in AGENTS.md. Local synthetic measurements are comparative evidence, not a performance guarantee for another device. No external data or email is written during checks. Leave localhost:3000 running.
