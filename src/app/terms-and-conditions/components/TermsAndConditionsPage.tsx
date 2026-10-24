import LegalShell from "@/components/LegalShell";
import Link from "next/link";
export default function TermsAndConditionsPage() {
  const toc = [
    { id: "agreement", label: "Using This Website" },
    { id: "services", label: "Projects & Proposals" },
    { id: "client", label: "Client Responsibilities" },
    { id: "ip", label: "Content & Intellectual Property" },
    { id: "confidentiality", label: "Confidentiality & Privacy" },
    { id: "liability", label: "Results & Availability" },
    { id: "termination", label: "Ending an Engagement" },
    { id: "law", label: "Applicable Terms & Questions" },
  ];
  return (
    <LegalShell title="Terms & Conditions" policy="terms" toc={toc}>
      <h2 id="agreement">Using This Website</h2>
      <p>
        These terms apply to the Digital Horizon Systems website. Use it lawfully and do not attempt
        to disrupt its operation, gain unauthorized access or submit harmful or misleading material.
        A contact inquiry starts a discussion and does not create a service contract.
      </p>
      <h2 id="services">Projects & Proposals</h2>
      <p>
        Services can include website and desktop development, SEO, email workflows and IT
        infrastructure. A written proposal or service agreement defines the scope, deliverables,
        fees, payment schedule, timelines and support arrangements for each engagement. Those agreed
        terms take precedence over general website descriptions. Changes to scope or schedule should
        be agreed in writing.
      </p>
      <h2 id="client">Client Responsibilities</h2>
      <p>
        Clients are responsible for providing accurate requirements, lawful content, appropriate
        access and timely feedback. Account credentials should be shared only through an agreed
        secure channel. Approval delays, incomplete information or third-party restrictions may
        affect delivery. Fees and expenses are payable according to the agreed proposal.
      </p>
      <h2 id="ip">Content & Intellectual Property</h2>
      <p>
        Blog articles and case studies provide general information. They are not individualized
        advice or guarantees of business, technical or search-ranking outcomes. Content can be
        corrected, updated or withdrawn. Authorized editors are responsible for verifying claims,
        obtaining publication and image permissions, and protecting their account credentials. The
        editorial studio is restricted to approved accounts; public registration is unavailable.
      </p>
      <p>
        Existing tools, methods, templates and other intellectual property remain with their
        respective owners. Ownership or licensing of project deliverables is defined in the relevant
        agreement. Third-party software, photographs and trademarks remain subject to their owners’
        rights and licenses. Stock imagery is illustrative; platform logos identify technologies and
        do not by themselves establish a certification, endorsement or partnership.
      </p>
      <h2 id="confidentiality">Confidentiality & Privacy</h2>
      <p>
        Information shared for an engagement should be used for its agreed purpose and protected as
        required by the service agreement. The <Link href="/privacy-policy">Privacy Policy</Link>{" "}
        explains website inquiry processing. Submitting an inquiry does not subscribe you to a
        newsletter. Please do not send confidential credentials or sensitive information through the
        general contact form.
      </p>
      <p>
        The site uses Vercel Web Analytics for audience measurement, enabled by default. The{" "}
        <Link href="/cookie-policy#analytics-choice">Cookie Policy analytics control</Link> lets you
        disable future measurement in your browser. The Privacy Policy explains related processing.
      </p>
      <h2 id="liability">Results & Availability</h2>
      <p>
        Website information is general and may change. We do not guarantee particular rankings,
        traffic, conversions, revenue or uninterrupted website availability. Examples and past
        results are not promises of future performance. Any service warranties, remedies and
        liability limits must be set out in the applicable agreement and remain subject to rights
        that cannot lawfully be excluded.
      </p>
      <h2 id="termination">Ending an Engagement</h2>
      <p>
        Cancellation, termination, outstanding fees and handover arrangements are governed by the
        relevant written agreement. Completed work and approved third-party commitments may remain
        payable under that agreement.
      </p>
      <h2 id="law">Applicable Terms & Questions</h2>
      <p>
        The applicable law and dispute arrangements for a service engagement should be specified in
        its written agreement, subject to mandatory rights and obligations. External websites have
        their own terms. For questions about this website or a proposed project, use the{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </LegalShell>
  );
}
