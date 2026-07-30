import { dbConnect } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { sections } from "@/lib/adminSections";
import SectionForm from "@/components/Admin/SectionForm";

export default async function AdminSiteSettingsPage() {
  const section = sections.siteSettings;

  await dbConnect();
  const settings = await SiteSettings.findOne({}).lean();
  const initialData = settings ? JSON.parse(JSON.stringify(settings)) : {};

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <SectionForm
          initialData={initialData}
          fields={section.fields}
          endpoint="/api/admin/site-settings"
        />
      </div>
    </div>
  );
}
