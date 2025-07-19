import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
  type SVGProps,
} from "react";
import { cn } from "@/utils";
import { NormalIconButton } from "./normal-icon-button.variant";

type IconButtonProps = {
  className?: string;
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const iconSizeMap = {
  sm: "20px",
  md: "24px",
  lg: "32px",
};

export const IconButton = ({
  className,
  children,
  size,
  ...props
}: IconButtonProps) => {
  const iconSize = iconSizeMap[size];

  const styledChild = isValidElement(children)
    ? cloneElement(children as ReactElement<SVGProps<SVGSVGElement>>, {
        width: iconSize,
        height: iconSize,
        style: { width: iconSize, height: iconSize },
      })
    : children;

  return (
    <button className={cn(NormalIconButton({ size }), className)} {...props}>
      {styledChild || children}
    </button>
  );
};
