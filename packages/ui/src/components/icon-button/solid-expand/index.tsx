import type { ButtonHTMLAttributes } from "react";
import IcArrowLeft from "@/assets/icons/ic_arrow_left.svg?react";
import IcArrowRight from "@/assets/icons/ic_arrow_right.svg?react";
import { cn } from "@/utils";

type SolidExpandProps = {
  className?: string;
  collapse: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SolidExpand = ({
  className,
  collapse,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...props
}: SolidExpandProps) => {
  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      aria-label={props["aria-label"] || "보드 확장 버튼"}
      className={cn(
        "inline-flex cursor-pointer rounded-tr-[16px] rounded-br-[16px] py-[1.6rem] pr-[0.6rem] pl-[0.2rem] disabled:cursor-not-allowed",
        "border-t border-r border-b border-l-0",
        "border-neutral-70 bg-neutral-98", // default
        !collapse && "hover:bg-neutral-95 focus:bg-neutral-90", // hover, focused
        className,
      )}
      {...props}
    >
      {!collapse && <IcArrowLeft width="32px" height="32px" />}
      {collapse && <IcArrowRight width="32px" height="32px" />}
    </button>
  );
};
