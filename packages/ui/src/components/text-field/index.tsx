import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils";

export interface TextFieldProps
  extends ComponentProps<"input">,
    VariantProps<typeof variants> {
  icon?: ReactNode;
  endIcon?: ReactNode;
  hasError?: boolean;
}

const variants = cva(
  [
    "relative flex w-full items-center rounded-[1.2rem] border outline-none",
    "text-body1-regular16 text-neutral-20",
    "transition-all duration-200",
  ],
  {
    variants: {
      hasError: {
        true: cn(
          "[&>[data-slot=icon]]:text-error-60",
          "border-error-70 focus-within:border-transparent focus-within:shadow-[0_0_0_2px_theme(colors.error.70)]",
        ),
        false: cn(
          "[&>[data-slot=icon]]:text-neutral-50",
          "border-neutral-90 focus-within:border-transparent focus-within:shadow-[0_0_0_2px_theme(colors.neutral.80)]",
        ),
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export const TextField = ({
  className,
  icon,
  endIcon,
  hasError = false,
  value,
  ...props
}: TextFieldProps) => {
  const hasValue = String(value).length > 0;

  return (
    <div className={cn(variants({ hasError }), className)}>
      {icon && (
        <div
          data-slot="icon"
          className={cn(
            "absolute left-[1.6rem] flex h-[2.4rem] w-[2.4rem] items-center justify-center",
            "text-neutral-50 transition-opacity duration-200",
            hasValue ? "opacity-0" : "opacity-100",
          )}
        >
          {icon}
        </div>
      )}
      <input
        value={value}
        className={cn(
          "w-full px-[1.6rem] py-[1.2rem]",
          "border-none bg-transparent outline-none",
          "text-inherit placeholder:text-neutral-70",
          "transition-all duration-200",
          icon && !hasValue && "indent-[3.2rem]",
          endIcon && "pr-[4.8rem]",
        )}
        {...props}
      />
      {endIcon && (
        <div
          data-slot="icon"
          className="absolute right-[1.6rem] flex h-[2.4rem] w-[2.4rem] items-center justify-center"
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};
