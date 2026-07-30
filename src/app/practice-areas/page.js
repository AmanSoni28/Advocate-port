import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import PracticeArea from "@/components/Home/Practice/PracticeArea.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "Practice Areas | Advocate Shashank Shekhar Tripathi",
  description:
    "Explore the full range of legal services offered - civil, criminal, family, property, corporate, cyber law and more.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="practiceAreas" />

      <PracticeArea showHeading={false} />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
