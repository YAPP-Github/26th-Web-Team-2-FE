import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import { button, buttonText } from "./button.variant";

type CommonProps = {
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonBaseProps = {
  size: "sm" | "md" | "lg" | "sticky";
  variant: "primary" | "secondary" | "text";
  selected?: never;
  additionalText?: string;
} & CommonProps;

type ButtonRoundProps = {
  size?: never;
  variant: "round";
  selected: boolean;
  additionalText?: never;
} & CommonProps;

export type ButtonProps = ButtonBaseProps | ButtonRoundProps;

export const Button = ({
  children,
  className,
  size,
  icon,
  selected,
  variant = "primary",
  additionalText,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(button({ size, variant, selected: selected }), className)}
      {...props}
    >
      {icon && icon}
      <p className={buttonText({ size })}>{children}</p>
      {additionalText && (
        <span className="text-body2-medi14">{additionalText}</span>
      )}
    </button>
  );
};
