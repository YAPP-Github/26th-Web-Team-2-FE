import type { ButtonHTMLAttributes } from "react";
import IcDeletd from "@/assets/icons/ic_delete.svg?react";
import { cn } from "@/utils";

type IconButtonProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const DeleteIconButton = ({ className, ...props }: IconButtonProps) => {
  return (
    <button
      aria-label="삭제 버튼"
      className={cn(
        "flex justify-center rounded-[1.2rem] border-none bg-transparent p-[1.2rem]",
        " text-neutral-variant-50",
        "hover:bg-neutral-95 hover:text-neutral-variant-35",
        "focus:bg-neutral-90 focus:text-neutral-variant-35",
        className,
      )}
      {...props}
    >
      <IcDeletd width="24px" height="24px" role="img" />
    </button>
  );
};
