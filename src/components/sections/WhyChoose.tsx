"use client";

import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Layers3,
  MapPinned,
  Scale,
  Swords,
  UsersRound,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

const differentiators = [
  {
    icon: Globe2,
    title: "Continuous Competitive Monitoring",
    description:
      "Monitor competitors across clinical, regulatory, scientific, commercial, manufacturing, payer, business development, and market intelligence sources globally.",
  },
  {
    icon: Scale,
    title: "Evidence-Backed Scenario Intelligence",
    description:
      "Generate probabilistic scenarios supported by transparent evidence, historical competitor behavior, confidence levels, and explainable reasoning — not deterministic claims.",
  },
  {
    icon: Layers3,
    title: "Function-Specific Intelligence",
    description:
      "Deliver tailored insights and recommendations for Competitive Intelligence, Commercial, Medical Affairs, Market Access, Brand Teams, Business Development, and Leadership.",
  },
  {
    icon: Swords,
    title: "War Gaming & Analog Analysis",
    description:
      "Model competitive scenarios, evaluate strategic options, and learn from historical analogs to prepare for multiple possible outcomes.",
    href: "/war-gaming",
    cta: "Open prototype",
  },
  {
    icon: MapPinned,
    title: "Regional Market Playbooks",
    description:
      "Generate market-specific intelligence and recommendations by considering local competitors, regulatory environments, payer dynamics, pricing, reimbursement, and launch sequencing.",
  },
  {
    icon: UsersRound,
    title: "Enterprise Collaboration",
    description:
      "Role-based dashboards, intelligent alerts, executive reports, presentation-ready outputs, and collaborative workflows built for global teams.",
  },
];

export function WhyChoose() {
  return (
    <Section
      id="why"
      className="bg-surface"
      eyebrow="Our approach"
      title="Built for Pharma Strategy Teams"
      description="Explainable competitive intelligence designed for senior executives — transparent reasoning, evidence you can trust, and recommendations your teams can act on."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {differentiators.map((item, index) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.title} delay={index * 0.05}>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-navy">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">
                {item.description}
              </p>
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue transition-colors hover:text-navy"
                >
                  {item.cta}
                  <ArrowRight size={14} />
                </Link>
              ) : null}
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
