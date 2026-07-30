import mongoose from "mongoose";

const ImageAssetSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    mimeType: { type: String, required: true },
    filename: { type: String, default: "" },
    sizeBytes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.ImageAsset ||
  mongoose.model("ImageAsset", ImageAssetSchema);
