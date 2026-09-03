"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  FlaskConical,
  Gauge,
  Layers3,
  Shield,
  Swords,
} from "lucide-react";
import Link from "next/link";
import { responseOptions, situations } from "@/lib/war-gaming/data";
import { runWarGame } from "@/lib/war-gaming/engine";
import type {
  ResponseOptionId,
  SituationId,
  WarGameAssumptions,
} from "@/lib/war-gaming/types";

const steps = [
  { id: 1, label: "Situation" },
  { id: 2, label: "Analogs" },
  { id: 3, label: "Responses" },
  { id: 4, label: "Assumptions" },
  { id: 5, label: "Outcomes" },
] as const;

export function WarGamingApp() {
  const [step, setStep] = useState(1);
  const [situationId, setSituationId] = useState<SituationId>(
    "indication-expansion",
  );
  const [selectedAnalogIds, setSelectedAnalogIds] = useState<string[]>([
    "a1",
    "a2",
  ]);
  const [selectedOptionIds, setSelectedOptionIds] = useState<ResponseOptionId[]>([
    "medical-narrative",
    "accelerate-access",
  ]);
  const [assumptions, setAssumptions] = useState<WarGameAssumptions>({
    aggressiveness: 55,
    evidenceWeight: 70,
    regionalPressure: 45,
  });

  const situation = situations.find((s) => s.id === situationId)!;

  const outcomes = useMemo(
    () =>
      runWarGame({
        situationId,
        selectedAnalogIds,
        selectedOptionIds,
        assumptions,
      }),
    [situationId, selectedAnalogIds, selectedOptionIds, assumptions],
  );

  const toggleAnalog = (id: string) => {
    setSelectedAnalogIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleOption = (id: ResponseOptionId) => {
    setSelectedOptionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const canNext =
    (step === 1 && !!situationId) ||
    (step === 2 && selectedAnalogIds.length > 0) ||
    (step === 3 && selectedOptionIds.length > 0) ||
    step === 4 ||
    step === 5;

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors hover:text-navy"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
                <Swords size={16} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-navy">
                  War Gaming & Analog Analysis
                </p>
                <p className="text-[11px] text-slate-light">Functional prototype</p>
              </div>
            </div>
          </div>
          <p className="hidden text-xs text-slate md:block">
            Evidence-backed scenarios · not deterministic predictions
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
            Strategy workspace
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
            Model competitive scenarios with historical analogs
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate md:text-base">
            Select a live competitive situation, ground it in analogs, choose
            response options, and evaluate probabilistic outcomes with
            transparent confidence and reasoning.
          </p>
        </div>

        <nav className="mb-8 flex flex-wrap gap-2">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(s.id)}
              className={`rounded-xl border px-3.5 py-2 text-sm transition-colors ${
                step === s.id
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-slate hover:border-navy/20 hover:text-navy"
              }`}
            >
              {s.id}. {s.label}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <SituationStep
                situationId={situationId}
                onSelect={(id) => {
                  setSituationId(id);
                  const next = situations.find((s) => s.id === id)!;
                  setSelectedAnalogIds(next.analogs.slice(0, 2).map((a) => a.id));
                }}
              />
            )}
            {step === 2 && (
              <AnalogStep
                situation={situation}
                selectedAnalogIds={selectedAnalogIds}
                onToggle={toggleAnalog}
              />
            )}
            {step === 3 && (
              <ResponseStep
                selectedOptionIds={selectedOptionIds}
                onToggle={toggleOption}
              />
            )}
            {step === 4 && (
              <AssumptionsStep
                assumptions={assumptions}
                onChange={setAssumptions}
              />
            )}
            {step === 5 && (
              <OutcomesStep
                situationTitle={situation.title}
                outcomes={outcomes}
                analogCount={selectedAnalogIds.length}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-medium text-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          {step < 5 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-5 text-sm font-medium text-white"
            >
              Run another scenario
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function SituationStep({
  situationId,
  onSelect,
}: {
  situationId: SituationId;
  onSelect: (id: SituationId) => void;
}) {
  const active = situations.find((s) => s.id === situationId)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
      <div className="space-y-3">
        {situations.map((s) => {
          const selected = s.id === situationId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white hover:border-navy/20"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                  selected ? "text-white/50" : "text-slate-light"
                }`}
              >
                {s.subtitle}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  selected ? "text-white/70" : "text-slate"
                }`}
              >
                {s.competitor} vs {s.brand} · {s.region}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-border bg-white p-6 md:p-7">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-mist text-blue">
            <FlaskConical size={18} />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-navy">
              {active.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              {active.threatSummary}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-light">
            Active signals
          </p>
          <ul className="mt-3 space-y-2">
            {active.signals.map((signal) => (
              <li
                key={signal}
                className="rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-navy/80"
              >
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-light">
            Supporting evidence
          </p>
          <div className="mt-3 space-y-2">
            {active.evidence.map((e) => (
              <div
                key={e.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-border px-3.5 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-navy">{e.label}</p>
                  <p className="mt-1 text-xs text-slate-light">
                    {e.source} · {e.date}
                  </p>
                </div>
                <BookOpen size={14} className="mt-1 shrink-0 text-blue" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalogStep({
  situation,
  selectedAnalogIds,
  onToggle,
}: {
  situation: (typeof situations)[number];
  selectedAnalogIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-5 rounded-2xl border border-border bg-white p-5">
        <p className="text-sm text-slate">
          Select historical analogs to ground this war game. Similarity scores
          and lessons will influence confidence, reasoning, and recommendations.
        </p>
        <p className="mt-2 text-xs text-slate-light">
          {selectedAnalogIds.length} analog
          {selectedAnalogIds.length === 1 ? "" : "s"} selected
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {situation.analogs.map((analog) => {
          const selected = selectedAnalogIds.includes(analog.id);
          return (
            <button
              key={analog.id}
              type="button"
              onClick={() => onToggle(analog.id)}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                selected
                  ? "border-blue/30 bg-blue-mist/40"
                  : "border-border bg-white hover:border-navy/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-light">
                    {analog.year} · {analog.therapyArea}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                    {analog.title}
                  </h3>
                </div>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    selected
                      ? "border-blue bg-blue text-white"
                      : "border-border text-transparent"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-light">Similarity</span>
                  <span className="font-semibold text-navy">
                    {analog.similarity}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-blue"
                    style={{ width: `${analog.similarity}%` }}
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate">
                {analog.outcome}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue">
                    What worked
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy/80">
                    {analog.whatWorked}
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-light">
                    What failed
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy/80">
                    {analog.whatFailed}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResponseStep({
  selectedOptionIds,
  onToggle,
}: {
  selectedOptionIds: ResponseOptionId[];
  onToggle: (id: ResponseOptionId) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {responseOptions.map((option) => {
        const selected = selectedOptionIds.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              selected
                ? "border-navy bg-navy text-white"
                : "border-border bg-white hover:border-navy/20"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold">
                {option.title}
              </h3>
              <span
                className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                  selected
                    ? "border-white/30 bg-white text-navy"
                    : "border-border"
                }`}
              >
                {selected && <Check size={12} strokeWidth={3} />}
              </span>
            </div>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                selected ? "text-white/70" : "text-slate"
              }`}
            >
              {option.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                  selected ? "bg-white/10 text-white/80" : "bg-surface text-slate"
                }`}
              >
                Investment: {option.investment}
              </span>
              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                  selected ? "bg-white/10 text-white/80" : "bg-surface text-slate"
                }`}
              >
                Impact: {option.timeToImpact}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {option.functions.map((fn) => (
                <span
                  key={fn}
                  className={`rounded-md px-2 py-0.5 text-[11px] ${
                    selected
                      ? "bg-white/10 text-white/70"
                      : "bg-blue-mist/60 text-navy/70"
                  }`}
                >
                  {fn}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AssumptionsStep({
  assumptions,
  onChange,
}: {
  assumptions: WarGameAssumptions;
  onChange: (next: WarGameAssumptions) => void;
}) {
  const sliders = [
    {
      key: "aggressiveness" as const,
      label: "Response aggressiveness",
      help: "How forcefully should teams commit resources now?",
      icon: Gauge,
    },
    {
      key: "evidenceWeight" as const,
      label: "Evidence weighting",
      help: "How much should current signals raise confidence?",
      icon: Layers3,
    },
    {
      key: "regionalPressure" as const,
      label: "Regional pressure",
      help: "How intense is cross-market competitive pressure?",
      icon: Shield,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {sliders.map((slider) => {
        const Icon = slider.icon;
        const value = assumptions[slider.key];
        return (
          <div
            key={slider.key}
            className="rounded-2xl border border-border bg-white p-5 md:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-navy">
                <Icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {slider.label}
                  </h3>
                  <span className="font-display text-lg font-semibold text-blue">
                    {value}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate">{slider.help}</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) =>
                    onChange({
                      ...assumptions,
                      [slider.key]: Number(e.target.value),
                    })
                  }
                  className="mt-4 w-full accent-blue"
                />
              </div>
            </div>
          </div>
        );
      })}
      <p className="text-center text-xs text-slate-light">
        Adjusting assumptions recalculates scenario confidence and residual risk
        in the next step.
      </p>
    </div>
  );
}

function OutcomesStep({
  situationTitle,
  outcomes,
  analogCount,
}: {
  situationTitle: string;
  outcomes: ReturnType<typeof runWarGame>;
  analogCount: number;
}) {
  const [activeId, setActiveId] = useState(outcomes[0]?.optionId);

  const active = outcomes.find((o) => o.optionId === activeId) ?? outcomes[0];

  if (!active) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center text-slate">
        Select at least one response option to evaluate outcomes.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-5">
        <p className="text-sm text-slate">
          War-game results for <span className="font-medium text-navy">{situationTitle}</span>{" "}
          using {analogCount} analog{analogCount === 1 ? "" : "s"}. Outcomes are
          probabilistic and explainable — not guarantees.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {outcomes.map((o) => (
          <button
            key={o.optionId}
            type="button"
            onClick={() => setActiveId(o.optionId)}
            className={`rounded-xl border px-3.5 py-2 text-sm transition-colors ${
              active.optionId === o.optionId
                ? "border-navy bg-navy text-white"
                : "border-border bg-white text-slate hover:text-navy"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric
          label="Scenario probability"
          value={`${active.probability}%`}
          note="Likelihood pathway holds under current assumptions"
        />
        <Metric
          label="Confidence"
          value={`${active.confidence}%`}
          note="Evidence + analog fit + assumption quality"
        />
        <Metric
          label="Revenue risk protected"
          value={`${active.revenueAtRiskProtectedPct}%`}
          note="Estimated protected portion of at-risk revenue"
        />
        <Metric
          label="Share defense"
          value={`+${active.shareDefensePts} pts`}
          note={`Residual risk: ${active.residualRisk}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="font-display text-lg font-semibold text-navy">
            Explainable reasoning
          </h3>
          <ul className="mt-4 space-y-3">
            {active.reasoning.map((line) => (
              <li
                key={line}
                className="rounded-xl border border-border bg-surface px-3.5 py-3 text-sm leading-relaxed text-slate"
              >
                {line}
              </li>
            ))}
          </ul>

          {active.supportingAnalogs.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-light">
                Supporting analogs
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.supportingAnalogs.map((a) => (
                  <span
                    key={a}
                    className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-navy/80"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-navy">
              Alternative scenarios
            </h3>
            <div className="mt-4 space-y-3">
              {active.alternatives.map((alt) => (
                <div
                  key={alt.title}
                  className="rounded-xl border border-border px-3.5 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-navy">{alt.title}</p>
                    <span className="text-sm font-semibold text-blue">
                      {alt.probability}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate">
                    {alt.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-navy p-6 text-white">
            <h3 className="font-display text-lg font-semibold">
              Function-specific actions
            </h3>
            <div className="mt-4 space-y-3">
              {active.recommendations.map((rec) => (
                <div
                  key={`${rec.function}-${rec.action}`}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-soft">
                    {rec.function}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white">
                    {rec.action}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                    Evidence: {rec.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-[0.12em] text-slate-light">
            <tr>
              <th className="px-4 py-3 font-semibold">Response option</th>
              <th className="px-4 py-3 font-semibold">Probability</th>
              <th className="px-4 py-3 font-semibold">Confidence</th>
              <th className="px-4 py-3 font-semibold">Protected revenue</th>
              <th className="px-4 py-3 font-semibold">Residual risk</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.map((o) => (
              <tr key={o.optionId} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-navy">{o.label}</td>
                <td className="px-4 py-3 text-slate">{o.probability}%</td>
                <td className="px-4 py-3 text-slate">{o.confidence}%</td>
                <td className="px-4 py-3 text-slate">
                  {o.revenueAtRiskProtectedPct}%
                </td>
                <td className="px-4 py-3 text-slate">{o.residualRisk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-light">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold text-navy">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate">{note}</p>
    </div>
  );
}
