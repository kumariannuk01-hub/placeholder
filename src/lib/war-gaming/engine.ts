import { getSituation, responseOptions } from "./data";
import type {
  AnalogCase,
  ResponseOptionId,
  ScenarioOutcome,
  SituationId,
  WarGameAssumptions,
} from "./types";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function avg(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function residualFromScore(score: number): ScenarioOutcome["residualRisk"] {
  if (score >= 70) return "Low";
  if (score >= 50) return "Moderate";
  return "Elevated";
}

export function runWarGame(params: {
  situationId: SituationId;
  selectedAnalogIds: string[];
  selectedOptionIds: ResponseOptionId[];
  assumptions: WarGameAssumptions;
}): ScenarioOutcome[] {
  const situation = getSituation(params.situationId);
  const selectedAnalogs = situation.analogs.filter((a) =>
    params.selectedAnalogIds.includes(a.id),
  );

  const analogSimilarity = avg(selectedAnalogs.map((a) => a.similarity));
  const analogFactor = selectedAnalogs.length
    ? analogSimilarity / 100
    : 0.45;

  const evidenceFactor = params.assumptions.evidenceWeight / 100;
  const aggression = params.assumptions.aggressiveness / 100;
  const regional = params.assumptions.regionalPressure / 100;

  const optionIds =
    params.selectedOptionIds.length > 0
      ? params.selectedOptionIds
      : (["watch-and-prepare"] as ResponseOptionId[]);

  return optionIds.map((optionId) => {
    const option = responseOptions.find((o) => o.id === optionId)!;
    const base = scoreOption(optionId, situation.id);

    const probability = clamp(
      Math.round(
        base.probability * (0.7 + analogFactor * 0.25) +
          aggression * 8 -
          regional * 6,
      ),
    );

    const confidence = clamp(
      Math.round(
        38 +
          analogFactor * 34 +
          evidenceFactor * 18 +
          selectedAnalogs.length * 4 -
          (selectedAnalogs.length === 0 ? 12 : 0),
      ),
    );

    const revenueAtRiskProtectedPct = clamp(
      Math.round(
        base.protection * (0.75 + aggression * 0.2 + analogFactor * 0.15) -
          regional * 10,
      ),
    );

    const shareDefensePts = Number(
      (
        base.sharePts * (0.8 + analogFactor * 0.25 + aggression * 0.15) -
        regional * 0.8
      ).toFixed(1),
    );

    const effectiveness = (probability + confidence + revenueAtRiskProtectedPct) / 3;

    return {
      optionId,
      label: option.title,
      probability,
      confidence,
      revenueAtRiskProtectedPct,
      shareDefensePts: Math.max(0, shareDefensePts),
      residualRisk: residualFromScore(effectiveness),
      reasoning: buildReasoning({
        optionTitle: option.title,
        situationTitle: situation.title,
        analogs: selectedAnalogs,
        confidence,
        aggression,
        regional,
      }),
      supportingAnalogs: selectedAnalogs.map((a) => a.title),
      recommendations: buildRecommendations(optionId, selectedAnalogs),
      alternatives: [
        {
          title: "Competitor delays / softens move",
          probability: clamp(100 - probability - 12),
          note: "Possible if regulatory or access friction increases.",
        },
        {
          title: "Competitor accelerates harder than base case",
          probability: clamp(Math.round(12 + regional * 18)),
          note: "Requires escalation triggers and pre-approved contingency spend.",
        },
      ],
    };
  });
}

function scoreOption(optionId: ResponseOptionId, situationId: SituationId) {
  const matrix: Record<
    SituationId,
    Record<ResponseOptionId, { probability: number; protection: number; sharePts: number }>
  > = {
    "indication-expansion": {
      "accelerate-access": { probability: 68, protection: 72, sharePts: 3.8 },
      "medical-narrative": { probability: 74, protection: 61, sharePts: 2.9 },
      "pricing-defense": { probability: 55, protection: 58, sharePts: 2.2 },
      "regional-sequencing": { probability: 66, protection: 69, sharePts: 3.3 },
      "watch-and-prepare": { probability: 42, protection: 34, sharePts: 1.1 },
    },
    "biosimilar-entry": {
      "accelerate-access": { probability: 71, protection: 76, sharePts: 4.4 },
      "medical-narrative": { probability: 48, protection: 41, sharePts: 1.6 },
      "pricing-defense": { probability: 77, protection: 80, sharePts: 5.1 },
      "regional-sequencing": { probability: 52, protection: 49, sharePts: 2.0 },
      "watch-and-prepare": { probability: 33, protection: 28, sharePts: 0.8 },
    },
    "phase3-acceleration": {
      "accelerate-access": { probability: 57, protection: 54, sharePts: 2.4 },
      "medical-narrative": { probability: 79, protection: 70, sharePts: 3.6 },
      "pricing-defense": { probability: 44, protection: 39, sharePts: 1.4 },
      "regional-sequencing": { probability: 73, protection: 68, sharePts: 3.1 },
      "watch-and-prepare": { probability: 51, protection: 46, sharePts: 1.8 },
    },
  };

  return matrix[situationId][optionId];
}

function buildReasoning(input: {
  optionTitle: string;
  situationTitle: string;
  analogs: AnalogCase[];
  confidence: number;
  aggression: number;
  regional: number;
}) {
  const lines = [
    `"${input.optionTitle}" is evaluated against ${input.situationTitle.toLowerCase()} using selected historical analogs and current signal strength.`,
    input.analogs.length
      ? `Analog support averages ${Math.round(avg(input.analogs.map((a) => a.similarity)))}% similarity across ${input.analogs.length} case(s).`
      : "No analogs selected — confidence is reduced and recommendations stay more conservative.",
    `Assumption mix: response aggressiveness ${Math.round(input.aggression * 100)}%, regional pressure ${Math.round(input.regional * 100)}%.`,
    `Overall confidence ${input.confidence}% reflects evidence quality, analog fit, and assumption uncertainty — not a deterministic prediction.`,
  ];

  if (input.analogs[0]) {
    lines.push(
      `Closest analog (“${input.analogs[0].title}”) suggests: ${input.analogs[0].lessons[0]}`,
    );
  }

  return lines;
}

function buildRecommendations(
  optionId: ResponseOptionId,
  analogs: AnalogCase[],
) {
  const analogLesson =
    analogs[0]?.lessons[0] ??
    "Maintain transparent confidence thresholds before escalating spend.";

  const map = {
    "accelerate-access": [
      {
        function: "Market Access" as const,
        action: "Pre-brief top 20 accounts with defense dossier and contracting options.",
        evidence: analogLesson,
      },
      {
        function: "Commercial" as const,
        action: "Stand up account war room with weekly trigger review.",
        evidence: "Priority-account readiness consistently reduced early share loss in analogs.",
      },
      {
        function: "Leadership" as const,
        action: "Approve contingency budget gates tied to confidence ≥ 65%.",
        evidence: "Trigger-based governance avoided both under- and over-reaction in prior cases.",
      },
    ],
    "medical-narrative": [
      {
        function: "Medical Affairs" as const,
        action: "Deploy congress-ready objection handlers and KOL briefing pack.",
        evidence: analogLesson,
      },
      {
        function: "Competitive Intelligence" as const,
        action: "Refresh signal board after each major congress / filing proxy.",
        evidence: "Narrative shifts often precede formal regulatory milestones.",
      },
      {
        function: "Brand" as const,
        action: "Align brand claims and advisory content to evidence-backed differentiators.",
        evidence: "Cross-functional narrative consistency improved stakeholder trust.",
      },
    ],
    "pricing-defense": [
      {
        function: "Market Access" as const,
        action: "Define segment-level pricing corridors before competitor contracting begins.",
        evidence: analogLesson,
      },
      {
        function: "Commercial" as const,
        action: "Train field teams on corridor rules and exception escalation.",
        evidence: "Uncontrolled discounting was a common failure mode in LOE analogs.",
      },
      {
        function: "Leadership" as const,
        action: "Set explicit floor / ceiling policy and review cadence.",
        evidence: "Pre-agreed corridors reduced reactive decision latency.",
      },
    ],
    "regional-sequencing": [
      {
        function: "Leadership" as const,
        action: "Run coupled US/EU/JP scenario reviews — not isolated regional decks.",
        evidence: analogLesson,
      },
      {
        function: "Competitive Intelligence" as const,
        action: "Track regional milestone spillover into global stakeholder expectations.",
        evidence: "Regional progress often moved global narrative timing in analogs.",
      },
      {
        function: "Market Access" as const,
        action: "Sequence access defenses to avoid cross-market pricing leakage.",
        evidence: "Spillover from EU concessions affected US negotiations in prior cases.",
      },
    ],
    "watch-and-prepare": [
      {
        function: "Competitive Intelligence" as const,
        action: "Publish weekly confidence and evidence deltas with clear triggers.",
        evidence: analogLesson,
      },
      {
        function: "Leadership" as const,
        action: "Pre-approve action packages that unlock at defined evidence gates.",
        evidence: "Prepared inaction outperformed improvised late responses.",
      },
    ],
  } as const;

  return [...map[optionId]];
}
