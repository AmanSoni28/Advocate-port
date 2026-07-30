import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import Hero from "@/components/Home/Hero/Hero.jsx";
import StatHighlights from "@/components/Home/StatHighlights/StatHighlights.jsx";
import About from "@/components/Home/About/About.jsx";
import PracticeArea from "@/components/Home/Practice/PracticeArea.jsx";
import WhyChoose from "@/components/Home/WhyChoose/WhyChoose.jsx";
import FeaturedCases from "@/components/Home/FeaturedCases/FeaturedCases.jsx";
import Testimonials from "@/components/Home/Testimonials/Testimonial.jsx";
import LatestUpdates from "@/components/Home/LatestUpdates/LatestUpdates.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";
import DisclaimerGate from "@/components/Home/DisclaimerModal/DisclaimerGate.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <DisclaimerGate />
      <Hero />
      <StatHighlights />
      <About />
      <PracticeArea />
      <WhyChoose />
      <FeaturedCases />
      <Testimonials />
      <LatestUpdates />
      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
