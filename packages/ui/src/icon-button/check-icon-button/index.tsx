import type { ButtonHTMLAttributes } from "react";
import IcCheckFill from "@/assets/icons/ic_check_fill.svg?react";
import { cn } from "@/utils";
import { checkButton } from "./check-icon-button.variant";

type IconButtonProps = {
  className?: string;
  size: "sm" | "md";
  selected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CheckIconButton = ({
  className,
  selected,
  size,
  ...props
}: IconButtonProps) => {
  const iconSize = size === "sm" ? "20px" : "24px";

  return (
    <button
      aria-label="체크 버튼"
      className={cn(checkButton({ size, selected }), className)}
      {...props}
    >
      {selected && (
        <IcCheckFill width={iconSize} height={iconSize} role="img" />
      )}
    </button>
  );
};
