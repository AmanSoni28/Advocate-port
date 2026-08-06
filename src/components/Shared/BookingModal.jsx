"use client";

import { useEffect, useState } from "react";
import { X, Phone, Mail, Scale, CalendarDays, Clock3, CheckCircle2 } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext.jsx";
import { useConsultationForm, useSiteSettings } from "@/components/HomeContentProvider.jsx";

const defaults = {
  title: "Book a Consultation",
  description: "Tell us about your legal matter and our team will get back to you shortly.",
  legalMatterOptions: ["Civil Law", "Criminal Law", "Family Law", "Property Disputes", "Constitutional Law", "Corporate Law", "Consumer Matters", "Cyber Crime", "Other"],
  timeSlots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM"],
  submitLabel: "Book Consultation",
};
const initialForm = { fullName: "", phone: "", email: "", city: "", legalMatter: "", subject: "", description: "", contactMethod: "Phone Call", consultationDate: "", timeSlot: "", consent: false };

export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const settings = useSiteSettings() || {};
  const config = { ...defaults, ...(useConsultationForm() || {}) };
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState({ sending: false, message: "", success: false });

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => event.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = "auto"; window.removeEventListener("keydown", onKeyDown); };
  }, [isOpen, closeModal]);

  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  async function submit(event) {
    event.preventDefault();
    if (!form.consent) return setState({ sending: false, success: false, message: "Please agree before submitting." });
    setState({ sending: true, success: false, message: "" });
    const { consent, ...payload } = form;
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to submit your inquiry.");
      setForm(initialForm);
      setState({ sending: false, success: true, message: "Your consultation request has been received." });
    } catch (error) { setState({ sending: false, success: false, message: error.message }); }
  }

  if (!isOpen) return null;
  const inputClass = "mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]";
  const labelClass = "text-xs font-medium text-slate-200";
  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#020b18]/80 p-3 backdrop-blur-sm sm:p-6" onClick={closeModal}>
    <div className="mx-auto flex min-h-full max-w-3xl items-center" onClick={(event) => event.stopPropagation()}>
      <div className="relative my-4 w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#07172E] shadow-2xl">
        <button type="button" onClick={closeModal} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"><X size={20} /></button>
        <div className="border-b border-white/10 px-5 py-6 text-center sm:px-9">
          <div className="flex items-center justify-center gap-3 text-[#D4AF37]"><span className="h-px w-8 bg-[#D4AF37]/70" /><Scale size={18} /><span className="h-px w-8 bg-[#D4AF37]/70" /></div>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#E7C254] sm:text-3xl">{config.title}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">{config.description}</p>
        </div>
        <form onSubmit={submit} className="px-5 py-6 sm:px-9 sm:py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *"><input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" className={inputClass} /></Field>
            <Field label="Phone Number *"><input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Enter your phone number" className={inputClass} /></Field>
            <Field label="Email Address *"><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter your email address" className={inputClass} /></Field>
            <Field label="City / State *"><input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Enter your city or state" className={inputClass} /></Field>
          </div>
          <div className="mt-4"><Field label="Legal Matter Type *"><select required value={form.legalMatter} onChange={(e) => update("legalMatter", e.target.value)} className={inputClass}><option value="" className="text-slate-900">Select the type of legal matter</option>{config.legalMatterOptions.filter(Boolean).map((item) => <option key={item} value={item} className="text-slate-900">{item}</option>)}</select></Field></div>
          <div className="mt-4"><Field label="Subject *"><input required value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="Enter subject of your inquiry" className={inputClass} /></Field></div>
          <div className="mt-4"><Field label="Brief Description of Your Case *"><textarea required rows="4" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Please describe your legal issue briefly. Include relevant dates or important details if applicable." className={inputClass} /></Field></div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2"><fieldset><legend className={labelClass}>Preferred Contact Method *</legend><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{["Phone Call", "WhatsApp", "Email"].map((method) => <label key={method} className="flex cursor-pointer items-center gap-2 text-xs text-slate-200"><input type="radio" checked={form.contactMethod === method} onChange={() => update("contactMethod", method)} className="accent-[#D4AF37]" />{method}</label>)}</div></fieldset><div className="grid grid-cols-2 gap-3"><Field label="Preferred Date *"><input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.consultationDate} onChange={(e) => update("consultationDate", e.target.value)} className={inputClass} /></Field><Field label="Time Slot *"><select required value={form.timeSlot} onChange={(e) => update("timeSlot", e.target.value)} className={inputClass}><option value="" className="text-slate-900">Select</option>{config.timeSlots.filter(Boolean).map((slot) => <option key={slot} value={slot} className="text-slate-900">{slot}</option>)}</select></Field></div></div>
          <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-300"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 accent-[#D4AF37]" />I agree to be contacted regarding my legal inquiry and understand that submitting this form does not establish an attorney-client relationship.</label>
          <button disabled={state.sending} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-3.5 text-sm font-semibold text-[#07172E] transition hover:bg-[#e4c55b] disabled:opacity-60"><Scale size={17} />{state.sending ? "Submitting..." : config.submitLabel}</button>
          {state.message && <p className={`mt-3 text-center text-sm ${state.success ? "text-emerald-300" : "text-red-300"}`}>{state.success && <CheckCircle2 className="mr-1 inline" size={16} />}{state.message}</p>}
          <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2"><a href={`tel:${settings.phone || ""}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-100 hover:border-[#D4AF37]/50"><Phone className="text-[#D4AF37]" size={18} /><span><small className="block text-slate-400">Call directly</small><strong className="text-sm">{settings.phone || "Phone unavailable"}</strong></span></a><a href={`mailto:${settings.email || ""}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-100 hover:border-[#D4AF37]/50"><Mail className="text-[#D4AF37]" size={18} /><span className="min-w-0"><small className="block text-slate-400">Email directly</small><strong className="block truncate text-sm">{settings.email || "Email unavailable"}</strong></span></a></div>
        </form>
      </div>
    </div>
  </div>;
}

function Field({ label, children }) { return <label className="block"><span className="text-xs font-medium text-slate-200">{label}</span>{children}</label>; }
