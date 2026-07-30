import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";
import { sections } from "@/lib/adminSections";
import SectionForm from "@/components/Admin/SectionForm";

export default async function AdminHomeSectionPage({ params }) {
  const { section: sectionKey } = await params;
  const section = sections[sectionKey];

  if (!section || section.model !== "home") {
    notFound();
  }

  await dbConnect();
  const home = await HomeContent.findOne({}).lean();
  const initialData = home?.[sectionKey] ? JSON.parse(JSON.stringify(home[sectionKey])) : {};

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <SectionForm
          initialData={initialData}
          fields={section.fields}
          endpoint={`/api/admin/home/${sectionKey}`}
        />
      </div>
    </div>
  );
}
