"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Monitor, ShoppingCart, Shield, Cloud, Network } from "lucide-react";
import Link from "next/link";
import { serviceGroups } from "@/lib/services";
const icons = { Code, Monitor, ShoppingCart, Shield, Cloud, Network };
export default function ServicePageTabs() {
  return (
    <section id="service-section" className="scroll-mt-6 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Built around your business</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Our Service Categories</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect your website, internal tools and infrastructure through a practical, coordinated
            plan.
          </p>
        </div>
        <Tabs defaultValue="development-marketing" className="w-full">
          <TabsList className="mb-9 grid h-auto w-full grid-cols-1 gap-1 rounded-2xl border border-border bg-muted p-1.5 sm:grid-cols-2">
            {serviceGroups.map((group) => (
              <TabsTrigger
                key={group.id}
                value={group.id}
                className="h-auto min-h-12 whitespace-normal px-4 py-3 text-sm sm:text-base"
              >
                {group.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {serviceGroups.map((group) => (
            <TabsContent key={group.id} value={group.id}>
              <p className="mb-7 max-w-3xl text-muted-foreground">{group.description}</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service) => {
                  const Icon = icons[service.icon];
                  return (
                    <Card
                      key={service.title}
                      className="flex flex-col bg-white transition-colors hover:border-primary/40"
                    >
                      <CardHeader>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl font-semibold leading-snug">
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col">
                        <h3 className="mb-3 text-sm font-semibold">What is included</h3>
                        <ul className="mb-6 space-y-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle
                                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto border-t border-border pt-5">
                          <Link href="/contact" className="action-link w-full justify-center">
                            Discuss this service
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
