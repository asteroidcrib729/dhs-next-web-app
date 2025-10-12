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
                        <p className="mt-2 max-w-3xl text-sm sm:text-[0.95rem] leading-relaxed text-white">
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
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "How do you make holy water?",
        answer:
            "You boil the hell out of it. (Yes, really.)",
    },
    {
        question: "What do you call someone with no body and no nose?",
        answer: "Nobody knows.",
    },
    {
        question: "Why do you never see elephants hiding in trees?",
        answer: "Because they're so good at it.",
    },
    {
        question: "Why can't you hear a pterodactyl go to the bathroom?",
        answer: "Because the 'P' is silent.",
    },
    {
        question: "Why did the invisible man turn down the job offer?",
        answer: "He couldn't see himself doing it.",
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