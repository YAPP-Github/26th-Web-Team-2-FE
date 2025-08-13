import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, type ReactNode, useMemo } from "react";
import { TextField } from "@/components/text-field";
import { cn } from "@/utils";

export interface GraphProps
  extends Omit<ComponentProps<"div">, "onChange">,
    VariantProps<typeof variants> {
  value: string;
  label: string;
  showGraph?: boolean;
  icon?: ReactNode;
  onChange?: (value: string) => void;
}

const variants = cva(
  [
    "flex w-full flex-col gap-[0.8rem] rounded-[1.2rem] p-[1.6rem]",
    "transition-colors duration-200",
  ],
  {
    variants: {
      state: {
        default: "bg-neutral-98",
        active: "bg-neutral-95",
        edit: "bg-neutral-95",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export const Graph = ({
  state = "default",
  value,
  label,
  icon,
  showGraph = true,
  onChange,
  className,
  ...props
}: GraphProps) => {
  const displayValue = useMemo(() => {
    const parsed = Number.parseFloat(value);
    return !Number.isNaN(parsed) ? parsed : null;
  }, [value]);

  const [bar, text] = useMemo(() => {
    if (typeof displayValue === "number" && displayValue >= 9) {
      return state === "default"
        ? [cn("bg-tertiary-50"), cn("text-tertiary-50")]
        : [cn("bg-tertiary-40"), cn("text-tertiary-40")];
    } else if (typeof displayValue === "number" && displayValue >= 7) {
      return state === "default"
        ? [cn("bg-tertiary-60"), cn("text-tertiary-60")]
        : [cn("bg-tertiary-50"), cn("text-tertiary-50")];
    } else if (typeof displayValue === "number" && displayValue >= 5) {
      return state === "default"
        ? [cn("bg-tertiary-80"), cn("text-tertiary-80")]
        : [cn("bg-tertiary-60"), cn("text-tertiary-60")];
    } else if (typeof displayValue === "number" && displayValue >= 3) {
      return state === "default"
        ? [cn("bg-neutral-variant-70"), cn("text-neutral-variant-70")]
        : [cn("bg-neutral-variant-60"), cn("text-neutral-variant-60")];
    } else {
      return state === "default"
        ? [cn("bg-neutral-variant-50"), cn("text-neutral-variant-50")]
        : [cn("bg-neutral-variant-40"), cn("text-neutral-variant-40")];
    }
  }, [displayValue, state]);

  return (
    <div className={cn(variants({ state }), className)} {...props}>
      <div className="flex items-center justify-between">
        <span className={cn("text-body1-semi16", text)}>{label}</span>
        <div className="flex items-center gap-[0.8rem]">
          {icon && <div className={cn("h-[2rem] w-[2rem]", text)}>{icon}</div>}
          {state === "edit" ? (
            <TextField
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                "w-[5rem] rounded-[0.8rem] bg-white p-0",
                "[&>input]:px-[1.2rem] [&>input]:py-[0.8rem] [&>input]:text-center [&>input]:text-body1-semi16",
                "[&>input]:[-moz-appearance:_textfield] [&>input]:[&::-webkit-inner-spin-button]:appearance-none [&>input]:[&::-webkit-outer-spin-button]:appearance-none",
                text,
              )}
            />
          ) : (
            <span className={cn("text-body1-semi16", text)}>
              {displayValue?.toFixed(1)}
            </span>
          )}
          <span className="text-body1-medi16 text-neutral-35">/ 10</span>
        </div>
      </div>

      {showGraph && (
        <div className="rounded-full bg-neutral-90">
          <div
            className={cn(
              "h-[0.8rem] rounded-full transition-all duration-200",
              bar,
            )}
            style={{ width: `${Math.min((displayValue || 0) * 10, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};
