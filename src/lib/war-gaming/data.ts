import type {
  CompetitiveSituation,
  ResponseOption,
  SituationId,
} from "./types";

export const situations: CompetitiveSituation[] = [
  {
    id: "indication-expansion",
    title: "Competitor indication expansion",
    subtitle: "Oncology — 2L NSCLC expansion pathway",
    competitor: "Competitor A",
    brand: "Our Brand X",
    indication: "2L NSCLC",
    region: "US + EU5",
    threatSummary:
      "Competitor A is assembling regulatory, KOL, and access signals consistent with a near-term indication expansion. Strategy teams need scenario options, not a single forecast.",
    signals: [
      "Phase III subgroup narrative strengthening at ASCO cluster",
      "Accelerated hiring in US Medical Affairs oncology",
      "HTA briefing book language shifting toward broader population",
      "Manufacturing scale signals in EU fill-finish capacity",
    ],
    evidence: [
      {
        id: "e1",
        label: "ASCO abstract cluster on expansion-eligible subgroups",
        source: "Conference intelligence",
        date: "2026-05-12",
      },
      {
        id: "e2",
        label: "FDA Type C meeting cadence increase (public proxies)",
        source: "Regulatory signal map",
        date: "2026-04-28",
      },
      {
        id: "e3",
        label: "US MA oncology headcount +18% in 2 quarters",
        source: "Talent intelligence",
        date: "2026-03-19",
      },
      {
        id: "e4",
        label: "EU5 payer advisory language referencing broader use",
        source: "Market access monitoring",
        date: "2026-06-02",
      },
    ],
    analogs: [
      {
        id: "a1",
        title: "Oncology expansion after ASCO narrative shift",
        year: "2019",
        therapyArea: "Oncology",
        competitorArchetype: "Global innovator",
        similarity: 86,
        outcome:
          "Label expansion approved within 11 months; share shifted 4–6 pts in 2L setting.",
        whatWorked:
          "Incumbent teams that pre-briefed payers and KOLs limited early share loss.",
        whatFailed:
          "Reactive medical messaging after filing lagged competitor narrative by a full congress cycle.",
        lessons: [
          "Narrative control before filing materially changes access timing.",
          "Function-aligned war rooms outperform siloed CI updates.",
        ],
        evidenceIds: ["e1", "e2"],
      },
      {
        id: "a2",
        title: "EU5 HTA pathway used to soften US commercial push",
        year: "2021",
        therapyArea: "Oncology",
        competitorArchetype: "EU-first expander",
        similarity: 74,
        outcome:
          "Competitor secured staged EU access first; US impact was delayed but still material.",
        whatWorked:
          "Regional sequencing defenses preserved US share during EU ramp.",
        whatFailed:
          "National pricing concessions in DE/FR spilled into US account negotiations.",
        lessons: [
          "Treat EU and US as coupled scenarios, not separate games.",
          "Pricing defense needs pre-agreed corridor rules.",
        ],
        evidenceIds: ["e4"],
      },
      {
        id: "a3",
        title: "Talent surge preceded label expansion by 3 quarters",
        year: "2017",
        therapyArea: "Oncology",
        competitorArchetype: "Scale-up commercializer",
        similarity: 69,
        outcome:
          "Hiring surge correctly flagged intent; commercial response arrived too late.",
        whatWorked:
          "CI teams that scored talent + congress + regulatory jointly raised confidence earlier.",
        whatFailed:
          "Leadership waited for deterministic confirmation and missed the window.",
        lessons: [
          "Talent + congress + regulatory co-occurrence raises scenario confidence.",
          "Waiting for certainty is itself a strategic choice with cost.",
        ],
        evidenceIds: ["e3", "e1"],
      },
    ],
  },
  {
    id: "biosimilar-entry",
    title: "Biosimilar / LOE erosion pressure",
    subtitle: "Immunology — US LOE corridor opening",
    competitor: "Biosimilar Consortium B",
    brand: "Our Brand Y",
    indication: "Moderate-severe RA",
    region: "US",
    threatSummary:
      "Multiple biosimilar entrants are aligning manufacturing, contracting, and payer signals around a compressed US entry window.",
    signals: [
      "Interchangeability language appearing in payer RFPs",
      "Contracting chatter in national accounts",
      "Inventory build indicators at major wholesalers",
      "Competitor patient support program redesigns",
    ],
    evidence: [
      {
        id: "e5",
        label: "Payer RFP language referencing preferred biosimilar pathway",
        source: "Market access monitoring",
        date: "2026-05-30",
      },
      {
        id: "e6",
        label: "Wholesaler inventory build proxies in 3 regions",
        source: "Supply chain intelligence",
        date: "2026-06-08",
      },
      {
        id: "e7",
        label: "Competitor PSP redesign focused on rapid switch support",
        source: "Commercial monitoring",
        date: "2026-04-14",
      },
    ],
    analogs: [
      {
        id: "a4",
        title: "First-wave US immunology biosimilar cascade",
        year: "2023",
        therapyArea: "Immunology",
        competitorArchetype: "Multi-entrant LOE",
        similarity: 88,
        outcome:
          "Originator share declined sharply in contracted accounts within 2 quarters of preferred status.",
        whatWorked:
          "Value-based contracting and specialty pharmacy partnerships slowed erosion in priority accounts.",
        whatFailed:
          "Broad list-price defense without account segmentation underperformed.",
        lessons: [
          "Segment accounts before the corridor opens.",
          "PSP continuity is a share defense lever, not a soft benefit.",
        ],
        evidenceIds: ["e5", "e7"],
      },
      {
        id: "a5",
        title: "Inventory-led switch acceleration",
        year: "2022",
        therapyArea: "Immunology",
        competitorArchetype: "Supply-led entrant",
        similarity: 71,
        outcome:
          "Wholesaler readiness compressed the practical switch window by ~6 weeks.",
        whatWorked:
          "Early specialty pharmacy engagement preserved patient continuity.",
        whatFailed:
          "Field force messaging lagged contracting reality.",
        lessons: [
          "Supply readiness can move commercial timelines earlier than expected.",
        ],
        evidenceIds: ["e6"],
      },
    ],
  },
  {
    id: "phase3-acceleration",
    title: "Unexpected Phase III acceleration",
    subtitle: "Rare disease — readout timing risk",
    competitor: "Competitor C",
    brand: "Our Brand Z",
    indication: "Rare neuromuscular",
    region: "US + JP",
    threatSummary:
      "Competitor C appears to be accelerating toward an earlier readout and potential filing narrative, creating launch-readiness pressure.",
    signals: [
      "Trial completion language advanced in registry updates",
      "Japan regulatory consulting activity increase",
      "KOL advisory board cadence intensification",
      "Competitor BD silence after prior partnering rumors",
    ],
    evidence: [
      {
        id: "e8",
        label: "ClinicalTrials.gov primary completion date pulled forward",
        source: "Clinical intelligence",
        date: "2026-05-01",
      },
      {
        id: "e9",
        label: "JP PMDA consultation proxies via local affiliates",
        source: "Regional regulatory map",
        date: "2026-05-22",
      },
      {
        id: "e10",
        label: "KOL advisory density up across 2 congresses",
        source: "Scientific intelligence",
        date: "2026-06-11",
      },
    ],
    analogs: [
      {
        id: "a6",
        title: "Rare disease accelerated filing after registry shift",
        year: "2018",
        therapyArea: "Rare disease",
        competitorArchetype: "Focused biotech",
        similarity: 80,
        outcome:
          "Competitor filed ~5 months earlier than consensus base case.",
        whatWorked:
          "Incumbents with pre-built medical objection handlers protected KOL positioning.",
        whatFailed:
          "Commercial launch plans keyed to a single base-case date were underprepared.",
        lessons: [
          "Maintain early / base / late launch corridors, not one date.",
          "Medical readiness is the first bottleneck in rare disease defense.",
        ],
        evidenceIds: ["e8", "e10"],
      },
      {
        id: "a7",
        title: "JP-first sequencing changed global narrative",
        year: "2020",
        therapyArea: "Rare disease",
        competitorArchetype: "JP-capable global",
        similarity: 66,
        outcome:
          "JP progress created global credibility that pulled US stakeholder expectations forward.",
        whatWorked:
          "Regional war games that included JP prevented US-only blind spots.",
        whatFailed:
          "US-centric scenario sets underestimated narrative spillover.",
        lessons: [
          "Regional milestones can move global stakeholder psychology.",
        ],
        evidenceIds: ["e9"],
      },
    ],
  },
];

