"use client";

import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

interface FaqProps {
    title?: string;
    faqs?: FaqItem[];
}

/** Single row with accessible toggle, animated plus/minus, and smooth content reveal */
function FaqRow({ item }: { item: FaqItem }) {
    const [open, setOpen] = useState(false);
    const qid = useId();
    const pid = `${qid}-panel`;

    return (
        <div>
            <button
                type="button"
                aria-controls={pid}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="group grid w-full grid-cols-[1fr_auto] items-start gap-3 text-left focus:outline-none"
            >
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-400">
                        {item.question}
                    </h3>
                    {/* The first item in your screenshot is open and shows a light paragraph under it */}
                    {open && (
                        <p className="mt-2 max-w-6xl text-sm sm:text-[0.95rem] leading-relaxed text-white">
                            {item.answer}
                        </p>
                    )}
                </div>

                {/* Plus/Minus Icon */}
                <span
                    className="relative mt-1 h-5 w-5 shrink-0 rounded-md text-slate-300 transition-colors
                     group-hover:text-slate-100"
                    aria-hidden="true"
                >
                    {/* horizontal bar */}
                    <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current rounded" />
                    {/* vertical bar (scales to 0 when open) */}
                    <span
                        className={`absolute left-1/2 top-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current rounded transition-transform duration-200 ${open ? "scale-y-0" : "h-4 scale-y-100"
                            }`}
                        style={{ height: open ? "0px" : "16px" }}
                    />
                </span>
            </button>

            <div
                id={pid}
                role="region"
                aria-labelledby={qid}
                className="sr-only"
            />
        </div>
    );
}

const DEFAULT_FAQS: FaqItem[] = [
    {
        question: "What are the main services you offer?",
        answer:
            "We provide a complete range of business solutions, focusing on three core areas: Digital Marketing, Web Development, and IT Infrastructure.",
    },
    {
        question: "What makes your company a reliable partner?",
        answer:
            "We pride ourselves on our deep Market Knowledge, ensuring all our campaigns are Compliance Ready with international regulations, and providing dedicated 24/7 Support aligned with your business hours.",
    },
    {
        question: "Are you certified or partnered with any major tech companies?",
        answer: "Yes, we are official partners with leading platforms, including Meta (Business Partner), Google (Premier Partner), Google Cloud, TikTok (Marketing Partner), Shopify, HubSpot, and AWS (Select Tier). We are also a Top Rated company on Clutch.",
    },
    {
        question: "What specific digital marketing services do you provide?",
        answer: "We offer a comprehensive suite of digital marketing services, including Search Engine Optimization (SEO), Pay-Per-Click (PPC) Management, Social Media Marketing, and Email Marketing.",
    },
    {
        question: "What is included in your SEO service?",
        answer: "Our SEO service includes technical SEO audits, keyword research, on-page optimization, link building campaigns, local SEO, and detailed analytics and reporting.",
    },
    {
        question: "Do you manage advertising on platforms like Google and social media?",
        answer: "Absolutely. Our PPC Management service includes Google Ads Management, Bing Ads Optimization, and Social Media Advertising to maximize your return on investment.",
    },
    {
        question: "Can you build a custom website for my business?",
        answer: "Yes, we specialize in Custom Web Development. Our service includes everything from CMS integration and database design to performance optimization and security implementation. The starting price is $5,000.",
    },
    {
        question: "Do you create online stores?",
        answer: "Yes, we offer complete E-commerce Solutions, which include platform setup, payment gateway integration, inventory management, and mobile optimization. Our e-commerce packages start at $8,000.",
    },
    {
        question: "Do you develop mobile applications?",
        answer: "Yes, we develop native and cross-platform mobile apps for both iOS and Android. Our service covers UI/UX design, development, app store optimization, and ongoing maintenance. Mobile app projects start at $15,000.",
    },
    {
        question: "What platforms are included in your mobile app development service?",
        answer: "We cover the entire mobile ecosystem, offering iOS App Development, Android App Development, and Cross-Platform Solutions to ensure your app reaches the widest possible audience.",
    },
    {
        question: "What kind of IT infrastructure solutions do you offer?",
        answer: "We offer a range of enterprise-grade IT solutions, including Cloud Solutions, Cybersecurity Solutions, Network Infrastructure, and Server & Hardware Solutions.",
    },
    {
        question: "Can you help my business with cybersecurity?",
        answer: "Yes, our Cybersecurity Solutions are designed to protect your business with services like network security assessment, firewall configuration, endpoint protection, and incident response. This service starts at $2,000/month.",
    },
    {
        question: "What is included in your Cloud Solutions package?",
        answer: "Our Cloud Solutions help you migrate and optimize your infrastructure. The service includes cloud migration strategy, VMware virtualization, hybrid cloud setup, cloud security, and 24/7 monitoring and support. Pricing is customized based on your requirements.",
    },
    {
        question: "What hardware brands do you work with?",
        answer: "We partner with industry-leading brands to provide premium hardware. Our partners include Dell, HP, Lenovo, H3C, and Sangfor for servers, workstations, storage, and networking equipment.",
    },
    {
        question: "Do you offer support for setting up a network?",
        answer: "Yes, our Network Infrastructure service covers everything from network design and planning to H3C equipment installation, network optimization, and ongoing maintenance and support.",
    },
    {
        question: "How do you tailor a strategy to my business?",
        answer: "During our Discovery & Analysis phase, we dive deep into your specific business needs, goals, and objectives. This allows us to create a comprehensive, customized strategy that is perfectly aligned with your vision.",
    },
    {
        question: "Will I be kept informed during the project?",
        answer: "Definitely. During the Implementation phase of our process, we focus on executing the strategy with precision while keeping you informed throughout the entire process.",
    },
    {
        question: "What happens after my project is launched?",
        answer: "Our work doesn't stop at launch. The final phase of our process is Optimization & Growth, where we continuously monitor, analyze, and optimize to ensure you achieve maximum ROI and sustained growth.",
    },
];

export default function Faq({
    title = "Frequently Asked Questions",
    faqs = DEFAULT_FAQS,
}: FaqProps) {
    return (
        <section id="faq-section" className="py-0">
            <div className="w-full bg-black text-slate-100">
                <div className="p-4 sm:p-8 lg:p-12 xl:p-16">
                    <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-8 sm:mb-10 lg:mb-12">
                        {title}
                    </h2>

                    <ul role="list" className="divide-y divide-white/10">
                        {faqs.map((item, i) => (
                            <li key={i} className="py-4 sm:py-5 lg:py-6">
                                <FaqRow item={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}