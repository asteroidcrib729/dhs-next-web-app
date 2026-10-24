// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";

export default function BlogPageTop() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Insights & Expertise</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay ahead with the latest trends, strategies, and insights in website development,
              desktop software and IT solutions. Our expert team shares actionable advice to help
              your business grow.
            </p>

            {/* Search Bar
                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                            <Input
                                placeholder="Search articles..."
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground"
                            />
                        </div>
                        */}
          </div>
        </div>
      </section>
    </>
  );
}
