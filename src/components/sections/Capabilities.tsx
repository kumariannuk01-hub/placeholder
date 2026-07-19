"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Brain,
  Eye,
  Handshake,
  Radar,
} from "lucide-react";
import { Section } from "@/components/ui/Section";

const pillars = [
  {
    id: "monitor",
    number: "01",
    title: "Monitor",
    summary:
      "Continuously monitor competitor activity across the sources strategy teams rely on.",
    icon: Radar,
    items: [
      "Clinical trials",
      "Regulatory agencies",
      "Scientific conferences",
      "Publications",
      "Patents",
      "Licensing",
      "M&A",
      "Manufacturing",
      "Supply chain",
      "Pricing",
      "Market access",
      "HTA",
      "Payer decisions",
      "Product launches",
      "Talent signals",
      "Global news",
      "Multi-language intelligence",
    ],
  },
  {
    id: "understand",
    number: "02",
    title: "Understand",
    summary:
      "Transform raw data into structured intelligence your teams can trust and act on.",
    icon: Brain,
    items: [
      "AI summaries",
      "Signal detection",
      "Competitor profiles",
      "Timeline reconstruction",
      "Strategic event tracking",
      "Analog analysis",
      "Relationship mapping",
    ],
  },
  {
    id: "evaluate",
    number: "03",
    title: "Evaluate",
    summary:
      "Help strategy teams assess business impact with transparent, evidence-backed analysis.",
    icon: Eye,
    items: [
      "Evidence-backed scenario generation",
      "Competitive war gaming",
      "Business impact assessment",
      "Regional implications",
      "LOE / Biosimilar / Generic erosion analysis",
      "HTA & payer intelligence",
      "Launch readiness assessment",
    ],
  },
  {
    id: "act",
    number: "04",
    title: "Act",
    summary:
      "Recommend actions for every business function — with clear rationale and supporting evidence.",
    icon: Activity,
    items: [
      "Commercial",
      "Competitive Intelligence",
      "Medical Affairs",
      "Market Access",
      "Brand Teams",
      "Business Development",
      "Leadership",
    ],
    note: "Each recommendation explains why it is suggested and references supporting evidence.",
  },
  {
    id: "collaborate",
    number: "05",
    title: "Collaborate",
    summary:
      "Keep global teams aligned with enterprise-grade workflows and executive-ready outputs.",
    icon: Handshake,
    items: [
      "Role-based dashboards",
      "Personalized intelligence feeds",
      "Smart alerts",
      "Executive dashboards",
      "PowerPoint exports",
      "Presentation-ready reports",
      "Secure integrations",
    ],
  },
];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const current = pillars[active];
  const Icon = current.icon;

  return (
    <Section
      id="capabilities"
      className="bg-surface"
      eyebrow="Platform capabilities"
      title="Five strategic pillars. One intelligence system."
      description="Organize competitive intelligence around how strategy teams actually work — from continuous monitoring to evidence-backed action."
    >
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {pillars.map((pillar, index) => {
            const isActive = active === index;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActive(index)}
                className={`min-w-[140px] rounded-2xl border px-4 py-3.5 text-left transition-colors lg:min-w-0 ${
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-white text-navy hover:border-navy/20"
                }`}
              >
                <span
                  className={`block text-[11px] font-semibold tracking-[0.16em] uppercase ${
                    isActive ? "text-white/50" : "text-slate-light"
                  }`}
                >
                  {pillar.number}
                </span>
                <span className="mt-1 block font-display text-lg font-semibold">
                  {pillar.title}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border bg-white p-7 md:p-9"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-mist text-blue">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate">
                  {current.summary}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {current.items.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-medium text-navy/80"
                >
                  {item}
                </span>
              ))}
            </div>

            {current.note && (
              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-slate">
                {current.note}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
