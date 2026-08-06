import { verifySession } from "@/lib/auth/dal";
import { dbConnect } from "@/lib/mongodb";
import ConsultationForm from "@/models/ConsultationForm";

export async function PUT(request) {
  const session = await verifySession();
  if (!session.isAuth) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request body" }, { status: 400 });
  const normalizeList = (items) => Array.isArray(items) ? items.map((item) => typeof item === "string" ? item : item?.value).filter(Boolean) : [];
  const update = { ...body, legalMatterOptions: normalizeList(body.legalMatterOptions), timeSlots: normalizeList(body.timeSlots) };
  await dbConnect();
  const data = await ConsultationForm.findOneAndUpdate({}, { $set: update }, { upsert: true, new: true }).lean();
  return Response.json({ data });
}
