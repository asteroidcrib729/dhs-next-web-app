import Header from "@/components/Header";
import ContactPageTop from "@/app/contact/components/ContactPageTop";
import ContactPageForm from "@/app/contact/components/ContactPageForm";
import ContactPageMap from "@/app/contact/components/ContactPageMap";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Contact() {
    return (
        <>
            <Header />

            <ContactPageTop />

            <ContactPageForm />

            <ContactPageMap />

            <FAQ />

            <CTA />

            <Footer />
        </>
    );
}