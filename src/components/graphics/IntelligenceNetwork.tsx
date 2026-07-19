"use client";

import { motion } from "framer-motion";

export function IntelligenceNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-blue/[0.07] blur-3xl" />
      <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-navy/[0.04] blur-3xl" />

      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[18, 36, 54, 72].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgba(11, 27, 51, 0.06)"
            strokeWidth="0.15"
          />
        ))}
        {[20, 40, 60, 80].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="rgba(11, 27, 51, 0.05)"
            strokeWidth="0.15"
          />
        ))}
      </svg>

      <motion.div
        className="absolute left-[18%] top-[30%] h-px w-40 bg-gradient-to-r from-transparent via-blue/25 to-transparent"
        animate={{ opacity: [0.2, 0.55, 0.2], x: [0, 24, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[16%] top-[48%] h-px w-48 bg-gradient-to-r from-transparent via-navy/15 to-transparent"
        animate={{ opacity: [0.15, 0.45, 0.15], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
