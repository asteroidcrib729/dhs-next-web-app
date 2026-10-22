import LegalShell from "@/components/LegalShell";

export default function PrivacyPolicyPage() {
  const toc = [
    { id: "collect", label: "What We Collect" },
    { id: "use", label: "How We Use It" },
    { id: "share", label: "Sharing" },
    { id: "security", label: "Security & Retention" },
    { id: "choices", label: "Your Choices" },
    { id: "transfers", label: "International Transfers" },
  ];

  return (
    <>
      <LegalShell title="Privacy Policy" toc={toc}>
        <h2 id="collect" className="text-[20px] md:text-[32px] font-bold underline">
          What We Collect
        </h2>
        <ul className="list-disc ml-4 leading-[2.0]">
          <li>
            <p className="text-[16px]">Contact details (name, email, phone, company).</p>
          </li>
          <li>
            <p className="text-[16px]">Usage data (pages viewed, device info, cookies).</p>
          </li>
          <li>
            <p className="text-[16px]">Project details shared for proposals or support.</p>
          </li>
        </ul>

        <h2 id="use" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          How We Use It
        </h2>
        <ul className="list-disc ml-4 leading-[2.0]">
          <li>
            <p className="text-[16px]">Provide proposals, deliver services, and support.</p>
          </li>
          <li>
            <p className="text-[16px]">Improve performance, security, and user experience.</p>
          </li>
          <li>
            <p className="text-[16px]">Send updates if you opt in (you can unsubscribe anytime).</p>
          </li>
        </ul>

        <h2 id="share" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Sharing
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            We don&#39;t sell personal data. We share with vetted processors (hosting, analytics,
            billing) under confidentiality/data-protection terms, and when required by law.
          </p>
        </li>

        <h2 id="security" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Security & Retention
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            We apply reasonable safeguards. Data is retained only as needed for the above purposes
            or legal obligations, then securely deleted or anonymized.
          </p>
        </li>

        <h2 id="choices" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Your Choices
        </h2>
        <ul className="list-disc ml-4 leading-[2.0]">
          <li>
            <p className="text-[16px]">Request access, correction, or deletion.</p>
          </li>
          <li>
            <p className="text-[16px]">Opt out of marketing emails.</p>
          </li>
          <li>
            <p className="text-[16px]">Control cookies in your browser.</p>
          </li>
        </ul>

        <h2 id="transfers" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          International Transfers
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            If data is processed outside your country, we use appropriate safeguards consistent with
            applicable laws.
          </p>
        </li>
      </LegalShell>
    </>
  );
}
