export default function ScrollToId(id: string, offsetPx = 112) {
    const el = document.getElementById(id);
    if (!el) return;

    // If your page scrolls in a custom container, replace `window` with that element.
    const y = el.getBoundingClientRect().top + window.pageYOffset - offsetPx;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" });
}
