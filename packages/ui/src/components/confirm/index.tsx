import type { PropsWithChildren } from "react";
import { Button } from "@/components/button";
import { cn } from "@/utils";

export type ConfirmProps = PropsWithChildren<{
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string;
}>;

export const Confirm = ({
  title,
  description,
  cancelText = "취소",
  confirmText = "확인",
  onCancel,
  onConfirm,
  className,
  children,
}: ConfirmProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-[40rem] flex-col items-end gap-[3.2rem] px-[2.4rem] py-[2rem]",
        "rounded-[1.2rem] border border-neutral-90 bg-white shadow-[4px_4px_8px_0px_rgba(0,0,0,0.15)]",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-[1.6rem]">
        <h2 className="text-heading1-semi20 text-neutral-5">{title}</h2>
        <p className="text-body1-medi16 text-neutral-20">{description}</p>
        {children}
      </div>
      <div className="flex gap-[0.8rem]">
        <Button variant="text" size="md" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={onConfirm}
          className="bg-error-60 hover:bg-error-50"
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};
