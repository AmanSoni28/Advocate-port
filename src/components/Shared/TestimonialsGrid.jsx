"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";

export default function TestimonialsGrid() {
  const { lang } = useLanguage();
  const { testimonials } = useHomeContent();
  const items = testimonials.items || [];

  return (
    <section className="relative py-16 bg-[#07172E] overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      <div className="container relative">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item._id || index}
              className="rounded-2xl bg-white/5 backdrop-blur-2xl border border-[#D4AF37]/20 p-6 transition-colors duration-300 hover:bg-white/10 hover:border-[#D4AF37] hover:shadow-[0_20px_60px_rgba(212,175,55,.12)]"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={17} fill="#D4AF37" className="text-[#D4AF37]" />
                ))}
              </div>

              <p className="text-gray-300 leading-8">&quot;{pick(item, "message", lang)}&quot;</p>

              <div className="mt-8 pt-6 border-t border-[#D4AF37]/20">
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="text-[#D4AF37] mt-1">{pick(item, "role", lang)}</p>
                <span className="text-sm text-gray-400">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
