"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const section = backgroundRef.current?.closest("section");
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => setActive(visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    // Pause once at the start of a scroll and resume when it finishes. Native
    // scrollend avoids timers on supported browsers; the fallback only debounces.
    let scrollInProgress = false;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const supportsScrollEnd = "onscrollend" in document;
    const resumeAfterScroll = () => {
      scrollInProgress = false;
      setScrolling(false);
    };
    const pauseForScroll = () => {
      if (!scrollInProgress) {
        scrollInProgress = true;
        setScrolling(true);
      }
      if (!supportsScrollEnd) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(resumeAfterScroll, 180);
      }
    };
    document.addEventListener("scroll", pauseForScroll, { passive: true });
    document.addEventListener("scrollend", resumeAfterScroll);
    observer.observe(section);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      clearTimeout(scrollTimer);
      document.removeEventListener("scroll", pauseForScroll);
      document.removeEventListener("scrollend", resumeAfterScroll);
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <>
      <div
        ref={backgroundRef}
        id="hero-background"
        className="hero-background"
        data-running={active && !paused && !scrolling}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="hero-signal">
            <span className="hero-signal-pulse" />
          </div>
        ))}
      </div>
      <button
        type="button"
        hidden={!active && !paused}
        className="hero-motion-toggle"
        aria-controls="hero-background"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        <span>{paused ? "Resume hero animation" : "Pause hero animation"}</span>
      </button>
    </>
  );
}
