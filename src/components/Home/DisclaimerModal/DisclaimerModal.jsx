"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";

export default function DisclaimerModal({ onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const { lang } = useLanguage();
  const { disclaimer } = useHomeContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07172E]/70 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-4xl max-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-white/60 bg-white/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(7,23,46,0.35)]">
        <div className="flex max-h-[calc(100vh-4rem)] flex-col overflow-hidden">

          <div className="border-b border-[#E5E7EB] px-6 py-7 sm:px-12 sm:py-9">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />
              <p className="text-xs uppercase tracking-[0.4em] font-semibold text-[#07172E]/70">
                {pick(disclaimer, "notice", lang)}
              </p>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#07172E]">{pick(disclaimer, "title", lang)}</h2>
          </div>

          <div className="space-y-5 overflow-y-auto px-6 py-7 sm:px-12 sm:py-9">
            <p className="text-[15px] leading-8 text-[#374151] sm:text-base">
              {pick(disclaimer, "paragraph1", lang)}
            </p>
            <p className="text-[15px] leading-8 text-[#4b5563] sm:text-base">
              {pick(disclaimer, "paragraph2", lang)}
            </p>
          </div>

          <div className="border-t border-[#E5E7EB] bg-white px-6 py-6 sm:px-12 sm:py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-[#07172E] sm:text-base">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="h-5 w-5 shrink-0 rounded border-[#9CA3AF] bg-white checked:bg-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>{pick(disclaimer, "accept", lang)}</span>
              </label>

              <button
                type="button"
                onClick={() => accepted && onAccept()}
                disabled={!accepted}
                className={`w-full sm:w-auto sm:px-10 rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors duration-200 ${
                  accepted
                    ? "bg-[#07172E] text-white hover:bg-[#0c2754]"
                    : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                }`}
              >
                {pick(disclaimer, "proceed", lang)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
