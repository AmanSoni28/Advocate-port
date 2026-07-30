"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

export default function CaseStudiesContent() {
  const { lang } = useLanguage();
  const { featuredCases, caseStudiesPage } = useHomeContent();
  const items = featuredCases.items || [];
  const outcome = pick(caseStudiesPage, "outcome", lang);

  return (
    <section className="relative py-16 bg-white overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[150px]" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-[#07172E]/10 blur-[150px]" />

      <div className="container relative">

        <div className="grid gap-8 lg:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item._id || index}
              className="group grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-[0_15px_45px_rgba(0,0,0,.08)] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_25px_60px_rgba(212,175,55,.16)]"
            >
              <div className="relative h-56 sm:h-full min-h-[220px]">
                <Image
                  src={imageUrl(item.imageId) || "/images/case1.png"}
                  alt={pick(item, "title", lang)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07172E]/40 to-transparent" />
              </div>

              <div className="p-7 flex flex-col justify-center">
                {pick(item, "tag", lang) && (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                    {pick(item, "tag", lang)}
                  </span>
                )}
                <h3 className="mt-4 text-[#07172E] font-bold text-xl">
                  {pick(item, "title", lang)}
                </h3>
                <p className="mt-3 leading-7 text-gray-600 text-[15px]">
                  {pick(item, "desc", lang)}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[#D4AF37] font-semibold">
                  <CheckCircle2 size={18} />
                  {outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
