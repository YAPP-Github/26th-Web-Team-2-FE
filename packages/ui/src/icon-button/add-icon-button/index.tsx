import type { ButtonHTMLAttributes } from "react";
import IcCheckFill from "@/assets/icons/ic_check_fill.svg?react";
import IcAdd from "@/assets/icons/ic_round-plus.svg?react";
import { cn } from "@/utils";
import { addbutton } from "./add-icon-button.variant";

type AddIconButtonProps = {
  className?: string;
  selected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const AddIconButton = ({
  className,
  selected,
  ...props
}: AddIconButtonProps) => {
  return (
    <button
      aria-label="추가 버튼"
      className={cn(addbutton({ selected: !selected }), className)}
      {...props}
    >
      {selected && (
        <IcCheckFill width="40px" height="40px" role="img" aria-label="확인" />
      )}
      {!selected && (
        <IcAdd width="40px" height="40px" role="img" aria-label="추가" />
      )}
    </button>
  );
};
