import Header from "@/components/Header";
import AboutPageTop from "@/app/about/components/AboutPageTop";
import AboutPageStory from "@/app/about/components/AboutPageStory";
import AboutPageMissionVision from "@/app/about/components/AboutPageMissionVision";
import AboutPageTeams from "@/app/about/components/AboutPageTeams";
// import AboutPageStats from "@/app/about/components/AboutPageStats";
import AboutPageApproach from "@/app/about/components/AboutPageApproach";
import AboutPageCertifications from "@/app/about/components/AboutPageCertifications";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function About() {
    return(
        <>
            {/* <h1>This Is The About Page.</h1> */}

            <Header/>

            <AboutPageTop/>

            <AboutPageStory/>

            <AboutPageMissionVision/>

            <AboutPageTeams/>

            {/* <AboutPageStats/> */}

            <AboutPageApproach/>

            <AboutPageCertifications/>

            <CTA/>

            <Footer/>
        </>
    );
}