export default function PortfolioPageTop() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* subtle decorative gradient blobs */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl" />
                    <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl">
                        Work We&#39;re Proud Of
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                        A curated selection of projects delivered by Tech Venture Solutions —
                        blending smart digital strategy with robust IT foundations.
                    </p>

                    {/* stat chips */}
                    <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
                        <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-sm text-slate-700 backdrop-blur">
                            500+ Projects
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-sm text-slate-700 backdrop-blur">
                            98% Satisfaction
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-sm text-slate-700 backdrop-blur">
                            Average 350% ROI
                        </span>
                    </div>
                </div>

                {/* hero gradient band to match your site */}
                <div className="h-2 w-full bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]" />
            </section>
        </>
    );
}