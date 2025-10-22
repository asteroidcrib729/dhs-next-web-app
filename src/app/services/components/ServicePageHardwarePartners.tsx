import { Card, CardContent, } from "@/components/ui/card";
import Image from "next/image";

export default function ServicePageHardwarePartners() {
    const hardwareBrands = [
        {
            name: "Dell",
            href: "/dell-latest-logo.svg",
            description: "Enterprise servers, workstations, and storage solutions",
        },
        {
            name: "HP",
            href: "/hp-latest-logo.svg",
            description: "Business laptops, printers, and server infrastructure",
        },
        {
            name: "Lenovo",
            href: "/lenovo-latest-logo.svg",
            description: "ThinkPad laptops, desktops, and data center solutions",
        },
        {
            name: "Sangfor",
            href: "/sangfor.svg",
            description: "Cybersecurity and cloud computing solutions",
        },
        {
            name: "H3C",
            href: "/h3c-logo.svg",
            description: "Network infrastructure and switching solutions",
        },
        {
            name: "Constructor Tech",
            href: "/constructor-tech-latest-logo.svg",
            description: "Custom technology solutions and integration",
        },
        {
            name: "Veeam",
            href: "/veeam-latest-logo.svg",
            description: "Backup and disaster recovery solutions",
        },
        {
            name: "VMware",
            href: "/vmware-latest-logo.svg",
            description: "Virtualization and cloud infrastructure",
        },
    ]

    return (
        <>
            {/* Hardware Partners */}
            < section className="bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#94a3b8] py-16" >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Hardware & Software Partners</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We partner with industry-leading brands to deliver enterprise-grade hardware and software solutions that
                            power your business operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hardwareBrands.map((brand, index) => (
                            <Card key={index} className="text-center hover:shadow-[0_6px_20px_rgba(74,144,164,0.3),0_6px_20px_rgba(14,165,233,0.25)] hover:scale-[103%] transition-all duration-300 bg-white">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <Image
                                            src={brand.href}
                                            alt={`${brand.name} logo`}
                                            width={120}
                                            height={60}
                                            className="mx-auto w-auto h-20 transition-all"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                                    <p className="text-sm text-gray-600">{brand.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section >
        </>
    );
}