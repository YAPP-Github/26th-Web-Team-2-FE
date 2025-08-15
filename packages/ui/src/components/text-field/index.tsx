import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import { cn } from "@/utils";

export interface TextFieldProps
  extends ComponentProps<"input">,
    VariantProps<typeof variants> {
  icon?: ReactNode;
  endIcon?: ReactNode;
  hasError?: boolean;
  maxLength?: number;
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
  value,
  maxLength,
  hasError: hasError_,
  ...props
}: TextFieldProps) => {
  const hasValue = String(value).length > 0;
  const currentLength = String(value).length;
  const isOverLimit = maxLength && currentLength > maxLength;

  const hasError = hasError_ || isOverLimit || false;
  const endIcon = props.endIcon || (isOverLimit ? <IcAlert /> : undefined);
  const showCharacterCount = maxLength && !props.disabled;

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
        maxLength={maxLength}
        className={cn(
          "w-full px-[1.6rem] py-[1.2rem]",
          "border-none bg-transparent outline-none",
          "text-inherit placeholder:text-neutral-70",
          "transition-all duration-200",
          icon && !hasValue && "indent-[3.2rem]",
          endIcon && !showCharacterCount && "pr-[4.8rem]",
          endIcon && showCharacterCount && "pr-[11.2rem]",
          !endIcon && showCharacterCount && "pr-[6.4rem]",
        )}
        {...props}
      />
      {showCharacterCount && (
        <div
          className={cn(
            "-translate-y-1/2 absolute top-1/2 flex items-center gap-[0.2rem]",
            "pointer-events-none text-caption1-medi12",
            endIcon ? "right-[4.8rem]" : "right-[1.6rem]",
            hasError ? "text-error-80" : "text-neutral-70",
          )}
        >
          <span
            className={cn(
              "text-caption1-semi12",
              hasError ? "text-error-70" : "text-neutral-60",
            )}
          >
            {currentLength}
          </span>
          <span>/</span>
          <span>{maxLength}</span>
        </div>
      )}
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
