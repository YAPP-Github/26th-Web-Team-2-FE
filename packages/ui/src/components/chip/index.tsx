import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type SVGProps,
} from "react";
import { cn } from "@/utils";
import { chip } from "./chip.variant";

export type ChipProps = {
  className?: string;
  size: "xs" | "md";
  icon?: React.ReactNode;
  additionalText?: string;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const iconSizeMap = {
  xs: "12px",
  md: "14px",
};

export const Chip = ({
  text,
  className,
  size,
  icon = null,
  additionalText,
  ...props
}: ChipProps) => {
  const iconSize = iconSizeMap[size];

  const styledIcon = isValidElement(icon)
    ? cloneElement(icon as ReactElement<SVGProps<SVGSVGElement>>, {
        width: iconSize,
        height: iconSize,
        style: { width: iconSize, height: iconSize },
      })
    : icon;

  return (
    <button
      className={cn(chip({ size, hasIcon: !!icon }), className)}
      aria-label={additionalText ? `${text} ${additionalText}` : text}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center" aria-hidden="true">
          {styledIcon}
        </span>
      )}
      <span>{text}</span>
      {additionalText && (
        <span className="text-neutral-40">{additionalText}</span>
      )}
    </button>
  );
};
