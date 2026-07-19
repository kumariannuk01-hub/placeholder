"use client";

import { useDemoModal } from "@/components/demo/DemoModalContext";

export function Footer() {
  const { openDemo } = useDemoModal();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base font-semibold text-navy">
            placeholder name
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
            AI Competitive Intelligence for pharmaceutical and biotech strategy
            teams — explainable, evidence-backed, enterprise-ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-slate">
          <a href="#platform" className="transition-colors hover:text-navy">
            Platform
          </a>
          <a href="#capabilities" className="transition-colors hover:text-navy">
            Capabilities
          </a>
          <a href="#enterprise" className="transition-colors hover:text-navy">
            Enterprise
          </a>
          <button
            type="button"
            onClick={openDemo}
            className="transition-colors hover:text-navy"
          >
            Book a Demo
          </button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-slate-light">
          <span>© {new Date().getFullYear()} placeholder name</span>
          <span>Built for pharma strategy teams</span>
        </div>
      </div>
    </footer>
  );
}
