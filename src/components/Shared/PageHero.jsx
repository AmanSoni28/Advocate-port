"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

export default function PageHero({ pageKey }) {
  const { lang } = useLanguage();
  const { pageHero, navbar } = useHomeContent();
  const entry = pageHero?.[pageKey] || {};

  const eyebrow = pick(entry, "eyebrow", lang);
  const title = pick(entry, "title", lang);
  const subtitle = pick(entry, "subtitle", lang);
  const current = pick(entry, "current", lang);
  const backgroundImage = imageUrl(entry.backgroundImageId);

  return (
    <section className="relative overflow-hidden bg-[#07172E] py-16 sm:py-20">
      {backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[#07172E]/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07172E]/90 " />
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.08),transparent_45%)]" />

      <div className="container relative z-10">
        {eyebrow && (
          <span className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-semibold">
            {eyebrow}
          </span>
        )}

        <h1 className="heading-font mt-4 text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-gray-300 leading-8">
            {subtitle}
          </p>
        )}

        <div className="mt-7 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors duration-200">
            {pick(navbar.navLinks, "home", lang)}
          </Link>
          <ChevronRight size={14} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37]">{current}</span>
        </div>
      </div>
    </section>
  );
}
