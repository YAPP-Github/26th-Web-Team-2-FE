import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import { cn } from "@/utils";
import { buttonClasses } from "./button.variant";

export type ButtonProps = PropsWithChildren<
  {
    className?: string;
    size: "md" | "lg";
    icon?: boolean;
    color?: "primary" | "secondary";
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

export const Button = ({
  children,
  className,
  size,
  icon = false,
  color = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex gap-2 rounded-[1.2rem] border-none transition-colors duration-200",
        buttonClasses.size[size],
        buttonClasses.variant[color].base,
        buttonClasses.variant[color].hover,
        buttonClasses.variant[color].focus,
        buttonClasses.variant[color].active,
        buttonClasses.variant[color].disabled,
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center">
          <IcVariant
            className="text-neutral-100"
            width={20}
            height={20}
            fill="currentColor"
          />
        </span>
      )}
      {children}
    </button>
  );
};
