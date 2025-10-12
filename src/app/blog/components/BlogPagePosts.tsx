"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPagePosts() {
    const categories = [
        "All Posts",
        "Digital Marketing",
        "IT Solutions",
        "SEO",
        "PPC",
        "Social Media",
        "Cybersecurity",
        "E-commerce",
        "Content Marketing",
        "Network Infrastructure",
    ];

    const blogPosts = [
        // Digital Marketing (5)
        {
            id: 1,
            title: "The Complete Guide to Digital Marketing ROI in 2024",
            excerpt: "Learn how to measure and optimize your marketing ROI with proven strategies.",
            author: "Sarah Johnson",
            date: "December 15, 2024",
            readTime: "12 min read",
            category: "Digital Marketing",
            image: "/landscape-placeholder.svg",
            featured: true,
        },
        {
            id: 2,
            title: "5 Content Marketing Hacks for Better Engagement",
            excerpt: "Quick strategies to boost engagement across your digital channels.",
            author: "Mark Lee",
            date: "November 10, 2024",
            readTime: "7 min read",
            category: "Digital Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 3,
            title: "Email Marketing Automation Tools Compared",
            excerpt: "Which platforms provide the best automation for ROI?",
            author: "Rachel Green",
            date: "October 22, 2024",
            readTime: "9 min read",
            category: "Digital Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 4,
            title: "Measuring Brand Awareness with Analytics",
            excerpt: "Learn key metrics for tracking brand growth.",
            author: "David Lee",
            date: "October 8, 2024",
            readTime: "8 min read",
            category: "Digital Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 5,
            title: "Personalization Strategies for 2025",
            excerpt: "How personalization will drive customer loyalty.",
            author: "Sophia Patel",
            date: "September 30, 2024",
            readTime: "10 min read",
            category: "Digital Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // IT Solutions (5)
        {
            id: 6,
            title: "Why Your Business Needs a Cloud Migration Strategy in 2024",
            excerpt: "Benefits of cloud migration with cost savings and performance boosts.",
            author: "Michael Chen",
            date: "December 12, 2024",
            readTime: "8 min read",
            category: "IT Solutions",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 7,
            title: "Top 5 IT Solutions for Small Businesses",
            excerpt: "Affordable IT services that every SMB should adopt.",
            author: "Laura Davis",
            date: "November 20, 2024",
            readTime: "7 min read",
            category: "IT Solutions",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 8,
            title: "How AI is Transforming Enterprise IT",
            excerpt: "AI applications that improve system uptime and efficiency.",
            author: "Kevin White",
            date: "October 25, 2024",
            readTime: "10 min read",
            category: "IT Solutions",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 9,
            title: "Disaster Recovery Planning for 2025",
            excerpt: "A guide to keeping your business resilient.",
            author: "Maya Singh",
            date: "September 18, 2024",
            readTime: "6 min read",
            category: "IT Solutions",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 10,
            title: "Hybrid Cloud vs Multi-Cloud: Which One to Choose?",
            excerpt: "Exploring the key differences and benefits.",
            author: "Daniel Kim",
            date: "August 30, 2024",
            readTime: "9 min read",
            category: "IT Solutions",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // SEO (5)
        {
            id: 11,
            title: "SEO Trends That Will Dominate 2024: A Complete Analysis",
            excerpt: "Emerging SEO strategies for visibility in 2024.",
            author: "Emily Rodriguez",
            date: "December 10, 2024",
            readTime: "10 min read",
            category: "SEO",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 12,
            title: "On-Page SEO: A 2025 Checklist",
            excerpt: "Optimize titles, content, and speed for higher rankings.",
            author: "Chris Walker",
            date: "November 5, 2024",
            readTime: "8 min read",
            category: "SEO",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 13,
            title: "Backlink Building Strategies for Startups",
            excerpt: "Effective methods to grow your authority fast.",
            author: "Anna Lee",
            date: "October 14, 2024",
            readTime: "9 min read",
            category: "SEO",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 14,
            title: "Voice Search Optimization Guide",
            excerpt: "How to make your website voice-search friendly.",
            author: "Tom Hardy",
            date: "September 28, 2024",
            readTime: "7 min read",
            category: "SEO",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 15,
            title: "Local SEO Strategies for 2025",
            excerpt: "Techniques to dominate your local market.",
            author: "Priya Sharma",
            date: "August 15, 2024",
            readTime: "6 min read",
            category: "SEO",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // Cybersecurity (5)
        {
            id: 16,
            title: "Cybersecurity Best Practices for Small to Medium Businesses",
            excerpt: "Essential measures to keep your data secure.",
            author: "David Park",
            date: "December 8, 2024",
            readTime: "7 min read",
            category: "Cybersecurity",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 17,
            title: "Phishing Attacks: How to Recognize and Prevent Them",
            excerpt: "Training and tools to stay protected.",
            author: "Sophia Lee",
            date: "November 19, 2024",
            readTime: "6 min read",
            category: "Cybersecurity",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 18,
            title: "Zero Trust Security Explained",
            excerpt: "A new model for securing digital environments.",
            author: "Ethan Brown",
            date: "October 30, 2024",
            readTime: "8 min read",
            category: "Cybersecurity",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 19,
            title: "Top 10 Security Tools in 2025",
            excerpt: "Tools every IT manager should consider.",
            author: "Linda Carter",
            date: "September 12, 2024",
            readTime: "9 min read",
            category: "Cybersecurity",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 20,
            title: "How to Create a Strong Cybersecurity Policy",
            excerpt: "Best practices for policy building.",
            author: "Oliver White",
            date: "August 25, 2024",
            readTime: "10 min read",
            category: "Cybersecurity",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // PPC (5)
        {
            id: 21,
            title: "PPC Advertising: How to Maximize Your Ad Spend ROI",
            excerpt: "Advanced strategies for higher conversions.",
            author: "Lisa Wang",
            date: "December 5, 2024",
            readTime: "9 min read",
            category: "PPC",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 22,
            title: "Choosing the Right PPC Platform",
            excerpt: "Google Ads vs Bing Ads vs Social PPC.",
            author: "John Carter",
            date: "November 14, 2024",
            readTime: "7 min read",
            category: "PPC",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 23,
            title: "Retargeting Campaigns that Convert",
            excerpt: "Learn the science behind retargeting.",
            author: "Hannah Wilson",
            date: "October 22, 2024",
            readTime: "8 min read",
            category: "PPC",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 24,
            title: "A/B Testing Your Ads Effectively",
            excerpt: "Steps for testing copy and visuals.",
            author: "Daniel Clark",
            date: "September 16, 2024",
            readTime: "6 min read",
            category: "PPC",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 25,
            title: "Budgeting for PPC in 2025",
            excerpt: "How to allocate spend wisely.",
            author: "Nina Patel",
            date: "August 5, 2024",
            readTime: "9 min read",
            category: "PPC",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // Social Media (5)
        {
            id: 26,
            title: "Social Media Marketing Strategies That Actually Work in 2024",
            excerpt: "Build awareness and leads through proven tactics.",
            author: "Amanda Foster",
            date: "December 1, 2024",
            readTime: "6 min read",
            category: "Social Media",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 27,
            title: "Instagram Reels for Business",
            excerpt: "Maximize reach through short-form content.",
            author: "Brian Adams",
            date: "November 18, 2024",
            readTime: "7 min read",
            category: "Social Media",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 28,
            title: "LinkedIn Ads: Do They Work?",
            excerpt: "Testing the ROI of LinkedIn campaigns.",
            author: "Clara Jones",
            date: "October 10, 2024",
            readTime: "8 min read",
            category: "Social Media",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 29,
            title: "Building a TikTok Content Strategy",
            excerpt: "Steps to create viral content.",
            author: "Eric Thompson",
            date: "September 5, 2024",
            readTime: "9 min read",
            category: "Social Media",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 30,
            title: "How Social Media Affects SEO",
            excerpt: "The indirect benefits of social activity.",
            author: "Jasmine Wu",
            date: "August 1, 2024",
            readTime: "7 min read",
            category: "Social Media",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // E-commerce (5)
        {
            id: 31,
            title: "The Future of E-commerce: Trends and Technologies to Watch",
            excerpt: "Latest e-commerce technologies in 2025.",
            author: "James Thompson",
            date: "December 3, 2024",
            readTime: "11 min read",
            category: "E-commerce",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 32,
            title: "How to Build a Conversion-Focused Storefront",
            excerpt: "UI/UX principles for higher conversions.",
            author: "Alex Green",
            date: "November 8, 2024",
            readTime: "8 min read",
            category: "E-commerce",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 33,
            title: "E-commerce Logistics: What You Need to Know",
            excerpt: "Efficient shipping and warehousing tips.",
            author: "Monica Perez",
            date: "October 20, 2024",
            readTime: "9 min read",
            category: "E-commerce",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 34,
            title: "AI-Powered Personalization in Online Stores",
            excerpt: "Using AI for better product recommendations.",
            author: "Sam Carter",
            date: "September 14, 2024",
            readTime: "7 min read",
            category: "E-commerce",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 35,
            title: "Payment Gateways Compared",
            excerpt: "Stripe vs PayPal vs Square in 2025.",
            author: "Olivia King",
            date: "August 7, 2024",
            readTime: "8 min read",
            category: "E-commerce",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // Network Infrastructure (5)
        {
            id: 36,
            title: "Network Infrastructure Modernization: A Step-by-Step Guide",
            excerpt: "Modernizing networks with H3C technology.",
            author: "Robert Kim",
            date: "November 28, 2024",
            readTime: "13 min read",
            category: "Network Infrastructure",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 37,
            title: "5G and its Impact on Business Networks",
            excerpt: "Preparing networks for 5G adoption.",
            author: "Daniel Ross",
            date: "October 15, 2024",
            readTime: "9 min read",
            category: "Network Infrastructure",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 38,
            title: "Understanding SD-WAN",
            excerpt: "What is SD-WAN and why it matters.",
            author: "Holly Brown",
            date: "September 10, 2024",
            readTime: "8 min read",
            category: "Network Infrastructure",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 39,
            title: "Network Security Essentials in 2025",
            excerpt: "Steps to secure modern infrastructures.",
            author: "Ivan Petrov",
            date: "August 28, 2024",
            readTime: "10 min read",
            category: "Network Infrastructure",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 40,
            title: "The Role of Edge Computing in Networking",
            excerpt: "How edge computing supports low latency apps.",
            author: "Sophie Miller",
            date: "August 12, 2024",
            readTime: "9 min read",
            category: "Network Infrastructure",
            image: "/landscape-placeholder.svg",
            featured: false,
        },

        // Content Marketing (5)
        {
            id: 41,
            title: "Content Marketing ROI: How to Measure Success",
            excerpt: "Tracking ROI with data-driven insights.",
            author: "Jennifer Lee",
            date: "November 25, 2024",
            readTime: "8 min read",
            category: "Content Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 42,
            title: "Content Distribution Strategies in 2025",
            excerpt: "How to get your content in front of the right people.",
            author: "Richard Smith",
            date: "October 18, 2024",
            readTime: "9 min read",
            category: "Content Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 43,
            title: "Repurposing Content for Multiple Platforms",
            excerpt: "Maximize your reach with smart repurposing.",
            author: "Ella Brown",
            date: "September 22, 2024",
            readTime: "7 min read",
            category: "Content Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 44,
            title: "Storytelling in B2B Marketing",
            excerpt: "Why stories matter in enterprise communication.",
            author: "Chris Evans",
            date: "August 19, 2024",
            readTime: "10 min read",
            category: "Content Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
        {
            id: 45,
            title: "Top 10 Content Tools for 2025",
            excerpt: "Must-have tools for marketers.",
            author: "Natalie Green",
            date: "July 29, 2024",
            readTime: "8 min read",
            category: "Content Marketing",
            image: "/landscape-placeholder.svg",
            featured: false,
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("All Posts");

    const [visibleCount, setVisibleCount] = useState(5);

    const featuredPost = blogPosts.find((blogPost) => blogPost.featured);

    const categoryBlogs =
        selectedCategory === "All Posts"
            ? blogPosts
            : blogPosts.filter((blogPost) => blogPost.category === selectedCategory);

    const filteredBlogs = categoryBlogs.slice(0, visibleCount);

    return (
        <>
            {/* Featured Post */}
            {featuredPost && (
                <section className="py-8 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#64748b] text-white mb-4">Featured Article</Badge>
                            <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
                        </div>

                        <Card className="py-0 max-w-4xl mx-auto overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        width={800}
                                        height={400}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <Badge className="bg-[#e0f2fe] text-[#075985] mb-4">{featuredPost.category}</Badge>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            {featuredPost.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {featuredPost.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {featuredPost.readTime}
                                        </div>
                                    </div>
                                    <Button asChild className="bg-[#4A90A4] hover:bg-[#0369a1]">
                                        <Link href="#">
                                            Read Full Article
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Categories Filter */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                onClick={() => { setSelectedCategory(category); setVisibleCount(5); }}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                className={
                                    selectedCategory === category
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : ""
                                }
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="bg-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((post) => (
                                <Card key={post.id} className="pt-0 overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={800}
                                            height={800}
                                            className="w-full h-48 object-cover"
                                        />
                                        <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{post.category}</Badge>
                                    </div>

                                    <CardHeader>
                                        <CardTitle className="text-lg text-gray-900 hover:text-blue-600 transition-colors">
                                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">{post.excerpt}</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{post.date}</span>
                                            <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:underline">
                                                <Link href="#">
                                                    Read More
                                                    <ArrowRight className="ml-1 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                No blogs found for {selectedCategory}
                            </p>
                        )}
                    </div>

                    {visibleCount < categoryBlogs.length && (
                        <div className="text-center mt-12">
                            <Button onClick={() => setVisibleCount(prev => prev + 5)} variant="outline" size="lg">
                                Load More Articles
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}