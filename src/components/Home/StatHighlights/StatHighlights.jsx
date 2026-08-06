"use client";

import {
  Users,
  Briefcase,
  Scale,
  Clock3,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import Reveal from "@/components/Shared/Reveal.jsx";

const statIcons = [Users, Briefcase, Scale, Clock3, Building2];
const statKeys = [
  "clientsAssisted",
  "casesHandled",
  "practiceAreas",
  "yearsExcellence",
  "highCourt",
];

export default function StatHighlights({ overlap = true }) {
  const { lang } = useLanguage();
  const { stats } = useHomeContent();
  const statValues = stats.values || [];

  return (
    <section
      className={`relative z-10 ${
        overlap ? "-mt-16 sm:-mt-20" : "py-8 sm:py-12"
      }`}
    >
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/60 bg-[#07172E] shadow-2xl px-2 sm:px-6">
          <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x sm:divide-white/10 lg:grid-cols-5">
            {statKeys.map((key, index) => {
              const Icon = statIcons[index];
              return (
                <div
                  key={key}
                  className="group flex items-center gap-4 px-6 py-7 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <Icon className="h-7 w-7 shrink-0 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  {/* Text */}
                  <div>
                    {statValues[index] && (
                      <p className="text-3xl font-bold text-white sm:text-4xl">
                        {statValues[index]}
                      </p>
                    )}

                    <p className="mt-1 text-xs font-medium uppercase tracking-[1px] text-[#e5e7eb] sm:text-sm">
                      {pick(stats, key, lang)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}


