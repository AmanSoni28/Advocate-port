"use client";

import Image from "next/image";
import {
  CalendarDays,
  ShieldCheck,
  Scale,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useBookingModal } from "@/context/BookingModalContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

const featureIcons = [CalendarDays, ShieldCheck, Scale];

export default function ConsultationBanner() {
  const { lang } = useLanguage();
  const { openModal } = useBookingModal();
  const { consultationBanner } = useHomeContent();
  const features = consultationBanner.features || [];

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0" />
      <div className="container relative z-10">
        <div className="group relative overflow-hidden rounded-[28px] border border-[#D4AF37]/20 bg-[#07172E]  transition-colors duration-300 hover:border-[#D4AF37]/40">

          <div className="pointer-events-none absolute inset-0 bg-white/[0.03] backdrop-blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative grid items-center gap-4 lg:grid-cols-[minmax(280px,33%)_minmax(320px,44%)_minmax(220px,23%)]">
            <div className="flex items-center gap-5 px-6 py-5">
              <div className="relative w-[120px] h-[78px] rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-sm">
                <Image
                  src={imageUrl(consultationBanner.bgImageId) || "/images/banner-scale.png"}
                  alt="Consultation"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-white text-[24px] font-bold leading-tight">
                  {pick(consultationBanner, "heading", lang)}
                </h2>
                <h3 className="mt-1 text-[#D4AF37] text-[16px] font-semibold">
                  {pick(consultationBanner, "subheading", lang)}
                </h3>
                <p className="mt-2 text-gray-300 text-sm leading-6 max-w-sm">
                  {pick(consultationBanner, "paragraph", lang)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/10 px-4 py-5 text-center">
              {featureIcons.map((Icon, index) => (
                <div
                  key={features[index]?._id || index}
                  className="flex flex-col items-center rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/5"
                >
                  <div className="relative w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Icon size={20} />
                  </div>
                  <h4 className="mt-4 text-white text-[14px] font-semibold">
                    {pick(features[index] || {}, "title", lang)}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-400">
                    {pick(features[index] || {}, "subtitle", lang)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center px-6 py-5">
              <button
                type="button"
                onClick={openModal}
                className="bg-[#D4AF37] hover:bg-[#c79e24] text-[#07172E] font-semibold text-[14px] px-7 py-4 rounded-lg shadow-xl transition-colors duration-300 whitespace-nowrap"
              >
                <span className="flex items-center gap-2">
                  {pick(consultationBanner, "cta", lang)}
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
