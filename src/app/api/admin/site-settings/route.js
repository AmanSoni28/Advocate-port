import { verifySession } from "@/lib/auth/dal";
import { dbConnect } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export async function PUT(request) {
  const session = await verifySession();
  if (!session.isAuth) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  await dbConnect();

  const updated = await SiteSettings.findOneAndUpdate(
    {},
    { $set: body },
    { upsert: true, new: true }
  ).lean();

  return Response.json({ data: updated });
}
