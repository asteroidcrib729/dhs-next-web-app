import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutPageCertifications() {
    return (
        <>
            {/* Certifications */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Certifications & Partnerships</h2>
                        <p className="text-lg text-gray-600">
                            We maintain the highest industry standards through continuous learning and certified partnerships.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                        {[
                            "/google-latest-logo.svg",
                            "/microsoft-certified-latest-logo.svg",
                            "/vmware-latest-logo.svg",
                            "/dell-latest-logo.svg",
                            "hp-latest-logo.svg",
                            "/sangfor-latest-logo.svg",
                        ].map((cert, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-2 hover:scale-[110%] transition-transform duration-300">
                                    {/**/}
                                    <Badge className="bg-white w-full h-full">
                                        <Image src={cert} alt="" width={240} height={80} className="w-full h-full"></Image>
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}