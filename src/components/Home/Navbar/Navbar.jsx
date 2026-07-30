"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {Phone,Mail,Clock,CalendarDays,Menu,X,Scale} from "lucide-react";
import navLinks from "./navLinks";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useBookingModal } from "@/context/BookingModalContext.jsx";
import { useHomeContent, useSiteSettings } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const { openModal } = useBookingModal();
  const { navbar } = useHomeContent();
  const settings = useSiteSettings();
  const pathname = usePathname();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const scroll = () => {
      setSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}

      <div className="hidden lg:block bg-[#07172E] text-white border-b border-[#D4AF37]/20">

        <div className="container flex justify-between items-center h-10 text-sm">

          <div className="flex items-center gap-8">

            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-200">
              <Phone size={15} className="text-[#D4AF37]" />
              {settings.phone}
            </a>

            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-200">
              <Mail size={15} className="text-[#D4AF37]" />
              {settings.email}
            </a>

          </div>

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[#D4AF37]" />
              {pick(navbar, "workingHours", lang)}
            </div>

            <button
              type="button"
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1 rounded-full border border-[#D4AF37]/40 px-1 py-1 text-xs font-semibold"
            >
              <span
                className={`px-2 py-1 rounded-full transition-colors duration-200 ${
                  lang === "hi" ? "bg-[#D4AF37] text-[#07172E]" : "text-white/70"
                }`}
              >
                हिं
              </span>
              <span
                className={`px-2 py-1 rounded-full transition-colors duration-200 ${
                  lang === "en" ? "bg-[#D4AF37] text-[#07172E]" : "text-white/70"
                }`}
              >
                English
              </span>
            </button>

          </div>

        </div>

      </div>

      {/* NAVBAR */}

      <nav
        className={`w-full z-50 transition-all duration-300 ${
          sticky
            ? "fixed top-0 bg-[#07172E]/95 backdrop-blur-md shadow-xl"
            : "relative bg-[#07172E]"
        }`}
      >

        <div className="container flex items-center justify-between h-[85px]">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-3 shrink-0 w-[290px]">

            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">

              <Scale size={28} strokeWidth={1.75} />

            </div>

            <div className="leading-tight">

              <h2 className="text-white text-xs font-semibold tracking-wider">

                {pick(navbar, "eyebrow", lang)}

              </h2>

              <h1 className="text-white text-[18px] font-bold leading-5">

                {pick(navbar, "firstName", lang)}

              </h1>

              <h3 className="text-white text-[16px] font-semibold">

                {pick(navbar, "lastName", lang)}

              </h3>

            </div>

          </Link>

          {/* Desktop */}

          <div className="hidden xl:flex flex-1 justify-center items-center gap-6">

            {navLinks.map((item) => {
              const active = isActive(item.href);

              return (

              <Link
                key={item.key}
                href={item.href}
                className={`relative text-[14px] font-medium tracking-wide transition-all duration-300 group ${
                  active ? "!text-[#D4AF37]" : "!text-white hover:text-[#D4AF37]"
                }`}
              >
                {pick(navbar.navLinks, item.key, lang)}

                <span
                  className={`absolute left-0 -bottom-2 h-[2px] bg-[#D4AF37] duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>

              </Link>

              );
            })}

          </div>

          {/* Button */}

          <div className="hidden xl:flex items-center gap-4 shrink-0">

            <button
              type="button"
              onClick={openModal}
              className="bg-[#D4AF37] text-[#07172E] px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#c89b2f] transition-colors duration-300"
            >

              <CalendarDays size={18} />

              {pick(navbar, "bookConsultation", lang)}

            </button>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white"
          >

            {menuOpen ? <X size={30} /> : <Menu size={30} />}

          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div className="lg:hidden bg-[#07172E]">

            <div className="flex flex-col py-6">

              {navLinks.map((item) => {
                const active = isActive(item.href);

                return (

                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-6 py-4 border-l-2 transition-colors duration-200 ${
                    active
                      ? "!text-[#D4AF37] bg-[#0f2748] border-[#D4AF37]"
                      : "!text-white border-transparent hover:bg-[#0f2748]"
                  }`}
                >

                  {pick(navbar.navLinks, item.key, lang)}

                </Link>

                );
              })}

              <div className="px-6 mt-4">

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openModal();
                  }}
                  className="block w-full text-center bg-[#D4AF37] text-[#07172E] py-3 rounded-xl font-semibold text-sm"
                >

                  {pick(navbar, "bookConsultation", lang)}

                </button>

              </div>

            </div>

          </div>

        )}

      </nav>
    </>
  );
}
