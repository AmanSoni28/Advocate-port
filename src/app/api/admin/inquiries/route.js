import { verifySession } from "@/lib/auth/dal";
import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

async function requireAdmin() {
  const session = await verifySession();
  return session.isAuth;
}

export async function GET() {
  if (!(await requireAdmin())) return Response.json({ error: "Not authenticated" }, { status: 401 });
  await dbConnect();
  const data = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
  return Response.json({ data });
}

export async function PATCH(request) {
  if (!(await requireAdmin())) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const { id, status } = await request.json().catch(() => ({}));
  if (!id || !["pending", "completed"].includes(status)) return Response.json({ error: "Invalid update" }, { status: 400 });
  await dbConnect();
  const data = await Inquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
  if (!data) return Response.json({ error: "Inquiry not found" }, { status: 404 });
  return Response.json({ data });
}

export async function DELETE(request) {
  if (!(await requireAdmin())) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const { id } = await request.json().catch(() => ({}));
  if (!id) return Response.json({ error: "Invalid inquiry" }, { status: 400 });
  await dbConnect();
  const removed = await Inquiry.findOneAndDelete({ _id: id, status: "completed" });
  if (!removed) return Response.json({ error: "Only completed inquiries can be deleted" }, { status: 400 });
  return Response.json({ ok: true });
}
