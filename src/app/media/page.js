import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import MediaGrid from "@/components/Shared/MediaGrid.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "Media & Press | Advocate Shashank Shekhar Tripathi",
  description:
    "Media appearances, interviews and press coverage featuring Advocate Shashank Shekhar Tripathi.",
};

export default function MediaPage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="media" />

      <MediaGrid />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
