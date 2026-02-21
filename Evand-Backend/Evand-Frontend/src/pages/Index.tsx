import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedEvents />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
