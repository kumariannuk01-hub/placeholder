"use client";

import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  type?: "button" | "submit";
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-muted shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] border border-navy",
  secondary:
    "bg-white/80 text-navy border border-border-strong hover:bg-white hover:border-navy/25 backdrop-blur-md",
  ghost: "bg-transparent text-navy/80 hover:text-navy hover:bg-navy/[0.04]",
  inverse:
    "bg-white text-navy border border-white hover:bg-blue-mist",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
