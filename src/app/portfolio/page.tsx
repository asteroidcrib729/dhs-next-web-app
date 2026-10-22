import Header from "@/components/Header";
import PortfolioPageTop from "@/app/portfolio/components/PortfolioPageTop";
import PortfolioPageGrid from "@/app/portfolio/components/PortfolioPageGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Portfolio() {
  return (
    <>
      <Header />

      <PortfolioPageTop />

      <PortfolioPageGrid />

      <CTA />

      <Footer />
    </>
  );
}
