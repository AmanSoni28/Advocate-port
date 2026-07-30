"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

export default function MediaGrid() {
  const { lang } = useLanguage();
  const { latestUpdates } = useHomeContent();
  const items = latestUpdates.media || [];

  return (
    <section className="relative py-16 bg-white overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      <div className="container relative">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item._id || index}
              className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_50px_rgba(7,23,46,.1)]"
            >
              <div className="relative h-52">
                <Image
                  src={imageUrl(item.imageId) || "/images/media1.png"}
                  alt={pick(item, "title", lang)}
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-white/0 opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:bg-white/10 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[2px] text-[#D4AF37] font-semibold">
                  {item.date}
                </p>
                <h3 className="mt-2 font-semibold leading-6 text-[#07172E] text-lg">
                  {pick(item, "title", lang)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
