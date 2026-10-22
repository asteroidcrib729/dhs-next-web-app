import Image from "next/image";

export default function AboutPageApproach() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-300 via-blue-300 to-indigo-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-[50%]">
              <h2 className="text-black text-center text-3xl md:text-4xl font-bold mb-6 text-navy-900">
                Our Methodology
              </h2>
              <p className="text-left lg:text-justify text-lg text-gray-700 mb-8">
                At TVS, we understand that successful marketing blends creativity with analytical
                precision. Our methodology unites imaginative ideas with data-backed insights to
                craft strategies that not only stand out visually but also generate tangible
                outcomes.
              </p>

              <div className="ml-4 space-y-6">
                <ul>
                  <li className="list-disc text-black">
                    <h3 className="text-black text-xl font-bold mb-2 text-navy-900">
                      Solid Foundations
                    </h3>
                    <p className="text-left lg:text-justify text-gray-700">
                      Every collaboration starts with a thorough exploration of your objectives,
                      audience, and market environment to set a clear direction.
                    </p>
                  </li>

                  <li className="list-disc text-black">
                    <h3 className="text-black text-xl font-bold mb-2 mt-4 text-navy-900">
                      Holistic Strategies
                    </h3>
                    <p className="text-left lg:text-justify text-gray-700">
                      We design integrated plans that utilize diverse channels and techniques to
                      deliver results aligned with your business goals.
                    </p>
                  </li>

                  <li className="list-disc text-black">
                    <h3 className="text-black text-xl font-bold mb-2 mt-4 text-navy-900">
                      Ongoing Refinement
                    </h3>
                    <p className="text-left lg:text-justify text-gray-700">
                      Our team consistently reviews performance metrics and fine-tunes campaigns to
                      maximize efficiency and effectiveness.
                    </p>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-left lg:text-justify text-gray-700 mt-4">
                With this balanced process, your marketing spend provides both short-term wins and
                lasting growth.
              </p>
            </div>

            <div className="lg:w-[50%]">
              <div className="relative h-[425px] w-full rounded-4xl overflow-hidden">
                <Image
                  src="/images/about/methodology.webp"
                  alt="Team collaboration and strategy meeting"
                  className="object-cover h-full w-full"
                  width={5157}
                  height={3438}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
