import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPageMissionVision() {
    return (
        <>
            {/* Mission & Vision */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-l-12 border-l-[#0ea5e9] hover:scale-[103%] hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-900">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    To empower businesses with comprehensive digital marketing and IT solutions that drive sustainable
                                    growth, improve operational efficiency, and create lasting competitive advantages in an increasingly
                                    digital world.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-l-12 border-l-[#64748b] hover:scale-[103%] hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-900">Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    To be the leading provider of integrated digital marketing and IT solutions, recognized for our
                                    innovation, expertise, and unwavering commitment to client success across all industries and business
                                    sizes.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}