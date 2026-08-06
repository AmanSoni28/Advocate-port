import mongoose from "mongoose";

const ConsultationFormSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Book a Consultation" },
    description: { type: String, default: "Tell us about your legal matter and our team will get back to you shortly." },
    legalMatterOptions: { type: [String], default: ["Civil Law", "Criminal Law", "Family Law", "Property Disputes", "Constitutional Law", "Corporate Law", "Consumer Matters", "Cyber Crime", "Other"] },
    timeSlots: { type: [String], default: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM"] },
    submitLabel: { type: String, default: "Book Consultation" },
  },
  { timestamps: true }
);

export default mongoose.models.ConsultationForm || mongoose.model("ConsultationForm", ConsultationFormSchema);
