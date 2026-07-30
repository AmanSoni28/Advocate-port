"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";
import { resolveIcon } from "@/lib/iconMap";

export default function LatestUpdates() {
  const { lang } = useLanguage();
  const { latestUpdates } = useHomeContent();
  const articleItems = latestUpdates.articles || [];
  const mediaItems = latestUpdates.media || [];
  const achievementItems = latestUpdates.achievements || [];

  return (
    <section className="relative py-10 bg-white overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full "></div>

      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full"></div>

      <div className="container">
        {/* Section Grid */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* ========================= */}
          {/* Latest Articles */}
          {/* ========================= */}

          <div
            className="
group
relative
bg-white
rounded-3xl
border
border-[#E5E7EB]
overflow-hidden
transition-colors
duration-300
hover:border-[#D4AF37]/40
            "
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />

            {/* Header */}

            <div className="relative flex items-center justify-between px-6 py-5 border-b">
              <div>
                <p className="text-xs uppercase tracking-[3px] text-[#D4AF37] font-semibold">
                  {pick(latestUpdates, "articlesEyebrow", lang)}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#07172E]">
                  {pick(latestUpdates, "articlesHeading", lang)}
                </h2>
              </div>

              <Link
                href="/articles"
                className="
flex
items-center
gap-2
px-4
py-2
rounded-full
border
border-[#D4AF37]
text-sm
font-medium
text-[#07172E]
transition-colors
duration-300
hover:bg-[#D4AF37]
"
              >
                {pick(latestUpdates, "viewAll", lang)}
              </Link>
            </div>

            {/* Body */}

            <div className="relative p-6 pt-2 pb-4">
              <div>
                {articleItems.map((item, index) => {
                  const Icon = resolveIcon(item.icon);

                  return (
                    <div key={item._id || index}>
                      <Link
                        href="/articles"
                        className="
        flex
        items-start
        gap-4
        rounded-xl
        p-3
        transition-colors
        duration-300
        hover:bg-[#D4AF37]/10
        cursor-pointer
        "
                      >
                        <div className="w-11 h-11 rounded-full  flex justify-center items-center shrink-0">
                          <Icon size={20} className="text-[#D4AF37]" />
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">{item.date}</p>

                          <h3 className="mt-1 font-semibold leading-6 text-[#07172E]">
                            {pick(item, "title", lang)}
                          </h3>
                        </div>
                      </Link>
                      {index !== articleItems.length - 1 && (
                        <div className="border-b border-[#ECECEC] mt-4"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* Media & News */}
          {/* ========================= */}

          <div
            className="
group
relative
bg-white
rounded-3xl
border
border-[#E5E7EB]
overflow-hidden
transition-colors
duration-300
hover:border-[#D4AF37]/40
            "
          >
            <div className="pointer-events-none absolute inset-0 bg-[#D4AF37]/[0.03] opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-2xl font-bold text-[#07172E]">
                {pick(latestUpdates, "mediaHeading", lang)}
              </h2>

              <Link
                href="/media"
                className="
flex
items-center
gap-2
px-4
py-2
rounded-full
border
border-[#D4AF37]
text-sm
font-medium
text-[#07172E]
transition-colors
duration-300
hover:bg-[#D4AF37]
"
              >
                {pick(latestUpdates, "viewAll", lang)}
              </Link>
            </div>

            <div className="relative p-6">
              <div className="space-y-6">
                {mediaItems.map((item, index) => (
                  <div key={item._id || index}>
                    <Link
                      href="/media"
                      className="
      flex
      gap-4
      rounded-xl
      overflow-hidden
      cursor-pointer
      "
                    >
                      <div
                        className="
overflow-hidden
rounded-xl
shrink-0
"
                      >
                        <img
                          src={imageUrl(item.imageId) || "/images/media1.png"}
                          alt={pick(item, "title", lang)}
                          className="
w-[120px]
h-[78px]
object-cover
"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold leading-6 text-[#07172E]">
                          {pick(item, "title", lang)}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          {item.date}
                        </p>
                      </div>
                    </Link>

                    {index !== mediaItems.length - 1 && (
                      <div className="border-b border-[#ECECEC] mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* Achievements */}
          {/* ========================= */}

          <div
            className="
group
relative
bg-white
rounded-3xl
border
border-[#E5E7EB]
overflow-hidden
transition-colors
duration-300
hover:border-[#D4AF37]/40
            "
          >
            <div className="pointer-events-none absolute inset-0  opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-2xl font-bold text-[#07172E]">
                {pick(latestUpdates, "achievementsHeading", lang)}
              </h2>

              <Link
                href="/about#recognitions"
                className="
flex
items-center
gap-2
px-4
py-2
rounded-full
border
border-[#D4AF37]
text-sm
font-medium
text-[#07172E]
transition-colors
duration-300
hover:bg-[#D4AF37]
"
              >
                {pick(latestUpdates, "viewAll", lang)}
              </Link>
            </div>

            <div className="relative p-6">
              <div className="space-y-7">
                {achievementItems.map((item, index) => {
                  const Icon = resolveIcon(item.icon);

                  return (
                    <div key={item._id || index}>
                      <Link
                        href="/about#recognitions"
                        className="
        flex
        justify-between
        gap-4
        items-start
        "
                      >
                        <div className="flex gap-4">
                          <div
                            className="w-12 h-12 rounded-full bg-gradient-to-br
from-[#D4AF37]/20
to-[#D4AF37]/5 flex justify-center items-center shrink-0"
                          >
                            <Icon size={24} className="text-[#D4AF37]" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-[#07172E]">
                              {pick(item, "title", lang)}
                            </h3>

                            <p className="mt-1 text-gray-500 text-sm leading-6">
                              {pick(item, "desc", lang)}
                            </p>
                          </div>
                        </div>

                        <span className="text-[#D4AF37] font-bold">
                          {item.year}
                        </span>
                      </Link>

                      {index !== achievementItems.length - 1 && (
                        <div className="border-b border-[#ECECEC] mt-5"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
