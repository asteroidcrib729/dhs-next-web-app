export default function CaseStudiesPageTop() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Project Approaches & Case Studies
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore website, desktop software and IT delivery approaches. Our two new scenarios
              are illustrative examples with explicit acceptance criteria.
            </p>
            {/*
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
                                Get Your Free Consultation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                        */}
          </div>
        </div>
      </section>
    </>
  );
}
