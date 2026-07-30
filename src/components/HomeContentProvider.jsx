"use client";

import { createContext, useContext } from "react";

const HomeContentContext = createContext(null);

export function HomeContentProvider({ home, settings, children }) {
  return (
    <HomeContentContext.Provider value={{ home, settings }}>
      {children}
    </HomeContentContext.Provider>
  );
}

export function useHomeContent() {
  const ctx = useContext(HomeContentContext);
  if (!ctx) {
    throw new Error("useHomeContent must be used within HomeContentProvider");
  }
  return ctx.home;
}

export function useSiteSettings() {
  const ctx = useContext(HomeContentContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within HomeContentProvider");
  }
  return ctx.settings;
}
