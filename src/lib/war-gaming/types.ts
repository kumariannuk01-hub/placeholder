export type FunctionRole =
  | "Commercial"
  | "Competitive Intelligence"
  | "Medical Affairs"
  | "Market Access"
  | "Brand"
  | "Leadership";

export type SituationId =
  | "indication-expansion"
  | "biosimilar-entry"
  | "phase3-acceleration";

export type ResponseOptionId =
  | "accelerate-access"
  | "medical-narrative"
  | "pricing-defense"
  | "regional-sequencing"
  | "watch-and-prepare";

export interface EvidenceItem {
  id: string;
  label: string;
  source: string;
  date: string;
}

export interface AnalogCase {
  id: string;
  title: string;
  year: string;
  therapyArea: string;
  competitorArchetype: string;
  similarity: number;
  outcome: string;
  whatWorked: string;
  whatFailed: string;
  lessons: string[];
  evidenceIds: string[];
}

export interface CompetitiveSituation {
  id: SituationId;
  title: string;
  subtitle: string;
  competitor: string;
  brand: string;
  indication: string;
  region: string;
  threatSummary: string;
  signals: string[];
  evidence: EvidenceItem[];
  analogs: AnalogCase[];
}

export interface ResponseOption {
  id: ResponseOptionId;
  title: string;
  description: string;
  functions: FunctionRole[];
  investment: "Low" | "Medium" | "High";
  timeToImpact: string;
}

export interface ScenarioOutcome {
  optionId: ResponseOptionId;
  label: string;
  probability: number;
  confidence: number;
  revenueAtRiskProtectedPct: number;
  shareDefensePts: number;
  residualRisk: "Low" | "Moderate" | "Elevated";
  reasoning: string[];
  supportingAnalogs: string[];
  recommendations: {
    function: FunctionRole;
    action: string;
    evidence: string;
  }[];
  alternatives: {
    title: string;
    probability: number;
    note: string;
  }[];
}

export interface WarGameAssumptions {
  aggressiveness: number; // 0-100
  evidenceWeight: number; // 0-100
  regionalPressure: number; // 0-100
}
