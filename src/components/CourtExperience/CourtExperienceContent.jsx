"use client";

import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { resolveIcon } from "@/lib/iconMap";

export default function CourtExperienceContent() {
  const { lang } = useLanguage();
  const { courtExperiencePage } = useHomeContent();
  const courts = courtExperiencePage.courts || [];
  const process = courtExperiencePage.process || [];

  return (
    <>
      {/* Courts Practiced */}

      <section className="relative py-16 bg-[#07172E] overflow-hidden">

        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

        <div className="container relative">

          <div className="text-center mb-14">
            <span className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-semibold">
              {pick(courtExperiencePage, "courtsEyebrow", lang)}
            </span>
            <h2 className="heading-font text-3xl md:text-4xl xl:text-5xl font-bold text-white mt-4">
              {pick(courtExperiencePage, "courtsHeading", lang)}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courts.map((item, index) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div
                  key={item._id || index}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-xl transition-colors duration-300 hover:bg-white/10 hover:border-[#D4AF37]/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                    <Icon size={22} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{pick(item, "name", lang)}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-300">{pick(item, "desc", lang)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Litigation Process */}

      <section className="relative py-16 bg-white overflow-hidden">

        <div className="absolute -top-40 right-0 w-[350px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[130px]" />

        <div className="container relative">

          <div className="text-center mb-14">
            <span className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-semibold">
              {pick(courtExperiencePage, "processEyebrow", lang)}
            </span>
            <h2 className="heading-font text-3xl md:text-4xl xl:text-5xl font-bold text-[#07172E] mt-4">
              {pick(courtExperiencePage, "processHeading", lang)}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((item, index) => (
              <div
                key={item._id || index}
                className="relative rounded-2xl border border-[#ECE7DA] bg-white px-6 py-7 transition-colors duration-300 hover:border-[#D4AF37]"
              >
                <span className="heading-font text-4xl font-bold text-[#D4AF37]/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold text-[#07172E] text-lg">
                  {pick(item, "title", lang)}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-gray-500">
                  {pick(item, "desc", lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
