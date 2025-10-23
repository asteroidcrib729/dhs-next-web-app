import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortfolioPageGrid() {
    const projects = [
        {
            id: 1,
            title: "ENG Properties",
            desc: "End-to-end ecommerce revamp with speed, UX, and CRO improvements for a nationwide F&B brand.",
            href: "https://eng-properties.com/",
            logo: "/eng-properties-latest-logo.png",
            width_class: "md:h-36",
            height_class: "md:w-72", 
        },
        {
            id: 2,
            title: "JSN Medical",
            desc: "HIPAA-aware site with gated content hub, marketing automation, and analytics.",
            href: "https://jsnmedical.com.au/",
            logo: "/jsn-medical-latest-logo.png",
            width_class: "md:h-32",
            height_class: "md:w-84", 
        },
        {
            id: 3,
            title: "Mission Health Care",
            desc: "Corporate site + resources library integrated with Sangfor stack and compliance notices.",
            href: "https://missionhealthcare.com.au/",
            logo: "/mission-healthcare-latest-logo.svg",
            width_class: "md:h-48",
            height_class: "md:w-84", 
        },
        {
            id: 4,
            title: "Nectronix",
            desc: "VMware/Dell infrastructure storytelling with calculators and case studies.",
            href: "https://nectronix.com/",
            logo: "/nectronix-digital-latest-logo.png",
            width_class: "md:h-30",
            height_class: "md:w-full",
        },
        {
            id: 5,
            title: "711 Max Bachat",
            desc: "High-converting PDP/PLP templates, SEO-ready architecture, and lightning search.",
            href: "https://711maxbachat.com/",
            logo: "/711-max-bachat-latest-logo.png",
            width_class: "md:h-40",
            height_class: "md:w-80",
        },
        {
            id: 6,
            title: "Sharz Properties",
            desc: "Feature-rich microsite with interactive diagrams and spec downloads.",
            href: "https://sharzproperties.com/",
            logo: "/sharz-properties-latest-logo.svg",
            width_class: "md:h-48",
            height_class: "md:w-96", 
        },
    ]

    return (
        <>
            {/* Projects Grid */}
            <section className="bg-gradient-to-b from-slate-50 to-white py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-8 flex items-end justify-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Featured Portfolio</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p) => (
                            <Card
                                key={p.id}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                                {/* subtle gradient border glow on hover */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/30 via-indigo-500/30 to-cyan-500/30 blur-[2px]" />
                                </div>

                                {/* shine sweep */}
                                <div className="pointer-events-none absolute -inset-1 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:translate-x-0 group-hover:opacity-100" />

                                <CardHeader className="px-5 pt-5 pb-0">
                                    <div className="flex flex-col justify-center items-center gap-3">
                                        <div className="grid h-48 w-full place-items-center rounded-xl border border-slate-200 bg-slate-400">
                                            <Image
                                                src={p.logo}
                                                alt={`${p.title} logo`}
                                                className={`${p.width_class} ${p.height_class} opacity-70`}
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                        <CardTitle className="text-lg text-slate-900">{p.title}</CardTitle>
                                    </div>
                                    {/* floating pill on hover 
                                    <div className="pointer-events-none absolute right-4 top-4 translate-y-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-700 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        Case Study
                                    </div>
                                    */}
                                </CardHeader>

                                <CardContent className="px-5">
                                    <CardDescription className="flex justify-center items-center leading-6 text-sm text-slate-600">
                                        {p.desc}
                                    </CardDescription>
                                </CardContent>

                                <CardFooter className="px-5 pb-5">
                                    <div className="flex flex-col items-center justify-center w-full">
                                        {/*<div className="text-xs text-slate-500">#{String(i + 1).padStart(2, "0")}</div>*/}

                                        {/* Button with link as child (shadcn) */}
                                        <Button asChild className="w-full rounded-full bg-blue-600">
                                            <Link
                                                href={p.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2"
                                            >
                                                Visit Website
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                                                >
                                                    <path d="M13.5 4.5a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v5.5a1 1 0 1 1-2 0V7.414l-8.293 8.293a1 1 0 0 1-1.414-1.414L17.586 6H14.5a1 1 0 0 1-1-1z" />
                                                    <path d="M5 6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6V7a1 1 0 0 0-1-1z" />
                                                </svg>
                                            </Link>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
