"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  delay = 0,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`rounded-2xl border border-border bg-white/70 p-6 shadow-[0_1px_0_rgba(11,27,51,0.04)] backdrop-blur-xl md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
