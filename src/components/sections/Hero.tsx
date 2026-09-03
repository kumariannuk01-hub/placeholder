"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoButton } from "@/components/demo/DemoButton";
import { IntelligenceNetwork } from "@/components/graphics/IntelligenceNetwork";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24">
      <IntelligenceNetwork />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl flex-col justify-center px-6 pb-20 pt-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-sm font-semibold tracking-[0.18em] text-blue uppercase"
        >
          Strategen
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-[3.75rem]"
        >
          AI Competitive Intelligence for Pharma Strategy Teams
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate md:text-lg md:leading-relaxed"
        >
          Continuously monitor the competitive landscape and turn complex
          signals into clear, evidence-backed recommendations for strategy
          teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <DemoButton size="lg">
            Book a Demo
            <ArrowRight size={16} />
          </DemoButton>
          <Button href="#platform" variant="secondary" size="lg">
            Explore Platform
          </Button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
