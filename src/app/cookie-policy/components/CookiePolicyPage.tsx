import LegalShell from "@/components/LegalShell";

export default function CookiePolicyPage() {
  const toc = [
    { id: "what", label: "What Are Cookies?" },
    { id: "types", label: "Types We Use" },
    { id: "manage", label: "Managing Cookies" },
    { id: "third", label: "Third-Party Cookies" },
    { id: "updates", label: "Updates" },
  ];

  return (
    <>
      <LegalShell title="Cookie Policy" toc={toc}>
        <h2 id="what" className="text-[20px] md:text-[32px] font-bold underline">
          What Are Cookies?
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            Small files stored on your device that remember settings and help us understand how you
            use our site.
          </p>
        </li>

        <h2 id="types" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Types We Use
        </h2>
        <ul className="list-disc ml-4 leading-[2.0]">
          <li>
            <p className="text-[16px]">
              <strong>Essential:</strong> Security, load balancing, core features.
            </p>
          </li>
          <li>
            <p className="text-[16px]">
              <strong>Analytics:</strong> Aggregated usage insights to improve UX.
            </p>
          </li>
          <li>
            <p className="text-[16px]">
              <strong>Preference:</strong> Remembers choices (e.g., forms, language).
            </p>
          </li>
        </ul>

        <h2 id="manage" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Managing Cookies
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            You can block or delete cookies in your browser. Some features may not function properly
            without essential cookies.
          </p>
        </li>

        <h2 id="third" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Third-Party Cookies
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            Analytics and embedded tools may set their own cookies, governed by their policies.
          </p>
        </li>

        <h2 id="updates" className="text-[20px] md:text-[32px] font-bold underline mt-8">
          Updates
        </h2>
        <li className="list-disc ml-4 leading-[2.0]">
          <p className="text-[16px]">
            We may revise this policy as services or regulations change. The effective date reflects
            the latest version.
          </p>
        </li>
      </LegalShell>
    </>
  );
}
