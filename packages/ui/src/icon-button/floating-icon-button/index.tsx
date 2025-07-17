import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
  type SVGProps,
} from "react";
import { cn } from "@/utils";

type IconButtonProps = {
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FloatingIconButton = ({
  className,
  children,
  ...props
}: IconButtonProps) => {
  const styledChild =
    isValidElement(children) && children.type === "svg"
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
        "absolute z-1 flex items-center justify-center rounded-[0.8rem] border-none p-[0.8rem] shadow-floating backdrop-blur-[1rem]",
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
