"use client";

import type { ReactNode } from "react";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalProvider } from "@/components/demo/DemoModalContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DemoModalProvider>
      {children}
      <DemoModal />
    </DemoModalProvider>
  );
}
