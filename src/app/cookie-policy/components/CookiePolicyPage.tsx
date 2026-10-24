import LegalShell from "@/components/LegalShell";
import Link from "next/link";
import { AnalyticsControls } from "@/components/AnalyticsPreferences";
export default function CookiePolicyPage() {
  const toc = [
    { id: "what", label: "Cookies & Browser Storage" },
    { id: "types", label: "Current Website" },
    { id: "manage", label: "Your Controls" },
    { id: "third", label: "External Services" },
    { id: "updates", label: "Policy Updates" },
  ];
  return (
    <LegalShell title="Cookie Policy" policy="cookies" toc={toc}>
      <p>
        This policy explains browser storage on the Digital Horizon Systems website. It should be
        read together with the <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <h2 id="what">Cookies & Browser Storage</h2>
      <p>
        Cookies are small pieces of information saved by a website in your browser. Similar
        technologies include local storage and session storage. They can support essential features,
        remember preferences or measure activity, depending on how a site is configured.
      </p>
      <h2 id="types">Current Website</h2>
      <p>
        We use Vercel Web Analytics to measure page views and aggregate audience trends. It is
        enabled by default and does not use analytics cookies. You can disable it below. We remove
        query strings and URL fragments before sending page views and exclude the editorial studio,
        private previews and API routes. We do not send contact-form fields or editor identities as
        analytics events. Portfolio previews and fonts are served from this website.
      </p>
      <p>
        The hosting platform may use necessary security or delivery cookies as part of operating the
        service. Their details depend on the hosting configuration. Authorized editors use a
        necessary, HTTP-only sign-in cookie with a session lifetime of up to seven days. Public
        visitors do not need an editorial account. We do not install advertising pixels or
        newsletter cookies.
      </p>
      <h2 id="manage">Your Controls</h2>
      <AnalyticsControls />
      <p>
        Turning analytics off prevents subsequent analytics events from this browser; it does not
        erase measurements already collected. We store only your opt-out in local storage under
        dhs-analytics-disabled. It has no scheduled expiry. Your choice is shared across tabs on the
        same origin. If storage is blocked, the control works for the current tab session. You can
        return here to enable analytics again. Clearing site data or using another browser resets
        the choice to the default. Browser and network blocking tools may also prevent measurement.
      </p>
      <p>
        Your browser settings let you inspect, block and delete cookies and site data. Blocking
        storage may affect features provided by a hosting or security service. Browser caching of
        images, fonts and video helps pages load efficiently and is separate from advertising
        tracking.
      </p>
      <h2 id="third">External Services</h2>
      <p>
        Social media, partner and portfolio destinations can use their own cookies after you choose
        to open those websites. Their policies and controls apply there. The current Contact page
        does not load an embedded map. Details of Vercel’s measurement are described in its{" "}
        <a href="https://vercel.com/docs/analytics/privacy-policy" rel="noopener noreferrer">
          Web Analytics privacy documentation
        </a>
        .
      </p>
      <h2 id="updates">Policy Updates</h2>
      <p>
        We review this policy when the site’s features, providers or browser-storage practices
        change. The effective and last reviewed dates are shown above. Questions can be sent through
        the <Link href="/contact">Contact page</Link>.
      </p>
    </LegalShell>
  );
}
