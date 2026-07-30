import Navbar from "@/components/Home/Navbar/Navbar.jsx";
import PageHero from "@/components/Shared/PageHero.jsx";
import ArticlesGrid from "@/components/Shared/ArticlesGrid.jsx";
import ConsultationBanner from "@/components/Home/ConsultationBanner/ConsultationBanner.jsx";
import ContactSection from "@/components/Home/ContactSection/ContactSection.jsx";

export const metadata = {
  title: "Articles | Advocate Shashank Shekhar Tripathi",
  description:
    "Legal insights and articles on tenancy rights, property law, criminal law and constitutional matters.",
};

export default function ArticlesPage() {
  return (
    <>
      <Navbar />

      <PageHero pageKey="articles" />

      <ArticlesGrid />

      <ConsultationBanner />
      <ContactSection />
    </>
  );
}
