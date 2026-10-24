"use client";
import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import {
  analyticsPreferenceEvent,
  analyticsPreferenceKey,
  filterAnalyticsEvent,
} from "@/lib/analytics-preference";
let sessionDisabled = false;
function isDisabled() {
  try {
    return sessionDisabled || window.localStorage.getItem(analyticsPreferenceKey) === "true";
  } catch {
    return sessionDisabled;
  }
}
function snapshot() {
  return isDisabled() ? "disabled" : "enabled";
}
function serverSnapshot() {
  return "pending";
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(analyticsPreferenceEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(analyticsPreferenceEvent, callback);
  };
}
export function WebsiteAnalytics() {
  const preference = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const pathname = usePathname();
  if (preference !== "enabled" || /^\/(studio|api)(\/|$)/.test(pathname)) return null;
  return (
    <Analytics
      beforeSend={(event) =>
        filterAnalyticsEvent(
          event,
          isDisabled() || /^\/(studio|api)(\/|$)/.test(window.location.pathname),
        )
      }
    />
  );
}
export function AnalyticsControls() {
  const preference = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [notice, setNotice] = useState("");
  const enabled = preference === "enabled";
  return (
    <section
      id="analytics-choice"
      className="my-6 scroll-mt-6 rounded-xl border border-border bg-secondary p-6"
      aria-labelledby="analytics-choice-title"
    >
      <h3 id="analytics-choice-title" className="text-xl font-semibold">
        Your analytics preference
      </h3>
      <p className="mt-3">
        Anonymous audience measurement is enabled by default. You can turn it off for this browser
        at any time.
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={preference === "pending"}
        onClick={() => {
          const disabled = enabled;
          try {
            if (disabled) window.localStorage.setItem(analyticsPreferenceKey, "true");
            else window.localStorage.removeItem(analyticsPreferenceKey);
            sessionDisabled = false;
            setNotice("Your preference is saved for this browser.");
          } catch {
            sessionDisabled = disabled;
            setNotice(
              "Browser storage is blocked. Your choice applies to this tab until it is closed or reloaded.",
            );
          }
          window.dispatchEvent(new Event(analyticsPreferenceEvent));
        }}
        className={`mt-3 rounded-lg border px-5 py-3 font-semibold ${enabled ? "border-primary bg-primary text-white" : "border-border bg-white text-foreground"}`}
      >
        {preference === "pending" ? "Loading preference…" : `Analytics ${enabled ? "on" : "off"}`}
      </button>
      <p role="status" className="mt-3 text-sm text-muted-foreground">
        {notice || "This setting applies to this browser. Clearing site data restores the default."}
      </p>
    </section>
  );
}
