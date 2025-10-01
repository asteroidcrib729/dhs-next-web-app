"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CaseCtudy() {
    return (
        <section className="bg-black w-full py-20 px-6">
            <h2 className="text-gray-400 text-3xl font-bold text-center mb-12">
                Insights & Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gray-800 border-0 border-t-blue-600 border-b-blue-600 border-t-12 border-b-12">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            How We Increased Conversions by 300%
                        </h3>
                        <p className="text-white mb-4">
                            Discover our proven approach to scaling e-commerce with performance-driven campaigns.
                        </p>
                        <Link href="/case-studies/conversions" className="text-blue-600 hover:underline">
                            Read More →
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-0 border-t-blue-600 border-b-blue-600 border-t-12 border-b-12">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            AI in Marketing: The Future is Now
                        </h3>
                        <p className="text-white mb-4">
                            Learn how businesses can leverage AI to optimize customer acquisition and retention.
                        </p>
                        <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                            Read More →
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-0 border-t-blue-600 border-b-blue-600 border-t-12 border-b-12">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            AI in Marketing: The Future is Now
                        </h3>
                        <p className="text-white mb-4">
                            Learn how businesses can leverage AI to optimize customer acquisition and retention.
                        </p>
                        <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                            Read More →
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-0 border-t-blue-600 border-b-blue-600 border-t-12 border-b-12">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            AI in Marketing: The Future is Now
                        </h3>
                        <p className="text-white mb-4">
                            Learn how businesses can leverage AI to optimize customer acquisition and retention.
                        </p>
                        <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                            Read More →
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-0 border-t-blue-600 border-b-blue-600 border-t-12 border-b-12">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            AI in Marketing: The Future is Now
                        </h3>
                        <p className="text-white mb-4">
                            Learn how businesses can leverage AI to optimize customer acquisition and retention.
                        </p>
                        <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                            Read More →
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-0 border-t-blue-600 border-b-blue-600 border-t-12 border-b-12">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            AI in Marketing: The Future is Now
                        </h3>
                        <p className="text-white mb-4">
                            Learn how businesses can leverage AI to optimize customer acquisition and retention.
                        </p>
                        <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                            Read More →
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section >
    );
}