import Header from "@/components/Header";
import ContactPageTop from "@/app/contact/components/ContactPageTop";
import ContactPageForm from "@/app/contact/components/ContactPageForm";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Header />

      <ContactPageTop />

      <ContactPageForm />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
}
