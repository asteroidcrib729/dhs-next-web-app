import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
// import ShadCNCard from "@/components/ShadCN-Card";
import BlurText from "@/components/BlurText";

export default function Contact() {
    return (
        <>
            {/*
            <h1>This Is The Contact Page.</h1>

            <ShadCNCard />
            */}

            <Header />

            <Form />

            <div className="h-[100px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-8">
                <h1 className="text-2xl md:text-2xl lg:text-6xl text-center py-4 text-black">Our Location</h1>
            </div>

            <div className="h-[100px] bg-gradient-to-r from-blue-400 via-green-400 to-cyan-200 my-12">
                <h1 className="text-2xl md:text-2xl lg:text-6xl text-center py-4">Our Location</h1>
            </div>

            <div className="h-[100px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 my-8">
                <h1 className="text-2xl md:text-2xl lg:text-6xl text-center py-4">Our Location</h1>
            </div>

            <div className="flex justify-center h-[100px] bg-gradient-to-r from-white to-black my-8">
                <BlurText text="Our Location" delay={150} animateBy="words" direction="top" className="text-2xl md:text-2xl lg:text-6xl text-center text-gradient-to-r from-black to-white bg-clip-text py-4" />
            </div>

            <div className="flex justify-center h-[100px] bg-gradient-to-r from-gray-600 via-black to-gray-600 my-8">
                <BlurText text="Our Location" delay={150} animateBy="words" direction="top" className="text-2xl md:text-2xl lg:text-6xl text-center text-gradient-to-r from-black to-white bg-clip-text py-4" />
            </div>

            <div className="w-full mx-auto px-4 py-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d199.78222130617257!2d67.02722773382908!3d24.908320490336397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU0JzI5LjgiTiA2N8KwMDEnMzguMiJF!5e0!3m2!1sen!2s!4v1758978334786!5m2!1sen!2s" className="border-none w-full h-[450px]" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <Footer />
        </>
    );
}