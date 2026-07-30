import { dbConnect } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";
import SiteSettings from "@/models/SiteSettings";

// JSON round-trip converts Mongoose ObjectId/Date instances into plain
// strings so the result can cross the Server -> Client Component boundary.
export async function getHomeContent() {
  await dbConnect();
  const doc = await HomeContent.findOne({}).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getSiteSettings() {
  await dbConnect();
  const doc = await SiteSettings.findOne({}).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}
