"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DemoButton } from "@/components/demo/DemoButton";

export function FinalCTA() {
  return (
    <section id="demo" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,107,255,0.18),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-[1.1]"
        >
          Equip your strategy teams with
          <br />
          evidence-backed competitive intelligence.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
        >
          Continuously monitor the landscape, evaluate scenarios with
          transparent reasoning, and align Commercial, CI, Medical Affairs,
          Market Access, Brand, and Leadership around better decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-10"
        >
          <DemoButton size="lg" variant="inverse">
            Book a Demo
            <ArrowRight size={16} />
          </DemoButton>
        </motion.div>
      </div>
    </section>
  );
}
