"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight, CheckCircle, Search, MousePointer, Share2, Mail, Code, Smartphone, ShoppingCart, Shield,
    Cloud, Server, Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicePageTabs() {
    const digitalMarketingServices = [
        {
            id: "service-section",
            icon: Search,
            title: "Search Engine Optimization (SEO)",
            description:
                "Improve your organic search rankings and drive qualified traffic to your website with our proven SEO strategies.",
            features: [
                "Technical SEO Audits",
                "Keyword Research & Strategy",
                "On-Page Optimization",
                "Link Building Campaigns",
                "Local SEO",
                "SEO Analytics & Reporting",
            ],
            pricing: "Starting at $2,500/month",
            results: "Average 150% increase in organic traffic",
        },
        {
            icon: MousePointer,
            title: "Pay-Per-Click (PPC) Management",
            description:
                "Maximize your ROI with expertly managed PPC campaigns across Google Ads, Bing, and social media platforms.",
            features: [
                "Google Ads Management",
                "Bing Ads Optimization",
                "Social Media Advertising",
                "Landing Page Optimization",
                "Conversion Tracking",
                "A/B Testing & Analytics",
            ],
            pricing: "Starting at $1,500/month + ad spend",
            results: "Average 300% ROI on ad spend",
        },
        {
            icon: Share2,
            title: "Social Media Marketing",
            description: "Build brand awareness and engage your audience across all major social media platforms.",
            features: [
                "Social Media Strategy",
                "Content Creation & Curation",
                "Community Management",
                "Influencer Partnerships",
                "Social Media Advertising",
                "Performance Analytics",
            ],
            pricing: "Starting at $1,200/month",
            results: "Average 250% increase in engagement",
        },
        {
            icon: Mail,
            title: "Email Marketing",
            description: "Nurture leads and retain customers with personalized email campaigns that drive conversions.",
            features: [
                "Email Campaign Design",
                "Marketing Automation",
                "List Segmentation",
                "A/B Testing",
                "Drip Campaigns",
                "Performance Tracking",
            ],
            pricing: "Starting at $800/month",
            results: "Average 400% ROI",
        },
    ]

    const webDevelopmentServices = [
        {
            id: "service-section",
            icon: Code,
            title: "Custom Web Development",
            description: "Build powerful, scalable websites and web applications tailored to your business needs.",
            features: [
                "Custom Website Development",
                "CMS Integration",
                "Database Design",
                "API Development",
                "Performance Optimization",
                "Security Implementation",
            ],
            pricing: "Starting at $5,000",
            results: "Average 200% improvement in site performance",
        },
        {
            icon: ShoppingCart,
            title: "E-commerce Solutions",
            description: "Create powerful online stores that drive sales and provide exceptional user experiences.",
            features: [
                "E-commerce Platform Setup",
                "Payment Gateway Integration",
                "Inventory Management",
                "Order Processing Systems",
                "Mobile Optimization",
                "Analytics & Reporting",
            ],
            pricing: "Starting at $8,000",
            results: "Average 180% increase in online sales",
        },
        {
            icon: Smartphone,
            title: "Mobile App Development",
            description: "Develop native and cross-platform mobile applications that engage users and drive business growth.",
            features: [
                "iOS App Development",
                "Android App Development",
                "Cross-Platform Solutions",
                "UI/UX Design",
                "App Store Optimization",
                "Maintenance & Support",
            ],
            pricing: "Starting at $15,000",
            results: "Average 4.5+ star app store ratings",
        },
    ]

    const itServices = [
        {
            id: "service-section",
            icon: Cloud,
            title: "Cloud Solutions",
            description: "Migrate to the cloud and optimize your infrastructure with our comprehensive cloud services.",
            features: [
                "Cloud Migration Strategy",
                "VMware Virtualization",
                "Hybrid Cloud Setup",
                "Cloud Security",
                "Backup & Disaster Recovery",
                "24/7 Monitoring & Support",
            ],
            pricing: "Custom pricing based on requirements",
            results: "Average 45% reduction in IT costs",
        },
        {
            icon: Shield,
            title: "Cybersecurity Solutions",
            description:
                "Protect your business with enterprise-grade security solutions from Sangfor and other leading providers.",
            features: [
                "Network Security Assessment",
                "Firewall Configuration",
                "Endpoint Protection",
                "Security Monitoring",
                "Compliance Management",
                "Incident Response",
            ],
            pricing: "Starting at $2,000/month",
            results: "99.9% threat detection rate",
        },
        {
            icon: Network,
            title: "Network Infrastructure",
            description: "Design and implement robust network infrastructure using H3C and other enterprise-grade equipment.",
            features: [
                "Network Design & Planning",
                "H3C Equipment Installation",
                "Network Optimization",
                "Redundancy & Failover",
                "Performance Monitoring",
                "Maintenance & Support",
            ],
            pricing: "Custom pricing based on scope",
            results: "99.95% network uptime guarantee",
        },
        {
            icon: Server,
            title: "Server & Hardware Solutions",
            description: "Deploy and manage enterprise servers and hardware from Dell, HP, Lenovo, and other trusted brands.",
            features: [
                "Server Configuration",
                "Hardware Procurement",
                "Installation & Setup",
                "Performance Optimization",
                "Maintenance Contracts",
                "Hardware Lifecycle Management",
            ],
            pricing: "Custom pricing based on requirements",
            results: "Average 99.9% server uptime",
        },
    ]

    return (
        <>
            {/* Services Tabs */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white" >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our comprehensive range of digital marketing and IT services, all designed to help your
                            business grow and succeed.
                        </p>
                    </div>

                    <Tabs defaultValue="digital-marketing" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12">
                            <TabsTrigger value="digital-marketing" className="text-gray-500 text-lg py-3">
                                Digital Marketing
                            </TabsTrigger>
                            <TabsTrigger value="web-development" className="text-gray-500 text-lg py-3">
                                Web Development
                            </TabsTrigger>
                            <TabsTrigger value="it-solutions" className="text-gray-500 text-lg py-3">
                                IT Solutions
                            </TabsTrigger>
                        </TabsList>

                        {/* Digital Marketing */}
                        <TabsContent value="digital-marketing" asChild>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {digitalMarketingServices.map((service, index) => (
                                    <Card id={service.id} key={index} className="flex flex-col hover:-translate-y-1 hover:shadow-xl transition transform bg-white rounded-xl">
                                        <CardHeader>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-3 bg-gray-100 rounded-lg">
                                                    <service.icon className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
                                            </div>
                                            <CardDescription className="text-gray-600">{service.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col flex-1">
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">What&#39;s Included:</h4>
                                                    <ul className="space-y-1">
                                                        {service.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t mt-auto">
                                                <div className="mb-4">
                                                    <div className="font-semibold text-gray-900">{service.pricing}</div>
                                                    <div className="text-sm text-green-600">{service.results}</div>
                                                </div>
                                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                                    <Link href="/contact">
                                                        Contact Us
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </motion.div>
                        </TabsContent>

                        {/* Web Development */}
                        <TabsContent value="web-development" asChild>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {webDevelopmentServices.map((service, index) => (
                                    <Card
                                        key={index}
                                        className="flex flex-col hover:-translate-y-1 hover:shadow-xl transition transform bg-white rounded-xl"
                                    >
                                        <CardHeader>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-3 bg-gray-100 rounded-lg">
                                                    <service.icon className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
                                            </div>
                                            <CardDescription className="text-gray-600">{service.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col flex-1">
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">What&#39;s Included:</h4>
                                                    <ul className="space-y-1">
                                                        {service.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t mt-auto">
                                                <div className="mb-4">
                                                    <div className="font-semibold text-gray-900">{service.pricing}</div>
                                                    <div className="text-sm text-green-600">{service.results}</div>
                                                </div>
                                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                                    <Link href="/contact">
                                                        Contact Us
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </motion.div>
                        </TabsContent>

                        {/* IT Solutions */}
                        <TabsContent value="it-solutions" asChild>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {itServices.map((service, index) => (
                                    <Card
                                        key={index}
                                        className="flex flex-col hover:-translate-y-1 hover:shadow-xl transition transform bg-white rounded-xl"
                                    >
                                        <CardHeader>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-3 bg-gray-100 rounded-lg">
                                                    <service.icon className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
                                            </div>
                                            <CardDescription className="text-gray-600">{service.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col flex-1">
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">What&#39;s Included:</h4>
                                                    <ul className="space-y-1">
                                                        {service.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t mt-auto">
                                                <div className="mb-4">
                                                    <div className="font-semibold text-gray-900">{service.pricing}</div>
                                                    <div className="text-sm text-green-600">{service.results}</div>
                                                </div>
                                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                                    <Link href="/contact">
                                                        Contact Us
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section >
        </>
    );
}