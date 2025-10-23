"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="relative bg-gradient-to-r from-slate-500 to-slate-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-start lg:gap-8">

                    {/* Logo with glow */}
                    <div className="flex justify-center text-teal-600 dark:text-teal-300">
                        <Image
                            src="/tvs-logo.png"
                            alt="TVS logo"
                            width={200}
                            height={200}
                            className="drop-shadow-[0_4px_12px_rgba(0,255,255,0.35)]"
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 text-center md:text-left">
                        <div className="col-span-2">
                            <div>
                                <h2 className="text-2xl font-bold">Get the latest news!</h2>

                                <p className="mt-4 text-gray-300">
                                    Subscribe to our newsletter to stay updated on our latest services and offers.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                            <form className="w-full">
                                <label htmlFor="UserEmail" className="sr-only"> Email </label>

                                <div className="border border-gray-700 p-2 sm:flex sm:items-center sm:gap-4 rounded-lg bg-slate-800/60">
                                    <input
                                        type="email"
                                        id="UserEmail"
                                        placeholder="Enter Your Email"
                                        className="w-full p-2 mb-2 md:mb-0 bg-transparent text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500"
                                    />

                                    <Button asChild
                                        className="w-full bg-teal-500 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase rounded-lg hover:bg-teal-600 transition sm:w-auto sm:shrink-0"
                                    >
                                        <Link href="/#">Sign Up</Link>
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Services */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium">Services</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link href="/services#service-section" className="hover:text-teal-400 transition">Digital Marketing</Link></li>
                                <li><Link href="/services#service-section" className="hover:text-teal-400 transition">Web Development</Link></li>
                                <li><Link href="/services#service-section" className="hover:text-teal-400 transition">IT Solutions</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium">Company</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link href="/about" className="hover:text-teal-400 transition">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-teal-400 transition">Contact Us</Link></li>
                                <li><Link href="/portfolio" className="hover:text-teal-400 transition">Our Portfolio</Link></li>
                            </ul>
                        </div>

                        {/* Helpful Links */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium">Helpful Links</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link href="/contact" className="hover:text-teal-400 transition">Contact Us</Link></li>
                                <li><Link href="/blog" className="hover:text-teal-400 transition">Our Blog</Link></li>
                                <li><Link href="/#faq-section" className="hover:text-teal-400 transition">FAQs</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium">Legal</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link href="/terms-and-conditions" className="hover:text-teal-400 transition">Terms & Conditions</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
                                <li><Link href="/cookie-policy" className="hover:text-teal-400 transition">Cookie Policy</Link></li>
                            </ul>
                        </div>

                        {/* Downloads */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium">Downloads</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li><Link href="/case-studies" className="hover:text-teal-400 transition">Case Studies</Link></li>
                                <li><Link href="/#" className="hover:text-teal-400 transition">Marketing Calendar</Link></li>
                                <li><Link href="/#" className="hover:text-teal-400 transition">SEO Infographics</Link></li>
                            </ul>
                        </div>

                        {/* Socials */}
                        <ul className="col-span-2 flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-6 lg:col-span-5 lg:justify-end">
                            <li><Link href="https://www.facebook.com/share/16YinjskGp/?mibextid=wwXIfr" target="_blank" className="hover:text-teal-400 transition">Facebook</Link></li>
                            <li><Link href="https://www.instagram.com/techventuressystem/" target="_blank" className="hover:text-teal-400 transition">Instagram</Link></li>
                            <li><Link href="https://pk.linkedin.com/company/techventuresolution" target="_blank" className="hover:text-teal-400 transition">LinkedIn</Link></li>
                            {/* <li><Link href="/#" target="_blank" className="hover:text-teal-400 transition">GitHub</Link></li> */}
                            {/* <li><Link href="/#" target="_blank" className="hover:text-teal-400 transition">Dribbble</Link></li> */}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-8">
                    <div className="sm:flex sm:justify-between">
                        <p className="text-xs text-center md:text-left text-gray-400">
                            &copy; 2025. Tech Ventures System Pvt. Ltd. All rights reserved.
                        </p>
                        <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs sm:mt-0 md:justify-end">
                            <li><Link href="/terms-and-conditions" className="hover:text-teal-400 transition">Terms & Conditions</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-teal-400 transition">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
