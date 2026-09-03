import type { Metadata } from "next";
import { WarGamingApp } from "@/components/war-gaming/WarGamingApp";

export const metadata: Metadata = {
  title: "War Gaming & Analog Analysis — Strategen",
  description:
    "Interactive prototype for competitive war gaming and historical analog analysis for pharma strategy teams.",
};

export default function WarGamingPage() {
  return <WarGamingApp />;
}
