import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "placeholder name — AI Competitive Intelligence for Pharma Strategy Teams",
  description:
    "An AI Competitive Intelligence platform that helps pharma strategy teams continuously monitor competitors, transform signals into strategic intelligence, and make better decisions with explainable, evidence-backed recommendations.",
  keywords: [
    "competitive intelligence",
    "pharma AI",
    "biotech strategy",
    "market intelligence",
    "competitive monitoring",
    "explainable AI",
    "scenario intelligence",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
