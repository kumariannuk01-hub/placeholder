"use client";

import {
  BellRing,
  FileDown,
  KeyRound,
  LayoutDashboard,
  Lock,
  Plug,
  Users,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

const features = [
  {
    icon: KeyRound,
    title: "Role-based intelligence",
    description:
      "Deliver the right strategic view to CI, Commercial, Medical Affairs, and executive stakeholders.",
  },
  {
    icon: BellRing,
    title: "Custom alerts",
    description:
      "Configure high-signal alerts around brands, competitors, indications, and market events.",
  },
  {
    icon: LayoutDashboard,
    title: "Executive dashboards",
    description:
      "Board-ready summaries that compress competitive context, business impact, and recommended actions into one view.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Annotate signals, assign owners, and align cross-functional response in a shared workspace.",
  },
  {
    icon: FileDown,
    title: "PowerPoint exports",
    description:
      "Generate leadership-ready decks from live intelligence without rebuilding slides every week.",
  },
  {
    icon: Plug,
    title: "API integrations",
    description:
      "Connect internal data rooms, CRM systems, and knowledge platforms through secure APIs.",
  },
  {
    icon: Lock,
    title: "Secure enterprise deployment",
    description:
      "Designed for pharma-grade security, access controls, and deployment flexibility.",
  },
];

export function Enterprise() {
  return (
    <Section
      id="enterprise"
      eyebrow="Enterprise features"
      title="Built for regulated, global organizations."
      description="Enterprise-grade controls and collaboration tools designed for regulated, global pharmaceutical organizations."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <GlassCard
              key={feature.title}
              delay={index * 0.04}
              className={index === features.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-navy">
                <Icon size={18} />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-navy">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {feature.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
