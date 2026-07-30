"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { resolveIcon } from "@/lib/iconMap";

export default function PracticeArea({ showHeading = true }) {
  const { lang } = useLanguage();
  const { practice } = useHomeContent();
  const items = practice.items || [];

  return (
    <section className="relative pt-5 pb-10 overflow-hidden">
      <div
        className="
absolute
left-0
top-0
w-full
h-full
pointer-events-none
"
      ></div>

      <div className="absolute -top-40 right-0 w-[350px] h-[350px]"></div>

      <div className="absolute left-0 bottom-0 w-[300px] h-[300px]"></div>

      <div className="container">
        {/* Heading */}

        {showHeading && (
          <div className="motion-rise text-center mb-16">
            <span className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-semibold">
              {pick(practice, "eyebrow", lang)}
            </span>

            <h2
              className="
heading-font
text-3xl
md:text-4xl
xl:text-5xl
font-bold
text-[#07172E]
mt-4
leading-tight
"
            >
              {pick(practice, "heading", lang)}
            </h2>

            <p
              className="
max-w-2xl
mx-auto
mt-6
text-gray-600
leading-8
"
            >
              {pick(practice, "paragraph", lang)}
            </p>

            <div className="flex items-center justify-center mt-6 gap-3">
              <div className="w-20 h-[2px] bg-[#D4AF37]/30"></div>

              <div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>

              <div className="w-20 h-[2px] bg-[#D4AF37]/30"></div>
            </div>
          </div>
        )}

        {/* Grid */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map((item, index) => {
            const Icon = resolveIcon(item.icon);

            return (
              <Link
                key={item._id || index}
                href="/practice-areas"
                className="
group
motion-rise
relative
overflow-hidden
flex
items-center
gap-3
bg-white
rounded-xl
border
border-[#ECE7DA]
px-4
py-4
transition-all
duration-300
hover:border-[#D4AF37]
hover:shadow-[0_10px_30px_rgba(212,175,55,.14)]
hover:-translate-y-1
"
                style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}
              >
                <div
                  className="
pointer-events-none
absolute
inset-0
bg-white/0
opacity-0
backdrop-blur-[1px]
transition-opacity
duration-500
group-hover:bg-white/40
group-hover:opacity-100
"
                ></div>

                <Icon size={26} className="relative shrink-0 text-[#D4AF37]" />

                <div className="relative min-w-0">
                  <h3 className="font-semibold text-[#07172E] text-[14px] leading-snug">
                    {pick(item, "title", lang)}
                  </h3>

                  <p className="mt-0.5 text-[12px] leading-[1.4] text-gray-500">
                    {pick(item, "desc", lang)}
                  </p>
                </div>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[#D4AF37]/70"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
