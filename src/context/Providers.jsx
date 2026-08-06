"use client";

import { LanguageProvider } from "@/context/LanguageContext.jsx";
import { BookingModalProvider } from "@/context/BookingModalContext.jsx";
import BookingModal from "@/components/Shared/BookingModal.jsx";
import { HomeContentProvider } from "@/components/HomeContentProvider.jsx";

export default function Providers({ home, settings, consultationForm, children }) {
  return (
    <HomeContentProvider home={home} settings={settings} consultationForm={consultationForm}>
      <LanguageProvider>
        <BookingModalProvider>
          {children}
          <BookingModal />
        </BookingModalProvider>
      </LanguageProvider>
    </HomeContentProvider>
  );
}
