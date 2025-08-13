import type { PropsWithChildren } from "react";
import { IcClose } from "@/index";
import { cn } from "@/utils";

type PopupProps = PropsWithChildren<{
  title?: string;
  onClose: () => void;
  className?: string;
}>;

export const Popup = ({ title, children, onClose, className }: PopupProps) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[1.6rem] border border-neutral-90 bg-white p-[2.4rem]",
        className,
      )}
    >
      <div className="mb-[2.4rem] flex items-start justify-between">
        {title && (
          <h2 className="text-heading1-semi20 text-neutral-25">{title}</h2>
        )}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "cursor-pointer rounded-[0.8rem] transition-colors hover:bg-neutral-90",
            !title && "ml-auto",
          )}
        >
          <IcClose className="h-[3rem] w-[3rem] text-neutral-40" />
        </button>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
