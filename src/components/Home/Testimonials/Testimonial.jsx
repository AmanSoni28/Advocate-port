"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { lang } = useLanguage();
  const { testimonials } = useHomeContent();
  const items = testimonials.items || [];

  return (
    <section className="relative py-10 bg-[#07172E] overflow-hidden">
      {/* Background Blur */}

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      <div className="container relative z-10">
        {/* Heading */}

        <div className="text-center">
          <span className="uppercase tracking-[4px] text-[#D4AF37] font-semibold text-sm">
            {pick(testimonials, "eyebrow", lang)}
          </span>

          <h2 className="heading-font text-4xl md:text-5xl text-white mt-4">
            {pick(testimonials, "heading", lang)}
          </h2>
        </div>

        {/* Slider */}

        <div className="relative mt-8 px-14 sm:px-20">
          {/* Left */}

          <button
            ref={prevRef}
            className="
            flex
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-20
            w-11
            h-11
            rounded-full
            text-gray-300
            bg-white/5
            hover:bg-[#D4AF37]
            hover:text-[#07172E]
            transition-colors
            duration-300
            justify-center
            items-center
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right */}

          <button
            ref={nextRef}
            className="
            flex
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-20
            w-11
            h-11
            rounded-full
            text-gray-300
            bg-white/5
            hover:bg-[#D4AF37]
            hover:text-[#07172E]
            transition-colors
            duration-300
            justify-center
            items-center
            "
          >
            <ChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            speed={500}
            grabCursor={true}
            pagination={{ clickable: true }}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="pb-2"
          >
            {items.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <div className="mx-auto max-w-2xl px-2 text-center">
                  <Quote
                    className="mx-auto h-7 w-7 text-[#D4AF37]/40"
                    strokeWidth={1.5}
                  />

                  {/* Stars */}

                  <div className="mt-3 flex justify-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="#D4AF37"
                        className="text-[#D4AF37]"
                      />
                    ))}
                  </div>

                  {/* Message */}

                  <p className="mt-4 text-lg sm:text-xl leading-relaxed text-gray-100">
                    "{pick(item, "message", lang)}"
                  </p>

                  {/* Client */}

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-gray-400">
                    {pick(item, "role", lang)}, {item.location}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 mt-2 !text-[#D4AF37] font-semibold transition-colors duration-300"
          >
            {pick(testimonials, "viewAll", lang)} →
          </Link>
        </div>
      </div>
    </section>
  );
}
