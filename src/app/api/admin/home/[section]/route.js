import { verifySession } from "@/lib/auth/dal";
import { dbConnect } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";
import { sections } from "@/lib/adminSections";

const ALLOWED_SECTIONS = Object.keys(sections).filter((key) => sections[key].model === "home");

export async function PUT(request, { params }) {
  const session = await verifySession();
  if (!session.isAuth) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { section } = await params;

  if (!ALLOWED_SECTIONS.includes(section)) {
    return Response.json({ error: "Unknown section" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  await dbConnect();

  const updated = await HomeContent.findOneAndUpdate(
    {},
    { $set: { [section]: body } },
    { upsert: true, new: true }
  ).lean();

  return Response.json({ data: updated[section] });
}
