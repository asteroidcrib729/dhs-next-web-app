import Header from "@/components/Header";
import BlogPageTop from "@/app/blog/components/BlogPageTop";
import BlogPagePosts from "@/app/blog/components/BlogPagePosts";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Blog() {
    return(
        <>
            <Header/>

            <BlogPageTop/>

            <BlogPagePosts/>

            <CTA/>

            <Footer/>
        </>
    );
}