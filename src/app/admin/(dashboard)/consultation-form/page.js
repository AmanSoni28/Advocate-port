import { dbConnect } from "@/lib/mongodb";
import ConsultationForm from "@/models/ConsultationForm";
import { sections } from "@/lib/adminSections";
import SectionForm from "@/components/Admin/SectionForm";

const defaults = { title: "Book a Consultation", description: "Tell us about your legal matter and our team will get back to you shortly.", legalMatterOptions: ["Civil Law", "Criminal Law", "Family Law", "Property Disputes", "Constitutional Law", "Corporate Law", "Consumer Matters", "Cyber Crime", "Other"], timeSlots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM"], submitLabel: "Book Consultation" };

export default async function ConsultationFormPage() {
  await dbConnect();
  const doc = await ConsultationForm.findOne({}).lean();
  const form = { ...defaults, ...(doc ? JSON.parse(JSON.stringify(doc)) : {}) };
  const initialData = { ...form, legalMatterOptions: form.legalMatterOptions.map((value) => ({ value })), timeSlots: form.timeSlots.map((value) => ({ value })) };
  return <div className="mx-auto max-w-3xl"><div className="mb-5"><h1 className="text-2xl font-bold text-[#07172E]">Consultation Form CMS</h1><p className="mt-1 text-sm text-gray-500">Edit the public form content, legal-matter choices, and available time slots.</p></div><div className="rounded-xl bg-white p-6 shadow-sm"><ConsultationFormEditor initialData={initialData} /></div></div>;
}

function ConsultationFormEditor({ initialData }) { return <SectionForm initialData={initialData} fields={sections.consultationForm.fields} endpoint="/api/admin/consultation-form" />; }
