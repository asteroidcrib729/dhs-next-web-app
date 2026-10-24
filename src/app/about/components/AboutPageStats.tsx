export default function AboutPageStats() {
  return (
    <>
      {/* Stats Section */}
      <section className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-white/80">
              These numbers represent the trust our clients place in us and the results we deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-emerald-200 mb-2">500+</div>
              <div className="text-white/80">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-200 mb-2">$2.5B+</div>
              <div className="text-white/80">Revenue Generated</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-200 mb-2">98%</div>
              <div className="text-white/80">Client Retention Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-200 mb-2">5+</div>
              <div className="text-white/80">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
