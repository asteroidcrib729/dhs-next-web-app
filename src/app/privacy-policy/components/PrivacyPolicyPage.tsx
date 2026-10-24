import LegalShell from "@/components/LegalShell";
import Link from "next/link";
export default function PrivacyPolicyPage() {
  const toc = [
    { id: "collect", label: "Information You Share" },
    { id: "use", label: "How We Use Information" },
    { id: "share", label: "Service Providers" },
    { id: "security", label: "Security & Retention" },
    { id: "analytics", label: "Audience Measurement" },
    { id: "choices", label: "Your Choices" },
    { id: "transfers", label: "External Services" },
  ];
  return (
    <LegalShell title="Privacy Policy" policy="privacy" toc={toc}>
      <p>
        Digital Horizon Systems uses the information you choose to share to understand your
        requirements and respond to your requests. This notice explains the current website and
        inquiry process.
      </p>
      <h2 id="collect">Information You Share</h2>
      <p>
        The contact form asks for your first and last name, email address, services of interest,
        message and agreement to the terms. You may also provide a phone number, company, industry
        and budget. Please share only information relevant to your inquiry and avoid sending
        passwords, payment details or sensitive personal information.
      </p>
      <h2 id="use">How We Use Information</h2>
      <p>
        We use inquiry details to respond, prepare proposals, discuss requested services and
        maintain a record of that correspondence. Submitting the form does not enroll you in a
        newsletter or authorize unrelated marketing. If inquiry processing is unavailable, the form
        displays an error rather than confirming delivery.
      </p>
      <h2 id="share">Service Providers</h2>
      <p>
        Inquiry records are stored using the website’s configured database service. If email
        notifications are enabled, the configured email provider also processes inquiry details to
        notify the designated recipient. Hosting and security providers may process technical
        request information such as IP addresses, browser details and server logs to operate and
        protect the service. We do not sell inquiry data.
      </p>
      <h2 id="security">Security & Retention</h2>
      <p>
        The private editorial studio stores editor email addresses, password hashes, session records
        and technical sign-in information in our configured PostgreSQL database. Session records can
        include IP addresses and browser details for account security. Drafts, publication history
        and uploaded media support content management. Editor accounts are provisioned privately;
        personal editor names and emails are not published as article bylines. Passwords are not
        stored in plain text. Uploaded photographs and content must not contain confidential
        information or personal data without appropriate permission.
      </p>
      <p>
        We limit the information requested and use reasonable measures to protect it. No online
        system can guarantee absolute security. Inquiry records are kept for responding to requests,
        managing relevant business correspondence and meeting applicable obligations. This website
        does not automatically delete records on a fixed schedule. You can ask us to review whether
        information should be corrected or removed.
      </p>
      <h2 id="choices">Your Choices</h2>
      <p>
        You can request access, correction or deletion of information you have provided, subject to
        applicable obligations and verification of the request. Use the{" "}
        <Link href="/contact">Contact page</Link> to make a privacy request. If the form is
        unavailable, use any current contact channel published on the website.
      </p>
      <h2 id="analytics">Audience Measurement</h2>
      <p>
        Vercel Web Analytics measures visits and aggregate trends such as page popularity, referral
        sources, country and browser or device category. Vercel processes incoming requests and uses
        a short-lived hash to distinguish visits; it does not use analytics cookies. This site
        enables measurement by default. Query strings, URL fragments, studio routes, private
        previews and API routes are excluded from events sent by this application. We do not attach
        inquiry fields or editor accounts to analytics. These measures do not mean that hosting
        providers receive no technical request data. See{" "}
        <a href="https://vercel.com/docs/analytics/privacy-policy" rel="noopener noreferrer">
          Vercel’s analytics privacy information
        </a>{" "}
        for its processing details. You can disable future measurement for your browser using the{" "}
        <Link href="/cookie-policy#analytics-choice">
          analytics preference on our Cookie Policy
        </Link>
        . Changing that preference does not remove earlier measurements. Analytics retention and
        processing locations depend on the selected Vercel service and account settings.
      </p>
      <h2 id="transfers">External Services</h2>
      <p>
        Social, vendor and portfolio links take you to other services with their own privacy
        practices. Those services may process information when you choose to visit them. Hosting,
        database and email processing locations depend on the providers selected for the website.
        The <Link href="/cookie-policy">Cookie Policy</Link> explains the current use of browser
        storage. We will review this notice when our services or processing arrangements change.
      </p>
    </LegalShell>
  );
}
