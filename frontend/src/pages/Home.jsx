import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CategorySection from "../components/CategorySection";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

function Home() {
  return (
    <PageWrapper>
      <Announcement />
      <Navbar/>
     <Hero />
      <Features />
      <CategorySection />
      <Newsletter />
      <Footer />
    </PageWrapper>
  );
}

export default Home;