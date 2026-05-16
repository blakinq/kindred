import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Caveat } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "kindred — plan something good",
  description:
    "A tiny shared workspace for whoever's bringing what — and who's actually coming.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