export const responseOptions: ResponseOption[] = [
  {
    id: "accelerate-access",
    title: "Accelerate access & account defense",
    description:
      "Pre-brief priority accounts and payers, tighten contracting plays, and protect formulary position before competitor narrative lands.",
    functions: ["Commercial", "Market Access", "Brand", "Leadership"],
    investment: "High",
    timeToImpact: "4–8 weeks",
  },
  {
    id: "medical-narrative",
    title: "Strengthen medical narrative",
    description:
      "Equip Medical Affairs and KOLs with evidence-backed objection handlers and congress-ready narrative control.",
    functions: ["Medical Affairs", "Competitive Intelligence", "Brand"],
    investment: "Medium",
    timeToImpact: "3–6 weeks",
  },
  {
    id: "pricing-defense",
    title: "Pricing corridor defense",
    description:
      "Define pricing and contracting corridors by segment to avoid reactive discounting under competitive pressure.",
    functions: ["Market Access", "Commercial", "Leadership"],
    investment: "Medium",
    timeToImpact: "2–5 weeks",
  },
  {
    id: "regional-sequencing",
    title: "Regional sequencing playbook",
    description:
      "Separate US / EU5 / JP response tracks with coupled assumptions so regional moves do not create global spillover.",
    functions: ["Leadership", "Competitive Intelligence", "Market Access"],
    investment: "Medium",
    timeToImpact: "3–7 weeks",
  },
  {
    id: "watch-and-prepare",
    title: "Watch, prepare, trigger-based act",
    description:
      "Hold major spend, but pre-approve trigger-based actions tied to confidence thresholds and evidence gates.",
    functions: ["Competitive Intelligence", "Leadership"],
    investment: "Low",
    timeToImpact: "Immediate readiness",
  },
];

export function getSituation(id: SituationId): CompetitiveSituation {
  return situations.find((s) => s.id === id) ?? situations[0];
}
