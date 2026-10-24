export const analyticsPreferenceKey = "dhs-analytics-disabled";
export const analyticsPreferenceEvent = "dhs-analytics-preference";
export function filterAnalyticsEvent<T extends { url: string }>(
  event: T,
  disabled: boolean,
): T | null {
  if (disabled) return null;
  try {
    const url = new URL(event.url);
    if (/^\/(studio|api)(\/|$)/.test(url.pathname)) return null;
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}
