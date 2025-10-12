import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicePageTop() {
    return (
        <>
            {/* Hero Section */}
            < section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#1e293b] py-20" >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Complete Digital Solutions for Your Business</h1>
                        <p className="text-xl text-blue-100 mb-8">
                            From digital marketing that drives growth to IT infrastructure that powers your operations, we provide
                            comprehensive solutions that help businesses thrive in the digital age.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 cursor-pointer">
                                <Link href="/contact">
                                    Get Free Consultation
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-black hover:border-white bg-black hover:bg-white text-white hover:text-blue-900 cursor-pointer">
                                <Link href="/portfolio">
                                    View Our Portfolio
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}