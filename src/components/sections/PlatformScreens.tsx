"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const screens = [
  {
    id: "timeline",
    label: "Competitive timeline",
    title: "Continuous event stream",
    description:
      "Track filings, trial updates, talent signals, and commercial activity in a unified strategic timeline.",
  },
  {
    id: "scenarios",
    label: "Scenario intelligence",
    title: "Evidence-backed scenarios",
    description:
      "Review probabilistic scenarios with confidence levels, supporting evidence, and alternative pathways.",
  },
  {
    id: "impact",
    label: "Impact assessment",
    title: "Business impact view",
    description:
      "Assess competitive pressure by brand, indication, and geography with transparent supporting rationale.",
  },
  {
    id: "maps",
    label: "Regional intelligence",
    title: "Market landscape view",
    description:
      "Visualize trial density, access dynamics, and regional competitive context across key markets.",
  },
  {
    id: "readiness",
    label: "Launch readiness",
    title: "Launch readiness assessment",
    description:
      "Evaluate competitive launch context and prepare cross-functional response plans with evidence.",
  },
  {
    id: "chat",
    label: "AI assistant",
    title: "Evidence-backed AI assistant",
    description:
      "Ask strategy questions in plain language and receive cited, decision-ready answers.",
  },
];

function MockUI({ active }: { active: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1528] p-4 md:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] tracking-wide text-white/35">
          placeholder name — Strategy Workspace
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="min-h-[320px] rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.06] to-transparent p-4 md:min-h-[380px] md:p-5"
        >
          {active === "timeline" && <TimelineMock />}
          {active === "scenarios" && <ScenariosMock />}
          {active === "impact" && <ImpactMock />}
          {active === "maps" && <MapsMock />}
          {active === "readiness" && <ReadinessMock />}
          {active === "chat" && <ChatMock />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TimelineMock() {
  const events = [
    { time: "09:14", label: "Pfizer — Phase III readout signal", tone: "high" },
    { time: "08:41", label: "Amgen — Market access hiring surge", tone: "med" },
    { time: "07:55", label: "Roche — Patent family expansion", tone: "med" },
    { time: "06:20", label: "Novartis — ASCO abstract cluster", tone: "low" },
  ];
  return (
    <div>
      <p className="text-xs font-medium text-white/45">Competitive timeline</p>
      <div className="mt-5 space-y-3">
        {events.map((event) => (
          <div
            key={event.time}
            className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <span className="w-12 font-mono text-xs text-blue-soft">{event.time}</span>
            <span
              className={`h-2 w-2 rounded-full ${
                event.tone === "high"
                  ? "bg-blue"
                  : event.tone === "med"
                    ? "bg-blue-soft/70"
                    : "bg-white/30"
              }`}
            />
            <span className="text-sm text-white/80">{event.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenariosMock() {
  const rows = [
    {
      name: "Indication expansion pathway",
      score: 72,
      evidence: "3 analogs · 12 cited signals",
    },
    {
      name: "Payer negotiation pressure",
      score: 58,
      evidence: "HTA precedent · regional pricing",
    },
    {
      name: "Manufacturing scale-up signal",
      score: 41,
      evidence: "Facility filings · talent cluster",
    },
  ];
  return (
    <div>
      <p className="text-xs font-medium text-white/45">Strategic Scenario Intelligence</p>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div
            key={row.name}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-white/80">{row.name}</span>
              <span className="font-medium text-blue-soft">{row.score}% conf.</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue to-blue-soft"
                style={{ width: `${row.score}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/40">{row.evidence}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactMock() {
  const items = [
    { brand: "Competitor A", level: "High attention", value: "Impact review" },
    { brand: "Competitor B", level: "Elevated", value: "Monitor closely" },
    { brand: "Competitor C", level: "Watch", value: "Routine tracking" },
  ];
  return (
    <div>
      <p className="text-xs font-medium text-white/45">Business impact assessment</p>
      <div className="mt-5 grid gap-3">
        {items.map((t) => (
          <div
            key={t.brand}
            className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4"
          >
            <div>
              <p className="text-sm font-medium text-white">{t.brand}</p>
              <p className="mt-1 text-xs text-white/40">{t.level}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-blue-soft">
              {t.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapsMock() {
  return (
    <div className="h-full">
      <p className="text-xs font-medium text-white/45">Regional market intelligence</p>
      <div className="relative mt-5 h-[260px] overflow-hidden rounded-xl border border-white/8 bg-[linear-gradient(180deg,#102038,#0a1528)] md:h-[300px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(47,107,255,0.18),transparent_35%),radial-gradient(circle_at_70%_55%,rgba(91,140,255,0.12),transparent_30%)]" />
        {[
          { top: "28%", left: "22%" },
          { top: "42%", left: "48%" },
          { top: "55%", left: "68%" },
          { top: "35%", left: "74%" },
          { top: "60%", left: "34%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/80"
            style={pos}
          />
        ))}
        <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70 backdrop-blur">
          Trial density · EU / US markets
        </div>
      </div>
    </div>
  );
}

function ReadinessMock() {
  const bars = [40, 55, 48, 72, 68, 64, 79, 70];
  return (
    <div>
      <p className="text-xs font-medium text-white/45">Launch readiness signals</p>
      <div className="mt-8 flex h-48 items-end gap-2 md:gap-3">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-white/8">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="w-full rounded-t-md bg-gradient-to-t from-blue/40 to-blue-soft"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-[11px] text-white/35">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-medium text-white/45">Evidence-backed AI assistant</p>
      <div className="mt-5 flex-1 space-y-3">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-sm text-white">
          What scenarios should we prepare for in oncology this quarter?
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-white/80">
          Three evidence-backed scenarios are in focus: indication expansion
          (72% confidence), payer pressure in EU5, and manufacturing scale
          signals. Each includes analogs, cited sources, and function-specific
          recommendations.
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/35">
        Ask a strategic question...
      </div>
    </div>
  );
}

export function PlatformScreens() {
  const [active, setActive] = useState(0);
  const current = screens[active];

  return (
    <Section
      className="bg-surface"
      eyebrow="Platform screens"
      title="Built for how strategy teams actually work."
      description="Product surfaces that turn competitive signals into shared intelligence — from timelines and scenarios to executive-ready collaboration."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            {screens.map((screen, index) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActive(index)}
                className={`rounded-xl border px-3.5 py-2 text-sm transition-colors ${
                  active === index
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-white text-slate hover:border-navy/20 hover:text-navy"
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-8"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
                {current.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-slate">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <MockUI active={current.id} />
      </div>
    </Section>
  );
}
