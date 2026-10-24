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
        id={qid}
        type="button"
        aria-controls={pid}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group grid w-full grid-cols-[1fr_auto] items-start gap-3 text-left"
      >
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">{item.question}</h3>
          {/* The first item in your screenshot is open and shows a light paragraph under it */}
          {open && (
            <p className="mt-2 max-w-6xl text-sm sm:text-[0.95rem] leading-relaxed text-foreground">
              {item.answer}
            </p>
          )}
        </div>

        {/* Plus/Minus Icon */}
        <span
          className="relative mt-1 h-5 w-5 shrink-0 rounded-md text-primary transition-colors
                     group-hover:text-foreground"
          aria-hidden="true"
        >
          {/* horizontal bar */}
          <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current rounded" />
          {/* vertical bar (scales to 0 when open) */}
          <span
            className={`absolute left-1/2 top-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current rounded transition-transform duration-200 ${
              open ? "scale-y-0" : "h-4 scale-y-100"
            }`}
            style={{ height: open ? "0px" : "16px" }}
          />
        </span>
      </button>

      <div id={pid} role="region" aria-labelledby={qid} className="sr-only" />
    </div>
  );
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "What does Digital Horizon Systems do?",
    answer:
      "We build websites and customized desktop applications, supported by technical SEO, permission-based email workflows and dependable IT infrastructure. Work can include cloud planning, network design and cybersecurity improvements.",
  },
  {
    question: "How do I get started?",
    answer:
      "Use the Contact page to describe your goals, services of interest and project requirements. We will review the inquiry and discuss the next steps with you. The consultation link in the header always opens that page.",
  },
  {
    question: "How is a project scoped and priced?",
    answer:
      "Scope, deliverables, fees and timelines are agreed in a written proposal. Website examples and package information are starting points for discussion. The agreed proposal defines the work we deliver.",
  },
  {
    question: "Can you improve an existing website?",
    answer:
      "Yes. We can review its design, content, accessibility, performance and technical foundations, then agree on a focused set of improvements.",
  },
  {
    question: "Which software and infrastructure platforms can you work with?",
    answer:
      "We work with established web, cloud and infrastructure technologies. The logos on this site identify platforms relevant to our work. Platform compatibility, licensing and support responsibilities are confirmed for each engagement.",
  },
  {
    question: "Are business results guaranteed?",
    answer:
      "No. Rankings, traffic, conversions and revenue depend on many factors. We agree on useful measures, report progress and refine the work using the available evidence.",
  },
  {
    question: "How will I hear about progress?",
    answer:
      "We agree on milestones, review points and communication channels during project planning. Clear feedback and timely approvals help the work move forward.",
  },
  {
    question: "What support is available after launch?",
    answer:
      "Maintenance, monitoring and support can be included in the proposal. Coverage hours, response targets and ongoing costs depend on the agreed support arrangement.",
  },
  {
    question: "What happens to information I send through the contact form?",
    answer:
      "We use it to review and respond to your inquiry and discuss requested services. Contact submissions do not subscribe you to a newsletter. The Privacy Policy explains the information we collect and your choices.",
  },
];

export default function Faq({
  title = "Frequently Asked Questions",
  faqs = DEFAULT_FAQS,
}: FaqProps) {
  return (
    <section id="faq-section" className="py-0">
      <div className="w-full bg-background text-foreground">
        <div className="p-4 sm:p-8 lg:p-12 xl:p-16">
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-8 sm:mb-10 lg:mb-12">
            {title}
          </h2>

          <ul role="list" className="divide-y divide-border">
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
