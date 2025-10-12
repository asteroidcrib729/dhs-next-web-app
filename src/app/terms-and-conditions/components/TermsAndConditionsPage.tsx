import LegalShell from "@/components/LegalShell";

export default function TermsAndConditionsPage() {

    const toc = [
        { id: "agreement", label: "Agreement" },
        { id: "services", label: "Services" },
        { id: "client", label: "Client Responsibilities" },
        { id: "ip", label: "Intellectual Property" },
        { id: "confidentiality", label: "Confidentiality" },
        { id: "liability", label: "Warranties & Liability" },
        { id: "termination", label: "Termination" },
        { id: "law", label: "Governing Law" },
    ]

    return (
        <>
            <LegalShell title="Terms & Conditions" toc={toc}>

                <h2 id="agreement" className="text-[20px] md:text-[32px] font-bold underline">Agreement</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        By using our site or engaging Tech Venture Solutions (“TVS”), you accept these Terms. If you disagree, do not use the site or services.
                    </p>
                </li>

                <h2 id="services" className="text-[20px] md:text-[32px] font-bold underline mt-8">Services</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        Deliverables, timelines, and fees are defined in proposals/SOWs and take precedence over general website content.
                    </p>
                </li>

                <h2 id="client" className="text-[20px] md:text-[32px] font-bold underline mt-8">Client Responsibilities</h2>
                <ul className="list-disc ml-4 leading-[2.0]">
                    <li>
                        <p className="text-[16px]">
                            Provide timely info, account access, and approvals.
                        </p>
                    </li>
                    <li>
                        <p className="text-[16px]">
                            Ensure supplied content is accurate and lawful.
                        </p>
                    </li>
                    <li>
                        <p className="text-[16px]">
                            Pay invoices per agreed schedules.
                        </p>
                    </li>
                </ul>

                <h2 id="ip" className="text-[20px] md:text-[32px] font-bold underline mt-8">Intellectual Property</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        Pre-existing IP remains the owner&#39;s. Paid final deliverables are licensed to the client for business use unless agreed otherwise. Third-party licenses remain with their providers.
                    </p>
                </li>

                <h2 id="confidentiality" className="text-[20px] md:text-[32px] font-bold underline mt-8">Confidentiality</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        Non-public information must be protected and used only to fulfill the engagement.
                    </p>
                </li>

                <h2 id="liability" className="text-[20px] md:text-[32px] font-bold underline mt-8">Warranties & Liability</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        Services are “as is.” We do not guarantee rankings, traffic, or revenue. To the extent allowed by law, TVS is not liable for indirect or consequential losses.
                    </p>
                </li>

                <h2 id="termination" className="text-[20px] md:text-[32px] font-bold underline mt-8">Termination</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        Either party may terminate as stated in the SOW. Client remains liable for completed work and committed third-party costs.
                    </p>
                </li>

                <h2 id="law" className="text-[20px] md:text-[32px] font-bold underline mt-8">Governing Law</h2>
                <li className="list-disc ml-4 leading-[2.0]">
                    <p className="text-[16px]">
                        These Terms are governed by the laws of Pakistan. Disputes will be resolved in the courts of Karachi.
                    </p>
                </li>
            </LegalShell>
        </>
    );
}