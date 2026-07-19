"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useDemoModal } from "@/components/demo/DemoModalContext";

export function DemoModal() {
  const { isOpen, closeDemo } = useDemoModal();
  const titleId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDemo();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeDemo]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setForm({ name: "", email: "", company: "", role: "", message: "" });
    }
  }, [isOpen]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close demo form"
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={closeDemo}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_80px_rgba(6,16,31,0.22)]"
          >
            <div className="flex items-start justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
                  Book a Demo
                </p>
                <h2
                  id={titleId}
                  className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy"
                >
                  {submitted ? "Request received" : "Talk with our team"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDemo}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border text-navy transition-colors hover:bg-surface"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-6">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-mist text-blue">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="font-display text-xl font-semibold text-navy">
                    Thanks — we&apos;ll be in touch shortly.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    Our team will follow up to schedule a walkthrough tailored
                    to your strategy workflow.
                  </p>
                  <button
                    type="button"
                    onClick={closeDemo}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-navy px-5 text-sm font-medium text-white transition-colors hover:bg-navy-muted"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate">
                    Share a few details and we&apos;ll schedule a personalized
                    platform demo for your team.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      required
                      value={form.name}
                      onChange={(value) => setForm((f) => ({ ...f, name: value }))}
                    />
                    <Field
                      label="Work email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(value) => setForm((f) => ({ ...f, email: value }))}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Company"
                      required
                      value={form.company}
                      onChange={(value) =>
                        setForm((f) => ({ ...f, company: value }))
                      }
                    />
                    <Field
                      label="Role"
                      value={form.role}
                      onChange={(value) => setForm((f) => ({ ...f, role: value }))}
                    />
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-navy">
                      What are you looking to explore?
                    </span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(event) =>
                        setForm((f) => ({ ...f, message: event.target.value }))
                      }
                      className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-navy outline-none transition focus:border-blue/40 focus:ring-2 focus:ring-blue/15"
                      placeholder="e.g. CI monitoring, scenario intelligence, executive workflows"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-navy text-[15px] font-medium text-white transition-colors hover:bg-navy-muted"
                  >
                    Request Demo
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-navy outline-none transition focus:border-blue/40 focus:ring-2 focus:ring-blue/15"
      />
    </label>
  );
}
