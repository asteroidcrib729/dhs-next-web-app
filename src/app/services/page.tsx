import Header from "@/components/Header";
import ServicePageTop from "@/app/services/components/ServicePageTop";
import ServicePageTabs from "@/app/services/components/ServicePageTabs";
import ServicePageHardwarePartners from "@/app/services/components/ServicePageHardwarePartners";
import ServicePageProcess from "@/app/services/components/ServicePageProcess";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function Services() {
    return(
        <>
            <Header/>

            <ServicePageTop/>

            <ServicePageTabs/>

            <ServicePageHardwarePartners/>

            <ServicePageProcess/>

            <CTA/>

            <Footer/>
        </>
    );
}