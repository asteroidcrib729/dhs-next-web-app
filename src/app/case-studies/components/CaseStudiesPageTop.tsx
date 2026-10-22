export default function CaseStudiesPageTop() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Success Stories That Inspire</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover how we&#39;ve helped businesses achieve remarkable growth through our digital
              marketing expertise and cutting-edge IT solutions.
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
