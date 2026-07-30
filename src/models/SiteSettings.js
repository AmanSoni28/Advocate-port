import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    mapsEmbedUrl: { type: String, default: "" },
    rights_en: { type: String, default: "" },
    rights_hi: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
