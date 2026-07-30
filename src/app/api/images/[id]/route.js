import { dbConnect } from "@/lib/mongodb";
import ImageAsset from "@/models/ImageAsset";

export async function GET(request, { params }) {
  const { id } = await params;

  await dbConnect();

  let asset;
  try {
    // Not .lean() — Mongoose only casts the Buffer field to a real Node
    // Buffer on a hydrated document; .lean() leaves it as a raw BSON Binary.
    asset = await ImageAsset.findById(id);
  } catch {
    return new Response("Not found", { status: 404 });
  }

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(asset.data, {
    headers: {
      "Content-Type": asset.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
