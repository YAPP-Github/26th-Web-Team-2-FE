"use client";

import type { ReactNode } from "react";
import ToastContainer from "@/components/toast";
import ToastProvider, {
  type ToastProviderProps,
} from "@/providers/toast-provider";

interface SsokUiProviderProps {
  toast?: Omit<ToastProviderProps, "children">;
  children: ReactNode;
}

const SsokUiProvider = ({ toast, children }: SsokUiProviderProps) => {
  return (
    <ToastProvider {...toast}>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
};

export default SsokUiProvider;
