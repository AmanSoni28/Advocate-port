import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import InquiryCrm from "@/components/Admin/InquiryCrm";

export default async function InquiriesPage() {
  await dbConnect();
  const inquiries = JSON.parse(JSON.stringify(await Inquiry.find({}).sort({ createdAt: -1 }).lean()));
  return <div className="mx-auto max-w-5xl"><div className="mb-5"><h1 className="text-2xl font-bold text-[#07172E]">Inquiries</h1><p className="mt-1 text-sm text-gray-500">Review incoming consultation requests, complete them, or delete completed records.</p></div><InquiryCrm initialInquiries={inquiries} /></div>;
}
