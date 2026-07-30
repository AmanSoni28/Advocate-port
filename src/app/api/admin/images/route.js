import { verifySession } from "@/lib/auth/dal";
import { dbConnect } from "@/lib/mongodb";
import ImageAsset from "@/models/ImageAsset";

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export async function POST(request) {
  const session = await verifySession();
  if (!session.isAuth) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || typeof file === "string") {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return Response.json({ error: "Unsupported image type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return Response.json({ error: "Image is too large (max 8MB)" }, { status: 400 });
  }

  const data = Buffer.from(await file.arrayBuffer());

  await dbConnect();

  const asset = await ImageAsset.create({
    data,
    mimeType: file.type,
    filename: file.name || "",
    sizeBytes: data.length,
  });

  return Response.json({ id: asset._id.toString() });
}
