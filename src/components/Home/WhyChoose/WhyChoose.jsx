"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { resolveIcon } from "@/lib/iconMap";

export default function WhyChoose() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { lang } = useLanguage();
  const { whyChoose } = useHomeContent();
  const items = whyChoose.items || [];

  return (
    <section className=" bg-white">

      <div className="container">

        <div className="motion-rise relative overflow-hidden rounded-2xl bg-[#07172E] border border-[#D4AF37]/20 px-4 lg:px-20">

          {/* Heading */}

          <div className="pt-6 pb-2">

            <h4 className="text-center uppercase tracking-[3px] text-white text-sm font-semibold">

              {pick(whyChoose, "heading", lang)}

            </h4>

          </div>

          {/* Left Arrow */}

          <button
            ref={prevRef}
            className="
            hidden lg:flex
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            z-20
            w-12
            h-12
            rounded-full
            border
            border-[#D4AF37]
            text-[#D4AF37]
            items-center
            justify-center
            hover:bg-[#D4AF37]
            hover:text-[#07172E]
            transition-colors
            duration-300
            "
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow */}

          <button
            ref={nextRef}
            className="
            hidden lg:flex
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            z-20
            w-12
            h-12
            rounded-full
            border
            border-[#D4AF37]
            text-[#D4AF37]
            items-center
            justify-center
            hover:bg-[#D4AF37]
            hover:text-[#07172E]
            transition-colors
            duration-300
            "
          >
            <ChevronRight size={22} />
          </button>

          {/* Swiper */}

          <Swiper
            modules={[Navigation]}
            loop={true}
            spaceBetween={0}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {items.map((item, index) => {
              const Icon = resolveIcon(item.icon);

              return (
                <SwiperSlide key={item._id || index}>

                  <div
                    className="
                    group
                    h-full
                    px-8
                    py-10
                    border-r
                    border-[#D4AF37]/10
                    transition-all
                    duration-300
                    hover:bg-white/5
                    hover:backdrop-blur-xl
                    hover:-translate-y-1
                    "
                  >

                    <div className="flex gap-5">

                      <div
                        className="
                        w-14
                        h-14
                        rounded-xl
                        bg-[#D4AF37]/10
                        flex
                        items-center
                        justify-center
                        transition-transform
                        duration-300
                        group-hover:rotate-6
                        group-hover:scale-110
                        "
                      >

                        <Icon
                          size={28}
                          className="
                          text-[#D4AF37]
                          "
                        />

                      </div>

                      <div>

                        <h3 className="text-white font-semibold text-lg">

                          {pick(item, "title", lang)}

                        </h3>

                        <p className="text-gray-300 text-sm leading-7 mt-3">

                          {pick(item, "desc", lang)}

                        </p>

                      </div>

                    </div>

                  </div>

                </SwiperSlide>
              );
            })}
          </Swiper>

        </div>

      </div>

    </section>
  );
}
