"use client";

import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { resolveIcon } from "@/lib/iconMap";

export default function Recognitions() {
  const { lang } = useLanguage();
  const { recognitions, latestUpdates } = useHomeContent();
  const items = latestUpdates.achievements || [];

  return (
    <section id="recognitions" className="relative py-16 bg-white scroll-mt-24 overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[150px]"></div>

      <div className="container relative">

        <div className="text-center mb-14">
          <span className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-semibold">
            {pick(recognitions, "eyebrow", lang)}
          </span>
          <h2 className="heading-font text-3xl md:text-4xl xl:text-5xl font-bold text-[#07172E] mt-4">
            {pick(recognitions, "heading", lang)}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = resolveIcon(item.icon);
            return (
              <div
                key={item._id || index}
                className="group relative overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white p-7 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_18px_40px_rgba(212,175,55,.14)]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl border border-[#D4AF37]/20 bg-white flex items-center justify-center">
                    <Icon size={26} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-[#D4AF37] font-bold text-lg">
                    {item.year}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold text-[#07172E] text-lg">
                  {pick(item, "title", lang)}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-gray-500">
                  {pick(item, "desc", lang)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
