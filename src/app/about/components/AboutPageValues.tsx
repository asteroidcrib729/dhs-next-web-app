import { Users, Award, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPageValues() {
    const values = [
        {
            icon: Target,
            title: "Results-Driven",
            description:
                "We focus on delivering measurable results that directly impact your bottom line and business growth.",
        },
        {
            icon: Users,
            title: "Client-Centric",
            description:
                "Your success is our success. We build long-term partnerships based on trust and exceptional service.",
        },
        {
            icon: Award,
            title: "Excellence",
            description: "We maintain the highest standards in everything we do, from strategy to execution and support.",
        },
        {
            icon: Heart,
            title: "Integrity",
            description:
                "We operate with complete transparency and honesty, building relationships based on trust and reliability.",
        },
    ]

    return (
        <>
            {/* Values */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These values guide everything we do and shape how we work with our clients and each other.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="h-8 w-8 text-[#5B9BD5]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}