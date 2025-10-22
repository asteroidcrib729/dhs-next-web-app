"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems = [
        { href: "/services", label: "Services" },
        { href: "/case-studies", label: "Case Studies" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/portfolio", label: "Portfolio" },
    ];

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-slate-900 text-white text-sm py-2 px-6 hidden md:flex md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <Link className="hover:text-blue-400" href="tel:+92-300-1297101" aria-label="Call +92-300-1297101">
                            +92-300-1297101
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaWhatsapp size={16} />
                        <Link className="hover:text-blue-400" href="https://wa.me/923042204258?text=Hello%21%20I%27m%20interested%20in%20your%20service%2E" aria-label="WhatsApp +92-304-2204258" target="_blank">
                            +92-304-2204258
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={16} />
                        {/* fix: mailto */}
                        <Link className="hover:text-blue-400" href="mailto:info@techventuresolution.com">
                            info@techventuresolution.com
                        </Link>
                    </div>
                </div>
                <span className="hidden sm:block">Free Consultation Available</span>
            </div>

            {/* Main Navbar */}
            <nav
                className={[
                    "relative z-10 bg-white px-6 py-4 flex items-center justify-between transition-shadow",
                    scrolled ? "shadow-md" : "shadow-sm",
                ].join(" ")}
            >
                {/* Animated background layer */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                >
                    {/* soft top/bottom gradient to separate header from page */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-white to-white" />
                    {/* aurora blobs */}
                    <div className="aurora-layer" />
                </div>

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Image src="/tvs-logo.png" alt="Tech Venture Solution logo" width={90} height={90} priority />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-slate-700 font-medium">
                    {navItems.map((item) => (
                        <li key={item.href} className="relative">
                            <Link
                                className={[
                                    "inline-block px-1 py-1 hover:text-blue-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded",
                                    isActive(item.href) ? "text-blue-600" : "",
                                ].join(" ")}
                                href={item.href}
                            >
                                {item.label}
                                {/* animated underline */}
                                <span
                                    className={[
                                        "block h-[2px] bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 transition-[width] duration-300 ease-out",
                                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                                    ].join(" ")}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link
                    href="/contact"
                    className="hidden md:inline-flex items-center text-white px-5 py-2 rounded-full shadow active:translate-y-[1px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 sm:inline-flex bg-blue-600 hover:bg-blue-700"
                >
                    Get Free Quote
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded p-2"
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden bg-white text-black transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${mobileMenuOpen
                    ? "max-h-screen opacity-100 shadow px-6 py-4 space-y-4"
                    : "max-h-0 opacity-0"
                    }`}
            >
                {navItems.map((n) => (
                    <Link key={n.href} href={n.href} className="block py-1">
                        {n.label}
                    </Link>
                ))}

                <div className="flex items-center gap-2 pt-2">
                    <Phone size={16} />
                    <Link className="hover:text-blue-500" href="tel:+92-300-1297101">+92-300-1297101</Link>
                </div>
                <div className="flex items-center gap-2">
                    <FaWhatsapp size={16} />
                    <Link className="hover:text-blue-500" href="tel:+92-304-2204258">+92-304-2204258</Link>
                </div>
                <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <Link className="hover:text-blue-500" href="mailto:info@techventuresolution.com">
                        info@techventuresolution.com
                    </Link>
                </div>

                <Link
                    href="/quote"
                    className="block bg-blue-500 text-white text-center px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Get Free Quote
                </Link>
            </div>

            {/* Component-scoped animation styles */}
            <style jsx>{`
            /* Aurora background: two blurred radial gradients gently orbiting */
            .aurora-layer {
                position: absolute;
                inset: -20%;
                filter: blur(20px);       /* less blur */
                opacity: 0.5;             /* stronger */
                will-change: transform, opacity;
                background:
                    radial-gradient(180px 180px at 20% 30%, rgba(59,130,246,0.95), transparent 60%),
                    radial-gradient(200px 200px at 70% 40%, rgba(99,102,241,0.9), transparent 60%),
                    radial-gradient(180px 180px at 40% 80%, rgba(14,165,233,0.9), transparent 60%);
                animation: auroraShift 22s linear infinite;
            }

            @keyframes auroraShift {
                0%   { transform: translate3d(0%, 0%, 0) rotate(0deg); }
                25%  { transform: translate3d(3%, -2%, 0) rotate(30deg); }
                50%  { transform: translate3d(-2%, 2%, 0) rotate(60deg); }
                75%  { transform: translate3d(2%, 1%, 0) rotate(90deg); }
                100% { transform: translate3d(0%, 0%, 0) rotate(120deg); }
            }`}</style>
        </header>
    );
}
