import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

const allowed = ["fullName", "phone", "email", "city", "legalMatter", "subject", "description", "contactMethod", "consultationDate", "timeSlot"];

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

  const data = Object.fromEntries(allowed.map((key) => [key, typeof body[key] === "string" ? body[key].trim() : ""]));
  if (Object.values(data).some((value) => !value)) return Response.json({ error: "Please complete all required fields." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!/[0-9]{7,}/.test(data.phone.replace(/\D/g, ""))) return Response.json({ error: "Enter a valid phone number." }, { status: 400 });
  if (!["Phone Call", "WhatsApp", "Email"].includes(data.contactMethod)) return Response.json({ error: "Invalid contact preference." }, { status: 400 });

  await dbConnect();
  const inquiry = await Inquiry.create(data);
  return Response.json({ data: { id: inquiry._id.toString() } }, { status: 201 });
}
