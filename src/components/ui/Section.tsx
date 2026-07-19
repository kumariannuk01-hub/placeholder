"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
}

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  eyebrow,
  title,
  description,
  align = "center",
}: SectionProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className={`mx-auto w-full max-w-6xl px-6 ${containerClassName}`}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-14 max-w-3xl ${alignClass}`}
          >
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-navy md:text-5xl md:leading-[1.1]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base leading-relaxed text-slate md:text-lg">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
