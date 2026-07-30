"use client";

import { useEffect } from "react";
import { X, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useBookingModal } from "@/context/BookingModalContext.jsx";
import { useHomeContent, useSiteSettings } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";

export default function BookingModal() {
  const { lang } = useLanguage();
  const { isOpen, closeModal } = useBookingModal();
  const { bookingModal, navbar } = useHomeContent();
  const settings = useSiteSettings();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07172E]/70 backdrop-blur-sm p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(7,23,46,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative px-6 py-8 sm:px-8 sm:py-9">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#07172E] transition-colors duration-200 hover:bg-[#E5E7EB]"
          >
            <X size={18} />
          </button>

          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#D4AF37]">
            {pick(bookingModal, "eyebrow", lang)}
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#07172E]">
            {pick(bookingModal, "title", lang)}
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#4b5563] sm:text-base">
            {pick(bookingModal, "subtitle", lang)}
          </p>

          <div className="mt-7 space-y-3">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-4 rounded-2xl border border-[#D4AF37]/30 bg-white px-5 py-4 transition-colors duration-200 hover:bg-[#D4AF37]/15"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15">
                <Phone size={20} className="text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">{pick(bookingModal, "phoneLabel", lang)}</p>
                <p className="font-semibold text-[#07172E]">{settings.phone}</p>
              </div>
              <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-[#07172E]">
                {pick(bookingModal, "callNow", lang)}
              </span>
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 transition-colors duration-200 hover:bg-[#F8F9FB]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#07172E]/8">
                <Mail size={20} className="text-[#07172E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wide text-gray-500">{pick(bookingModal, "emailLabel", lang)}</p>
                <p className="font-semibold text-[#07172E] truncate">{settings.email}</p>
              </div>
              <span className="shrink-0 rounded-full border border-[#07172E]/20 px-4 py-2 text-xs font-semibold text-[#07172E]">
                {pick(bookingModal, "emailUs", lang)}
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#07172E]/8">
                <Clock size={20} className="text-[#07172E]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{pick(bookingModal, "hoursLabel", lang)}</p>
                <p className="font-semibold text-[#07172E]">{pick(navbar, "workingHours", lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
