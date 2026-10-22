export default function ServicePageProcess() {
  return (
    <>
      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Proven</span> Process
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure every project delivers exceptional results
              and exceeds your expectations.
            </p>
          </div>

          {/* Line connecting steps */}
          <div className="relative">
            <div className="absolute inset-x-0 top-12 hidden md:block h-[2px] bg-gray-200 z-0"></div>

            <div className="relative grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description:
                    "We analyze your business, goals, and current situation to develop a customized strategy.",
                },
                {
                  step: "02",
                  title: "Strategy Development",
                  description:
                    "Our experts create a comprehensive plan tailored to your specific needs and objectives.",
                },
                {
                  step: "03",
                  title: "Implementation",
                  description:
                    "We execute the strategy with precision, keeping you informed throughout the process.",
                },
                {
                  step: "04",
                  title: "Optimization & Growth",
                  description:
                    "We continuously monitor, analyze, and optimize to ensure maximum ROI and growth.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative text-center p-6 bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
