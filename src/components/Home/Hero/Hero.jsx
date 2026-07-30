"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Scale, ShieldCheck, BriefcaseBusiness } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useBookingModal } from "@/context/BookingModalContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

export default function Hero() {
  const { lang } = useLanguage();
  const { openModal } = useBookingModal();
  const { hero } = useHomeContent();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0">
        {/* Desktop image */}
        <Image
          src={imageUrl(hero.bgImageId) || "/images/hero_bg.png"}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover opacity-100 brightness-[0.9] motion-hero-image"
        />

        {/* Mobile image */}
        <Image
          src={imageUrl(hero.bgMobileImageId) || "/images/hero-mobile.png"}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover opacity-100 brightness-[0.9] motion-hero-image"
        />
      </div>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-[#07172E]/15"></div>

      {/* Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#07172E]/35 via-[#07172E]/15 to-transparent"></div>

      {/* Content */}

      <div className="container relative z-20">
        <div className="grid lg:grid-cols-2 items-center min-h-screen pt-12 pb-20 gap-12">
          {/* LEFT */}

          <div>
            <h1 className="motion-rise heading-font text-white text-4xl sm:text-5xl lg:text-7xl leading-tight font-bold">
              {pick(hero, "line1", lang)}

              <br />

              <span className="text-[#D4AF37]">
                {pick(hero, "line2", lang)}
              </span>

              <br />

              {pick(hero, "line3", lang)}
            </h1>

            <p className="motion-rise mt-8 text-lg sm:text-xl font-semibold text-white" style={{ animationDelay: "120ms" }}>
              {pick(hero, "subtitle", lang)}
            </p>

            <p className="motion-rise mt-6 text-gray-300 leading-8 max-w-xl" style={{ animationDelay: "220ms" }}>
              {pick(hero, "paragraph", lang)}
            </p>

            {/* Buttons */}

            <div className="motion-rise mt-10 flex flex-wrap gap-5" style={{ animationDelay: "320ms" }}>
              <button
                type="button"
                onClick={openModal}
                className="motion-gold-pulse bg-[#D4AF37] hover:bg-[#bf9830] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-[#07172E] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
              >
                <CalendarDays size={20} />

                {pick(hero, "scheduleConsultation", lang)}
              </button>

              <Link
                href="/practice-areas"
                className="border-2 border-[#D4AF37] bg-[#D4AF37] !text-gray-900 hover:bg-[#bf9830] active:bg-[#bf9830] active:scale-[.98] focus-visible:bg-[#bf9830] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5CB5C] transition-all duration-300 hover:-translate-y-1 px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-3 font-semibold w-full sm:w-auto"
              >
                {pick(hero, "viewPracticeAreas", lang)}

                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="relative flex justify-center lg:justify-end items-center">
            {/* Cards */}

            <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-5">
              <div className="motion-rise bg-[#081B36]/75 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl px-6 py-5 flex items-center gap-4 shadow-2xl transition-transform duration-300 hover:-translate-x-2" style={{ animationDelay: "300ms" }}>
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <ShieldCheck size={26} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {pick(hero.cards, "clientFirstTitle", lang)}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {pick(hero.cards, "clientFirstSub", lang)}
                  </p>
                </div>
              </div>

              <div className="motion-rise bg-[#081B36]/75 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl px-6 py-5 flex items-center gap-4 shadow-2xl transition-transform duration-300 hover:-translate-x-2" style={{ animationDelay: "420ms" }}>
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Scale size={26} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {pick(hero.cards, "ethicalTitle", lang)}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {pick(hero.cards, "ethicalSub", lang)}
                  </p>
                </div>
              </div>

              <div className="motion-rise bg-[#081B36]/75 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl px-6 py-5 flex items-center gap-4 shadow-2xl transition-transform duration-300 hover:-translate-x-2" style={{ animationDelay: "540ms" }}>
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <BriefcaseBusiness size={26} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {pick(hero.cards, "strategicTitle", lang)}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {pick(hero.cards, "strategicSub", lang)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
