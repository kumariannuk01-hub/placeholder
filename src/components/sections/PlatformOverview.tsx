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

const stages = [
  {
    id: "monitor",
    label: "Monitor",
    icon: Radar,
    detail:
      "Continuously ingest competitive signals across clinical, regulatory, commercial, manufacturing, payer, and market intelligence sources worldwide.",
  },
  {
    id: "understand",
    label: "Understand",
    icon: Brain,
    detail:
      "Convert fragmented data into structured intelligence — summaries, profiles, timelines, relationships, and strategic events your teams can trust.",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    icon: Eye,
    detail:
      "Assess business impact through evidence-backed scenarios, war gaming, regional implications, and launch readiness analysis.",
  },
  {
    id: "act",
    label: "Act",
    icon: Activity,
    detail:
      "Equip each function with recommendations that explain the rationale and cite supporting evidence.",
  },
  {
    id: "collaborate",
    label: "Collaborate",
    icon: Handshake,
    detail:
      "Align CI, Commercial, Medical Affairs, Market Access, Brand, and Leadership around shared dashboards, alerts, and executive outputs.",
  },
];

export function PlatformOverview() {
  const [active, setActive] = useState(0);

  return (
    <Section
      id="platform"
      eyebrow="Platform architecture"
      title="From signals to strategic decisions."
      description="An explainable intelligence workflow designed for pharmaceutical strategy teams — continuous monitoring, structured analysis, and evidence-backed recommendations."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-navy p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,107,255,0.18),transparent_55%)]" />
          <div className="relative space-y-3">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = active === index;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all ${
                    isActive
                      ? "border-white/20 bg-white/10"
                      : "border-transparent bg-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-blue text-white"
                        : "bg-white/8 text-white/70"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-base font-semibold md:text-lg ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  </div>
                  {index < stages.length - 1 && (
                    <span className="hidden text-white/25 sm:block">↓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col justify-between rounded-3xl border border-border bg-white p-7 md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
              Workflow stage
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={stages[active].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-navy">
                  {stages[active].label}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  {stages[active].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10">
            <div className="mb-3 flex justify-between text-xs font-medium text-slate-light">
              <span>Signal intake</span>
              <span>Executive alignment</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue to-navy"
                animate={{ width: `${((active + 1) / stages.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
