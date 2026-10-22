import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function AboutPageTeams() {
  const teamMembers = [
    {
      name: "Mubarak Bhimani",
      role: "CEO & Co-Founder",
      bio: "15+ years in digital marketing with expertise in scaling businesses from startups to enterprises.",
      image: "/images/placeholders/profile-placeholder.webp",
      linkedin:
        "https://www.linkedin.com/in/mubarak-bhimani-analytical-research-development-professional/",
      // twitter: "#",
    },
    {
      name: "Wasif Raza",
      role: "CMO & Co-Founder",
      bio: "Expert in digital marketing strategies and brand development with 12+ years of experience in driving business growth.",
      image: "/images/placeholders/profile-placeholder.webp",
      linkedin: "https://www.linkedin.com/in/wasif-raza-08b7a1201/",
      // twitter: "#",
    },
    {
      name: "Jahangeer Rizvi",
      role: "Head of Business Development",
      bio: "Leader in global market expansion and B2B sales strategy with 12+ years of experience in building and scaling high-growth revenue streams.",
      image: "/images/placeholders/profile-placeholder.webp",
      linkedin: "https://www.linkedin.com/in/rizvi-saab-4b407a26/",
      // twitter: "#",
    },
    {
      name: "Faraz Hussain",
      role: "Full-Stack Developer",
      bio: "Full-Stack Developer who has engineered scalable web applications serving over 1M+ monthly active users.",
      image: "/images/placeholders/profile-placeholder.webp",
      linkedin: "https://www.linkedin.com/in/faraz-hussain-a79637288",
      // twitter: "#",
    },
    {
      name: "Asad Raza",
      role: "Full-Stack Developer",
      bio: "Full-Stack Developer with a track record of shipping 15+ production-level applications from concept to launch.",
      image: "/images/placeholders/profile-placeholder.webp",
      linkedin: "https://www.linkedin.com/in/syed-asad-raza-naqvi-a932a7296/",
      // twitter: "#",
    },
  ];

  return (
    <>
      {/* Team Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines deep industry expertise with a passion for helping
              businesses succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="h-full text-center hover:scale-[103%] hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="h-full flex flex-col p-6">
                  <div className="mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="mt-auto flex flex-row justify-center gap-2">
                    {/* LinkedIn Button */}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-gray-300 text-gray-600 bg-white hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none active:scale-95 transition-all duration-200"
                      asChild
                    >
                      <Link href={member.linkedin} target="_blank" aria-label="LinkedIn">
                        <FaLinkedinIn className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* X (Twitter) Button */}
                    {/*
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 rounded-full border-gray-300 text-gray-600 bg-white hover:bg-gray-100 hover:border-black hover:text-black focus:ring-2 focus:ring-gray-500 focus:outline-none active:scale-95 transition-all duration-200"
                                            asChild>
                                            <Link href="#" aria-label="X">
                                                <SiX className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        */}
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
