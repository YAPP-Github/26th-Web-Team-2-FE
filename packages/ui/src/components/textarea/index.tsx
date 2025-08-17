import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/utils";

export interface TextareaProps
  extends ComponentProps<typeof TextareaAutosize>,
    VariantProps<typeof variants> {
  maxLength?: number;
}

const variants = cva(
  [
    "w-full resize-none rounded-[1.2rem] border p-[1.6rem] outline-none",
    "text-body1-medi16 text-neutral-30",
    "transition-all duration-200",
    "placeholder:text-body2-medi14 placeholder:text-neutral-80",
    "disabled:cursor-default disabled:border-transparent disabled:bg-neutral-98 disabled:text-neutral-30",
  ],
  {
    variants: {
      hasError: {
        true: "border-error-70 focus:border-transparent focus:shadow-[0_0_0_2px_theme(colors.error.70)]",
        false:
          "border-neutral-90 focus:border-transparent focus:shadow-[0_0_0_2px_theme(colors.neutral.80)]",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

const Textarea = ({
  hasError = false,
  minRows = 3,
  maxRows = 10,
  value = "",
  maxLength,
  className,
  ...props
}: TextareaProps) => {
  const currentLength = String(value).length;

  return (
    <div className={cn("relative", className)}>
      <TextareaAutosize
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        maxLength={maxLength}
        className={cn(variants({ hasError }), maxLength && "pb-[3.2rem]")}
        {...props}
      />
      {maxLength && !props.disabled && (
        <span className="pointer-events-none absolute right-[1.6rem] bottom-[1.6rem] text-caption1-medi12 text-neutral-70">
          <span className="text-caption1-semi12">{currentLength}</span> /{" "}
          {maxLength}
        </span>
      )}
    </div>
  );
};

export default Textarea;
