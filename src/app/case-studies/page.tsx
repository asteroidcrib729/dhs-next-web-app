import Header from "@/components/Header";
import CaseStudiesPageTop from "@/app/case-studies/components/CaseStudiesPageTop";
import CaseStudiesPageResults from "@/app/case-studies/components/CaseStudiesPageResults";
import CaseStudiesPageGrid from "@/app/case-studies/components/CaseStudiesPageGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function CaseStudies() {
  return (
    <>
      <Header />

      <CaseStudiesPageTop />

      <CaseStudiesPageResults />

      <CaseStudiesPageGrid />

      <CTA />

      <Footer />
    </>
  );
}
