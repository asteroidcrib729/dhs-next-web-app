import Header from "@/components/Header";
import AboutPageTop from "./components/AboutPageTop";
import AboutPageStory from "./components/AboutPageStory";
import AboutPageMissionVision from "./components/AboutPageMissionVision";
import AboutPageValues from "./components/AboutPageValues";
import AboutPageApproach from "./components/AboutPageApproach";
import AboutPageTechnologies from "./components/AboutPageTechnologies";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
export default function About() {
  return (
    <>
      <Header />
      <main>
        <AboutPageTop />
        <AboutPageStory />
        <AboutPageMissionVision />
        <AboutPageValues />
        <AboutPageApproach />
        <AboutPageTechnologies />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
