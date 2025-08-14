"use client";
import IcCheckCircle from "@/assets/icons/ic_check_circle.svg?react";
import type { Toast } from "@/types/toast";
import { cn } from "@/utils";

interface ToastItemProps {
  toast: Toast;
  className?: string;
}

export const ToastItem = ({ toast, className }: ToastItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-[0.8rem]",
        "mb-[0.8rem] w-fit max-w-[40rem] px-[1.6rem] py-[1.25rem]",
        "rounded-[1.2rem] border border-secondary-90 bg-secondary-99",
        "shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.15)]",
        toast.state === "entering" &&
          "animate-[toast-enter_0.3s_ease-out_forwards]",
        toast.state === "exiting" &&
          "animate-[toast-exit_0.5s_ease-in_forwards] overflow-hidden",
        toast.state === "visible" && "mb-[0.8rem] translate-y-0 opacity-100",
        className,
      )}
    >
      <IcCheckCircle className="h-[2rem] w-[2rem] shrink-0 text-primary" />
      <span className="text-body2-semi14 text-neutral-35">{toast.content}</span>
    </div>
  );
};
