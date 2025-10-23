import Header from "@/components/Header";
import ServicePageTop from "@/app/services/components/ServicePageTop";
import ServicePageTabs from "@/app/services/components/ServicePageTabs";
import TrustedMarketingPartner from "@/components/TrustedMarketingPartner";
import ServicePageProcess from "@/app/services/components/ServicePageProcess";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function Services() {
    return(
        <>
            <Header/>

            <ServicePageTop/>

            <ServicePageTabs/>

            <TrustedMarketingPartner/>

            <ServicePageProcess/>

            <CTA/>

            <Footer/>
        </>
    );
}