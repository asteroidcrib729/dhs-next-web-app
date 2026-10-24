import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicePageTop() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Complete Digital Solutions for Your Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From websites and customized desktop tools to IT infrastructure that supports your
              operations, we provide comprehensive solutions that help businesses thrive in the
              digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 cursor-pointer"
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border bg-white text-foreground hover:bg-secondary cursor-pointer"
              >
                <Link href="/portfolio">View Our Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
