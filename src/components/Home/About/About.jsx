"use client";

import Image from "next/image";
import { GraduationCap, BadgeCheck, Briefcase, Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";
import Reveal from "@/components/Shared/Reveal.jsx";

export default function About() {
  const { lang } = useLanguage();
  const { about } = useHomeContent();
  const timeline = about.timeline || [];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background Pattern */}

      <div className="absolute -left-36 -top-36 w-80 h-80 rounded-full"></div>

      <div className="absolute -right-36 bottom-0 w-80 h-80 rounded-full"></div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* LEFT IMAGE */}

          <Reveal className="relative lg:col-span-3">
            <div
              className="
  relative
  overflow-hidden
  rounded-2xl
  border
  border-[#D4AF37]/20
  shadow-xl
  aspect-[4/3] overflow-hidden rounded-2xl lg:h-[420px] lg:aspect-auto  "
            >
              <Image
                src={imageUrl(about.imageId) || "/images/About.png"}
                alt="About"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          {/* RIGHT CONTENT */}

          <Reveal className="lg:col-span-5" delay={100}>
            <span
              className="
              text-[#D4AF37]
              uppercase
              tracking-[3px]
              font-semibold
              text-sm
              "
            >
              {pick(about, "eyebrow", lang)}
            </span>

            <h2
              className="
              heading-font
              text-3xl
              md:text-4xl
              xl:text-[40px]
              leading-tight
              font-bold
              mt-4
              text-[#07172E]
              "
            >
              {pick(about, "name", lang)}
            </h2>

            <h4
              className="
              mt-4
              text-lg
              font-semibold
              text-gray-700
              "
            >
              {pick(about, "role", lang)}
            </h4>

            <p
              className="
              mt-6
              leading-8
              max-w-[520px]
              text-gray-600
              "
            >
              {pick(about, "bio", lang)}
            </p>

            <div className="mt-2 space-y-3">
              <div className="flex items-center gap-3">
                <GraduationCap size={16} className="text-[#D4AF37] shrink-0" />

                <p className="text-[15px] text-gray-700">
                  <span className="font-semibold text-[#07172E]">
                    {pick(about, "education", lang)}
                  </span>{" "}
                  {pick(about, "educationValue", lang)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck size={16} className="text-[#D4AF37] shrink-0" />

                <p className="text-[15px] text-gray-700">
                  <span className="font-semibold text-[#07172E]">
                    {pick(about, "enrollment", lang)}
                  </span>{" "}
                  {pick(about, "enrollmentValue", lang)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase size={16} className="text-[#D4AF37] shrink-0" />

                <p className="text-[15px] text-gray-700">
                  <span className="font-semibold text-[#07172E]">
                    {pick(about, "experience", lang)}
                  </span>{" "}
                  {pick(about, "experienceValue", lang)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Landmark size={16} className="text-[#D4AF37] shrink-0" />

                <p className="text-[15px] text-gray-700">
                  <span className="font-semibold text-[#07172E]">
                    {pick(about, "courts", lang)}
                  </span>{" "}
                  {pick(about, "courtsValue", lang)}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={200}>
            <div className="relative pl-2">
              <div className="absolute left-[25px] top-0 bottom-0 w-[2px] bg-[#D4AF37]/50"></div>

              {timeline.map((item, index) => (
                <div key={index} className="group relative flex gap-5 pb-8">
                  <div className="w-9 h-9 rounded-full border-2 border-[#D4AF37] bg-white flex justify-center items-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D4AF37]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></div>
                  </div>

                  <div>
                    <h3 className="text-[#D4AF37] font-bold text-xl">
                      {item.year}
                    </h3>

                    <p className="text-gray-700 mt-1">{pick(item, "title", lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
