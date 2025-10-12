"use client";

type Testimonial = {
    rating: number;     // number of stars
    quote: string;      // testimonial text
    name: string;       // author
    role: string;       // author role
};

const data: Testimonial[] = [
    {
        rating: 5,
        quote:
            '“Tech Venture Solutions transformed our online presence. Our website traffic increased by 300% in just 6 months.”',
        name: "Sarah Johnson",
        role: "CEO, TechStart Inc.",
    },
    {
        rating: 5,
        quote:
            "“Their IT infrastructure solutions saved us 40% on operational costs while improving our system reliability significantly.”",
        name: "Michael Chen",
        role: "IT Director, Global Manufacturing",
    },
    {
        rating: 5,
        quote:
            "“The PPC campaigns they managed generated a 400% ROI. Their team is professional, responsive, and delivers results.”",
        name: "Emily Rodriguez",
        role: "Marketing Manager, E-commerce Plus",
    },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex items-center gap-1 text-amber-400" aria-label={`${count} out of 5 stars`}>
            {Array.from({ length: count }).map((_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.967 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.348a1 1 0 00-1.175 0l-3.935 2.865c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L1.755 8.72c-.783-.57-.379-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section className="w-full bg-gray-50 px-6 py-20">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <h2 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                    What Our Clients Say
                </h2>

                {/* Cards */}
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {data.map((t, idx) => (
                        <article
                            key={idx}
                            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <Stars count={t.rating} />

                            <p className="mt-5 text-xl italic leading-8 text-slate-600 md:text-[22px]">
                                {t.quote}
                            </p>

                            <div className="mt-6">
                                <p className="text-lg font-semibold text-slate-900 md:text-xl">
                                    {t.name}
                                </p>
                                <p className="mt-1 text-slate-500">{t.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
