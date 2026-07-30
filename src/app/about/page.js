import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import About from "@/components/Home/About/About.jsx";
import WhyChoose from "@/components/Home/WhyChoose/WhyChoose.jsx";
import Recognitions from "@/components/Shared/Recognitions.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "About | Advocate Shashank Shekhar Tripathi",
  description:
    "Learn about Advocate Shashank Shekhar Tripathi's legal career, education, enrollment and recognitions.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="about" />

      <About />

      <WhyChoose />

      <Recognitions />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
