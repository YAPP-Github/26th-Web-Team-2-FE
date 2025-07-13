import type { ButtonHTMLAttributes } from "react";
import IcArrowLeft from "@/assets/icons/ic_arrow_left.svg?react";
import IcArrowRight from "@/assets/icons/ic_arrow_right.svg?react";
import { cn } from "@/utils";

type SolidExpandProps = {
  className?: string;
  expand: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SolidExpand = ({
  className,
  expand,
  ...props
}: SolidExpandProps) => {
  return (
    <button
      aria-label="보드 확장 버튼"
      className={cn(
        "inline-flex rounded-tr-[16px] rounded-br-[16px] py-[1.6rem] pr-[0.6rem] pl-[0.2rem]",
        "border-t border-r border-b border-l-0",
        "border-neutral-70 bg-neutral-98", // default
        !expand && "hover:bg-neutral-95 active:bg-neutral-90", // hover, avtive
        className,
      )}
      {...props}
    >
      {!expand && <IcArrowLeft width="32px" height="32px" role="button" />}
      {expand && <IcArrowRight width="32px" height="32px" role="button" />}
    </button>
  );
};
