export default function CaseStudiesPageResults() {
    return (
        <>
            {/* Results Overview */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-[#4A90A4] mb-2">$2.5B+</div>
                            <div className="text-gray-600">Revenue Generated</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#64748b] mb-2">350%</div>
                            <div className="text-gray-600">Average ROI</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                            <div className="text-gray-600">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
                            <div className="text-gray-600">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}