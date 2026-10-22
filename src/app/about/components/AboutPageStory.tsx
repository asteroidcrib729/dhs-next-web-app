import Image from "next/image";

export default function AboutPageStory() {
  return (
    <>
      {/* Company Story */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-center font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="justify-left lg:text-justify">
                  Founded in 2019, Tech Venture Solutions emerged from a simple observation:
                  businesses needed a partner who could seamlessly integrate digital marketing
                  expertise with robust IT infrastructure to drive real growth.
                </p>
                <p className="justify-left lg:text-justify">
                  Our founders, Mubarak Bhimani and Wasif Raza, combined their decades of experience
                  in digital marketing and business development to create a unique service offering
                  that addresses the complete technology needs of modern businesses.
                </p>
                <p className="justify-left lg:text-justify">
                  Today, we&#39;ve helped over 500 businesses achieve their digital transformation
                  goals, generating over $2.5 billion in revenue for our clients while maintaining a
                  98% client retention rate.
                </p>
              </div>
            </div>
            <div className="w-full h-full">
              <Image
                src="/images/about/our-story.webp"
                alt="Tech Venture Solutions Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
