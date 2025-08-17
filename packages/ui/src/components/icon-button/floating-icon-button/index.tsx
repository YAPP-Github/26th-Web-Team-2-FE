import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
  type SVGProps,
} from "react";
import { cn } from "@/utils";

export interface FloatingIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const FloatingIconButton = ({
  className,
  children,
  ...props
}: FloatingIconButtonProps) => {
  const styledChild = isValidElement(children)
    ? cloneElement(children as ReactElement<SVGProps<SVGSVGElement>>, {
        width: "3.2rem",
        height: "3.2rem",
        style: { width: "3.2rem", height: "3.2rem" },
      })
    : children;

  return (
    <button
      aria-label="플로팅 아이콘 버튼"
      className={cn(
        "absolute z-1 flex cursor-pointer items-center justify-center rounded-[0.8rem] border-none p-[0.8rem] shadow-floating backdrop-blur-[1rem] disabled:cursor-not-allowed",
        "bg-[rgba(199,199,199,0.20)] text-neutral-40",
        "hover:bg-neutral-20 hover:text-primary-100",
        "focus:bg-[rgba(145,145,145,0.20)] focus:text-neutral-40",
        className,
      )}
      {...props}
    >
      {styledChild}
    </button>
  );
};

export default FloatingIconButton;
