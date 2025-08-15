"use client";
import { useMemo } from "react";
import { useToastContext } from "@/providers/toast-provider";

type Toaster = (content: string, duration?: number) => void;

export const useToast = () => {
  const { addToast } = useToastContext();

  const toast: { success: Toaster } = useMemo(
    () => ({
      success: (content: string, duration?: number) => {
        addToast(content, duration);
      },
    }),
    [addToast],
  );

  return { toast };
};
