import type { ButtonHTMLAttributes } from "react";
import IcCheckFill from "@/assets/icons/ic_check_fill.svg?react";
import { cn } from "@/utils";
import { checkButton } from "./check-icon-button.variant";

export interface CheckIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size: "sm" | "md";
  selected: boolean;
}

const CheckIconButton = ({
  className,
  selected,
  size,
  ...props
}: CheckIconButtonProps) => {
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

export default CheckIconButton;
