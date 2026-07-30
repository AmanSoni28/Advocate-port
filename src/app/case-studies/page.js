import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import CaseStudiesContent from "@/components/CaseStudies/CaseStudiesContent.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "Case Studies | Advocate Shashank Shekhar Tripathi",
  description:
    "A closer look at successful legal outcomes across property, criminal, family and cheque bounce matters.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="caseStudies" />

      <CaseStudiesContent />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
