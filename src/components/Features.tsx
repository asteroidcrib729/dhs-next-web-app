"use client";

import { LineChart, Code2, Network } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Sparkles,  Megaphone, BarChart3, Target, Layout, Columns3, Monitor, Server, Cloud } from "lucide-react";

export default function Features() {
  const Solutions = [
    {
      name: "Digital Marketing",
      description: "SEO, social media, and paid campaigns that deliver measurable results.",
      icon: <LineChart className="w-10 h-10 mx-auto mb-4 text-blue-500" />,
    },
    {
      name: "Web Development",
      description: "Custom websites and apps designed for performance and scalability.",
      icon: <Code2 className="w-10 h-10 mx-auto mb-4 text-green-500" />,
    },
    {
      name: "IT Infrastructure",
      description: "Secure, cloud-based infrastructure tailored to your business needs.",
      icon: <Network className="w-10 h-10 mx-auto mb-4 text-purple-500" />,
    },
  ];

  return (
    <section className="bg-black w-full py-20 px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Complete Business Solutions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Solutions.map((Solution, index) => (
          <Card
            key={index}
            className="bg-gray-800  hover:scale-[103%] hover:shadow-lg hover:shadow-[#2b47d9] transition-all duration-300"
          >
            <CardContent className="p-6 text-center text-white">
              <CardHeader className="text-gray-400 text-center font-semibold text-xl mb-2">
                {Solution.icon}
                {Solution.name}
              </CardHeader>
              {Solution.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
