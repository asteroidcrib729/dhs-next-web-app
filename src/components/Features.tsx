"use client";

import { LineChart, Code2, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { Sparkles,  Megaphone, BarChart3, Target, Layout, Columns3, Monitor, Server, Cloud } from "lucide-react";

export default function Features() {
    return (
        <section className="bg-black w-full py-20 px-6">
            <h2 className="text-3xl font-bold text-gray-400 text-center mb-12">
                Complete Business Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-gray-800 shadow-lg shadow-[#2b47d9] border-0">
                    <CardContent className="p-6 text-center">
                        <LineChart className="w-10 h-10 mx-auto mb-4 text-blue-500" />
                        <h3 className="text-gray-400 font-semibold text-xl mb-2">Digital Marketing</h3>
                        <p className="text-white">
                            SEO, social media, and paid campaigns that deliver measurable results.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 shadow-lg shadow-[#2b47d9] border-0">
                    <CardContent className="p-6 text-center">
                        <Code2 className="w-10 h-10 mx-auto mb-4 text-green-500" />
                        <h3 className="text-gray-400 font-semibold text-xl mb-2">Web Development</h3>
                        <p className="text-white">
                            Custom websites and apps designed for performance and scalability.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 shadow-lg shadow-[#2b47d9] border-0">
                    <CardContent className="p-6 text-center">
                        <Network className="w-10 h-10 mx-auto mb-4 text-purple-500" />
                        <h3 className="text-gray-400 font-semibold text-xl mb-2">IT Infrastructure</h3>
                        <p className="text-white">
                            Secure, cloud-based infrastructure tailored to your business needs.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}