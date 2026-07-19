"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  GitBranch,
  Percent,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { Section } from "@/components/ui/Section";

const attributes = [
  {
    icon: Percent,
    title: "Confidence level",
    description:
      "Every scenario surfaces a clear confidence range so teams can weigh uncertainty explicitly.",
  },
  {
    icon: ScrollText,
    title: "Supporting evidence",
    description:
      "Claims are grounded in cited sources — regulatory milestones, commercial signals, and market data.",
  },
  {
    icon: BookOpen,
    title: "Historical analogs",
    description:
      "Comparable past competitor situations help teams contextualize what may unfold next.",
  },
  {
    icon: GitBranch,
    title: "Alternative scenarios",
    description:
      "Explore multiple plausible pathways instead of anchoring on a single deterministic outcome.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable reasoning",
    description:
      "Transparent logic shows how evidence, analogs, and market dynamics inform each assessment.",
  },
];

export function ScenarioIntelligence() {
  return (
    <Section
      id="scenarios"
      eyebrow="Strategic Scenario Intelligence"
      title="Prepare for multiple futures — with evidence, not certainty."
      description="Generate probabilistic scenarios using historical competitor behavior, regulatory milestones, manufacturing signals, commercial activity, and market dynamics. The platform remains transparent about uncertainty and avoids deterministic claims."
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-navy to-navy-muted p-7 md:p-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-soft">
            Explainable by design
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Every scenario is built for executive scrutiny.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Strategy teams see not only what may happen, but why the assessment
            was formed — and where uncertainty remains.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attributes.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm ${
                  index === attributes.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-soft">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h4 className="font-display text-base font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
