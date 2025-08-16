import { cn } from "@ssok/ui";
import type { ComponentProps } from "react";

export interface AddButtonProps extends ComponentProps<"button"> {
  className?: string;
}

const AddButton = ({ children, className, ...props }: AddButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-[1.2rem]",
        "border-2 border-neutral-90 border-dashed hover:border-neutral-80",
        "bg-neutral-99 py-[1.6rem] transition-colors hover:bg-neutral-95",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AddButton;
