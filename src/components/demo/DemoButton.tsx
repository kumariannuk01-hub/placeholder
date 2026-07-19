"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useDemoModal } from "@/components/demo/DemoModalContext";

type DemoButtonProps = {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

export function DemoButton({
  children = "Book a Demo",
  variant = "primary",
  size = "md",
  className,
  onClick,
}: DemoButtonProps) {
  const { openDemo } = useDemoModal();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onClick?.();
        openDemo();
      }}
    >
      {children}
    </Button>
  );
}
