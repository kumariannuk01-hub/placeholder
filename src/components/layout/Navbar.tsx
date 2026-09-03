"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { DemoButton } from "@/components/demo/DemoButton";

const links = [
  { label: "Approach", href: "#why" },
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "War Gaming", href: "/war-gaming" },
  { label: "Enterprise", href: "#enterprise" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-[72px]">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight text-navy">
          Strategen
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <DemoButton size="md">Book a Demo</DemoButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white/95 px-6 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-navy"
              >
                {link.label}
              </a>
            ))}
            <DemoButton onClick={() => setOpen(false)}>Book a Demo</DemoButton>
          </div>
        </div>
      )}
    </motion.header>
  );
}
