"use client";

import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { resolveIcon } from "@/lib/iconMap";

export default function ArticlesGrid() {
  const { lang } = useLanguage();
  const { latestUpdates } = useHomeContent();
  const items = latestUpdates.articles || [];

  return (
    <section className="relative py-16 bg-white overflow-hidden">

      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#07172E]/10 blur-[150px]" />

      <div className="container relative">

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => {
            const Icon = resolveIcon(item.icon);
            return (
              <div
                key={item._id || index}
                className="flex items-start gap-5 rounded-2xl border border-[#E5E7EB] bg-white px-7 py-7 transition-colors duration-300 hover:border-[#D4AF37]/40"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <Icon size={26} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-400">
                    {item.date}
                  </p>
                  <h3 className="mt-2 font-semibold leading-7 text-[#07172E] text-lg">
                    {pick(item, "title", lang)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
