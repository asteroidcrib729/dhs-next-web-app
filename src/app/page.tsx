import Header from "@/components/Header";
import LandingPageTop from "@/components/LandingPageTop";
import TrustedMarketingPartner from "@/components/TrustedMarketingPartner";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CaseStudy from "@/components/CaseStudy";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Header />

            <LandingPageTop />

            <TrustedMarketingPartner />

            <Features />

            <Testimonials />

            <CaseStudy />

            <Pricing />

            <FAQ />
            
            <CTA />

            <Footer />
        </>
    );
}
