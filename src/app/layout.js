import { Poppins, Playfair_Display } from "next/font/google";
import Providers from "@/context/Providers.jsx";
import { getConsultationForm, getHomeContent, getSiteSettings } from "@/lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets:["latin"],
  weight:["300","400","500","600","700"],
  variable:"--font-poppins"
});

const playfair = Playfair_Display({
  subsets:["latin"],
  weight:["400","500","600","700","800"],
  variable:"--font-playfair"
});

export const metadata={
  title:"Advocate | Shashank Shekhar Tripathi",
  description:"Trusted legal counsel for civil, criminal, family, property and constitutional matters"
}

export default async function RootLayout({children}){
  const [home, settings, consultationForm] = await Promise.all([getHomeContent(), getSiteSettings(), getConsultationForm()]);

  return(
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${poppins.variable} ${playfair.variable}`}>
        <Providers home={home} settings={settings} consultationForm={consultationForm}>{children}</Providers>
      </body>
    </html>
  )
}
