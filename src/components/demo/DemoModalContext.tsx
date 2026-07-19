"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DemoModalContextValue = {
  isOpen: boolean;
  openDemo: () => void;
  closeDemo: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemo = useCallback(() => setIsOpen(true), []);
  const closeDemo = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openDemo, closeDemo }),
    [isOpen, openDemo, closeDemo],
  );

  return (
    <DemoModalContext.Provider value={value}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error("useDemoModal must be used within DemoModalProvider");
  }
  return context;
}
