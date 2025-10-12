"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CaseCtudy() {
    const Blogs = [
        {
            name: "How We Increased Conversions by 300%",
            description: "Discover our proven approach to scaling e-commerce with performance-driven campaigns.",
            link: <Link href="/case-studies/conversions" className="text-blue-600 hover:underline">
                Read More →
            </Link>
        },
        {
            name: "AI in Marketing: The Future is Now",
            description: "Learn how businesses can leverage AI to optimize customer acquisition and retention.",
            link: <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                Read More →
            </Link>
        },
        {
            name: "AI in Marketing: The Future is Now",
            description: "Learn how businesses can leverage AI to optimize customer acquisition and retention.",
            link: <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                Read More →
            </Link>
        },
        {
            name: "AI in Marketing: The Future is Now",
            description: "Learn how businesses can leverage AI to optimize customer acquisition and retention.",
            link: <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                Read More →
            </Link>
        },
        {
            name: "AI in Marketing: The Future is Now",
            description: "Learn how businesses can leverage AI to optimize customer acquisition and retention.",
            link: <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                Read More →
            </Link>
        },
        {
            name: "AI in Marketing: The Future is Now",
            description: "Learn how businesses can leverage AI to optimize customer acquisition and retention.",
            link: <Link href="/blog/ai-marketing" className="text-blue-600 hover:underline">
                Read More →
            </Link>
        }
    ]

    return (
        <section className="bg-black w-full py-20 px-6">
            <h2 className="text-white text-3xl font-bold text-center mb-12">
                Insights & Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Blogs.map((Blog, index) => (
                    <Card key={index} className="bg-gray-800 border-blue-600 border-2 hover:scale-[103%] transition-transform duration-300">
                    <CardContent className="p-6">
                        <h3 className="text-gray-400 text-xl font-semibold mb-2">
                            {Blog.name}
                        </h3>
                        <p className="text-white mb-4">
                            {Blog.description}
                        </p>
                        {Blog.link}
                    </CardContent>
                </Card>    
                ))}
            </div>
        </section >
    );
}