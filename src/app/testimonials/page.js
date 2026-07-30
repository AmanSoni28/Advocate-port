import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import TestimonialsGrid from "@/components/Shared/TestimonialsGrid.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "Testimonials | Advocate Shashank Shekhar Tripathi",
  description:
    "Read what clients have to say about their experience working with Advocate Shashank Shekhar Tripathi.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="testimonials" />

      <TestimonialsGrid />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
