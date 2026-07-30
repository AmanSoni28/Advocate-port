"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "hi" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "hi" : "en"));

  const t = (key) => {
    const parts = key.split(".");
    let node = translations[lang];
    for (const part of parts) {
      node = node?.[part];
    }
    if (node === undefined) {
      let fallback = translations.en;
      for (const part of parts) {
        fallback = fallback?.[part];
      }
      return fallback ?? key;
    }
    return node;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
