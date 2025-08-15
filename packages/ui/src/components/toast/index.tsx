"use client";

import { useToastContext } from "@/providers/toast-provider";
import { CreatePortal } from "@/utils/create-portal";
import { ToastItem } from "./toast-item";

export const ToastContainer = () => {
  const { toasts } = useToastContext();
  if (toasts.length === 0) {
    return null;
  }

  return (
    <CreatePortal>
      <div className="-translate-x-1/2 fixed top-[4rem] left-1/2 z-[9999] flex flex-col items-center">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </CreatePortal>
  );
};
