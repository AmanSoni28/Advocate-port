"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent, useSiteSettings } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const { contactSection } = useHomeContent();
  const settings = useSiteSettings();

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-10 scroll-mt-24">
      <div className="pointer-events-none absolute -left-28 -top-28 h-105 w-105 rounded-full" />
      <div className="pointer-events-none absolute -right-28 -bottom-28 h-105 w-105 rounded-full" />

      <div className="container">
        <div className="relative overflow-hidden rounded-4xl bg-[#07172E] px-4 py-6 shadow-[0_30px_90px_rgba(7,23,46,.16)] sm:px-6 lg:px-8 lg:py-10">
          <div className="relative grid gap-7 lg:grid-cols-[minmax(280px,30%)_minmax(360px,40%)_minmax(280px,30%)]">
            <div className="group relative overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white px-8 py-9 shadow-[0_30px_70px_rgba(7,23,46,.08)] transition-colors duration-300 hover:border-[#D4AF37]/30">
              <div className="pointer-events-none absolute inset-0 bg-[#D4AF37]/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <span className="text-xs uppercase tracking-[3px] text-[#D4AF37] font-semibold">{pick(contactSection, "eyebrow", lang)}</span>
                <h2 className="mt-4 text-3xl font-bold text-[#07172E]">{pick(contactSection, "heading", lang)}</h2>
                <div className="mt-8 space-y-5">
                  <ContactItem
                    icon={<MapPin size={20} className="text-[#D4AF37]" />}
                    label={pick(contactSection, "address", lang)}
                    value={settings.address}
                  />
                  <ContactItem
                    icon={<Phone size={20} className="text-[#D4AF37]" />}
                    label={pick(contactSection, "phone", lang)}
                    value={settings.phone}
                  />
                  <ContactItem
                    icon={<Mail size={20} className="text-[#D4AF37]" />}
                    label={pick(contactSection, "email", lang)}
                    value={settings.email}
                  />
                  <ContactItem
                    icon={<Clock size={20} className="text-[#D4AF37]" />}
                    label={pick(contactSection, "workingHours", lang)}
                    value={pick(contactSection, "workingHoursValue", lang)}
                  />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0c2754]/90 backdrop-blur-md shadow-sm transition-colors duration-300 hover:border-[#D4AF37]/30">
              <div className="relative h-70 sm:h-75 lg:h-full">
                <iframe
                  title="Office Location"
                  src={settings.mapsEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0c2754]/90 backdrop-blur-md shadow-sm transition-colors duration-300 hover:border-[#D4AF37]/30">
              <div className="relative h-70 sm:h-75 lg:h-full">
                <Image
                  src={imageUrl(contactSection.imageId) || "/images/office.png"}
                  alt="Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#07172E]/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-1 px-2 text-center text-[11px] leading-5 text-white/80 sm:flex-row sm:gap-3 sm:px-3 sm:text-base">
            <span>{pick(contactSection, "rights", lang)}</span>
            <span className="hidden sm:inline">•</span>
            <span>{t("contactSection.developedBy")}</span>
            <a
              href="https://bootboost.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-4 transition-colors duration-300 hover:text-[#f2d36a]"
            >
              Boot & Boost Entrepreneur LLP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-linear-to-br from-[#D4AF37]/20 to-[#D4AF37]/5">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[#07172E]">{label}</h4>
        <p className="mt-1 text-sm leading-6 text-[#6b7280]">{value}</p>
      </div>
    </div>
  );
}
