"use client";

import { LineChart, Code2, Network } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Sparkles,  Megaphone, BarChart3, Target, Layout, Columns3, Monitor, Server, Cloud } from "lucide-react";

export default function Features() {
  const Solutions = [
    {
      name: "Development & Marketing",
      description: "Accessible websites, technical SEO and permission-based email workflows.",
      icon: <LineChart className="w-10 h-10 mx-auto mb-4 text-primary" />,
    },
    {
      name: "Custom Desktop Applications",
      description:
        "Purpose-built desktop tools that connect your data and simplify daily operations.",
      icon: <Code2 className="w-10 h-10 mx-auto mb-4 text-primary" />,
    },
    {
      name: "IT Infrastructure",
      description: "Secure, cloud-based infrastructure tailored to your business needs.",
      icon: <Network className="w-10 h-10 mx-auto mb-4 text-primary" />,
    },
  ];

  return (
    <section className="bg-background w-full py-20 px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">
        Complete Business Solutions
      </h2>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {Solutions.map((Solution, index) => (
          <Card
            key={index}
            className="bg-white  hover:-translate-y-0.5 hover:border-primary/40 transition-[transform,border-color] duration-200"
          >
            <CardContent className="p-6 text-center text-foreground">
              <CardHeader className="text-foreground text-center font-semibold text-xl mb-2">
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
