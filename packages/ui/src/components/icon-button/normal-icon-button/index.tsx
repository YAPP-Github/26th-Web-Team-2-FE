import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
  type SVGProps,
} from "react";
import { cn } from "@/utils";
import { normalIconButton } from "./normal-icon-button.variant";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const iconSizeMap = {
  sm: "20px",
  md: "24px",
  lg: "32px",
};

const IconButton = ({
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
    <button className={cn(normalIconButton({ size }), className)} {...props}>
      {styledChild || children}
    </button>
  );
};

export default IconButton;
