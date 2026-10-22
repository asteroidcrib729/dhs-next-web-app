import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CaseStudiesPageGrid() {
  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Giant Achieves 400% ROI with Comprehensive Digital Strategy",
      client: "MegaStore Online",
      industry: "E-commerce",
      challenge: "Declining organic traffic and poor conversion rates",
      solution: "Complete SEO overhaul, PPC optimization, and conversion rate optimization",
      results: {
        roi: "400%",
        traffic: "250%",
        conversions: "180%",
        timeline: "6 months",
      },
      image: "/images/placeholders/landscape-placeholder.svg",
      services: ["SEO", "PPC", "CRO", "Analytics"],
      description:
        "MegaStore Online was struggling with declining organic visibility and poor conversion rates. Our comprehensive approach included technical SEO improvements, content strategy, and advanced PPC campaigns.",
    },
    {
      id: 2,
      title: "Manufacturing Company Reduces IT Costs by 45% with Cloud Migration",
      client: "Industrial Solutions Inc.",
      industry: "Manufacturing",
      challenge: "High IT infrastructure costs and system downtime",
      solution: "Complete cloud migration using VMware and Dell infrastructure",
      results: {
        roi: "300%",
        costSaving: "45%",
        uptime: "99.9%",
        timeline: "4 months",
      },
      image: "/images/placeholders/landscape-placeholder.svg",
      services: ["Cloud Migration", "VMware", "Dell Infrastructure", "24/7 Support"],
      description:
        "Industrial Solutions Inc. needed to modernize their IT infrastructure while reducing costs. We implemented a hybrid cloud solution that improved performance and reliability.",
    },
    {
      id: 3,
      title: "Healthcare Startup Generates 500+ Qualified Leads Monthly",
      client: "HealthTech Innovations",
      industry: "Healthcare Technology",
      challenge: "Low brand awareness and difficulty reaching target audience",
      solution: "Multi-channel digital marketing campaign with content marketing focus",
      results: {
        roi: "350%",
        leads: "500+/month",
        brandAwareness: "300%",
        timeline: "8 months",
      },
      image: "/images/placeholders/landscape-placeholder.svg",
      services: ["Content Marketing", "LinkedIn Ads", "SEO", "Email Marketing"],
      description:
        "HealthTech Innovations needed to establish thought leadership and generate qualified leads in a competitive market. Our content-driven approach positioned them as industry experts.",
    },
    {
      id: 4,
      title: "Financial Services Firm Enhances Security with Sangfor Solutions",
      client: "SecureFinance Corp",
      industry: "Financial Services",
      challenge: "Cybersecurity threats and compliance requirements",
      solution: "Implementation of Sangfor security solutions and network infrastructure",
      results: {
        roi: "250%",
        securityIncidents: "95% reduction",
        compliance: "100%",
        timeline: "3 months",
      },
      image: "/images/placeholders/landscape-placeholder.svg",
      services: ["Sangfor Security", "Network Infrastructure", "Compliance", "Monitoring"],
      description:
        "SecureFinance Corp required enterprise-grade security solutions to protect sensitive financial data and meet regulatory compliance standards.",
    },
    {
      id: 5,
      title: "Tech Startup Scales Infrastructure with H3C Network Solutions",
      client: "InnovateTech Solutions",
      industry: "Technology",
      challenge: "Rapid growth requiring scalable network infrastructure",
      solution: "H3C network equipment deployment with redundancy and monitoring",
      results: {
        roi: "280%",
        networkUptime: "99.95%",
        scalability: "500% capacity",
        timeline: "2 months",
      },
      image: "/images/placeholders/landscape-placeholder.svg",
      services: ["H3C Networking", "Infrastructure Design", "Monitoring", "Support"],
      description:
        "InnovateTech Solutions needed a robust network infrastructure that could scale with their rapid growth while maintaining high performance and reliability.",
    },
    {
      id: 6,
      title: "Restaurant Chain Increases Online Orders by 300% with Digital Marketing",
      client: "Gourmet Express",
      industry: "Food & Beverage",
      challenge: "Low online presence and declining foot traffic during pandemic",
      solution: "Comprehensive digital marketing strategy with focus on local SEO and social media",
      results: {
        roi: "450%",
        onlineOrders: "300%",
        socialEngagement: "400%",
        timeline: "5 months",
      },
      image: "/images/placeholders/landscape-placeholder.svg",
      services: ["Local SEO", "Social Media", "PPC", "Website Development"],
      description:
        "Gourmet Express needed to pivot to online ordering during the pandemic. Our digital strategy helped them not only survive but thrive in the new market conditions.",
    },
  ];

  return (
    <>
      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every project is unique, but our commitment to delivering exceptional results remains
              constant. Here are some of our most impactful success stories.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="pt-0 pb-6 overflow-hidden hover:shadow-2xl hover:scale-[101%] transition-all duration-300 bg-blue-400 border-none"
              >
                <div className="relative border-t-[8px] border-t-solid border-t-blue-400 overflow-hidden">
                  <Image
                    src={study.image || "/images/placeholders/landscape-placeholder.svg"}
                    alt={study.title}
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#4A90A4] text-white">{study.industry}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 mb-2">{study.title}</CardTitle>
                  <CardDescription className="text-gray-600">{study.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Services Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center bg-[#5fdcff] rounded-4xl py-2">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-2xl font-bold text-green-500">
                            {study.results.roi}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">ROI</div>
                      </div>
                      <div className="text-center bg-[#5fdcff] rounded-4xl py-2">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-2xl font-bold text-blue-500">
                            {study.results.timeline}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">Timeline</div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-transparent active:bg-white transition-colors duration-300 rounded-4xl"
                      variant="outline"
                      asChild
                    >
                      <Link href="/case-studies/#">
                        View Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
