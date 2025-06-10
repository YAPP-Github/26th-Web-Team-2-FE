"use client";

import { Provider } from "jotai";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const JotaiProvider = ({ children }: ProvidersProps) => {
  return <Provider>{children}</Provider>;
};
