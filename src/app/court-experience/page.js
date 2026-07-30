import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import StatHighlights from "@/components/Home/StatHighlights/StatHighlights.jsx";
import CourtExperienceContent from "@/components/CourtExperience/CourtExperienceContent.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "Court Experience | Advocate Shashank Shekhar Tripathi",
  description:
    "15+ years of courtroom experience across the High Court, District Courts, Tribunals and specialised forums.",
};

export default function CourtExperiencePage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="courtExperience" />

      <StatHighlights overlap={false} />

      <CourtExperienceContent />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
