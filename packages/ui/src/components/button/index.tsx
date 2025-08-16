import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import { button, buttonText } from "./button.variant";

interface CommonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

interface ButtonBaseProps extends CommonProps {
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "sticky";
  variant: "primary" | "secondary" | "text" | "round" | "black";
  selected?: never;
  additionalText?: string;
}

interface ButtonRoundProps extends CommonProps {
  size?: never;
  variant: "round";
  selected: boolean;
  additionalText?: never;
}

export type ButtonProps = ButtonBaseProps | ButtonRoundProps;

const Button = ({
  children,
  className,
  size,
  icon,
  selected,
  variant = "primary",
  additionalText,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(button({ size, variant, selected, disabled }), className)}
      {...props}
    >
      {icon && <>{icon}</>}
      <span className={buttonText({ size })}>{children}</span>
      {additionalText && (
        <span className="text-body2-medi14">{additionalText}</span>
      )}
    </button>
  );
};

export default Button;
