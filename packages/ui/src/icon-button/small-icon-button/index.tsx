import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

type IconButtonProps = {
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
  className,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={cn(
        "group relative flex h-[4rem] w-[4rem] items-center justify-center rounded-[1.2rem] border-none bg-transparent text-neutral-40",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {/* 배경 레이어 */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-[1.2rem]",
          "bg-transparent transition-colors duration-150",
          "opacity-3-75 group-hover:bg-secondary-25",
          "opacity-7 group-focus:bg-primary-60",
          "opacity-12 group-active:bg-primary-50",
        )}
      />

      {/* 아이콘 레이어 */}
      <div className="relative z-1 flex items-center justify-center">
        {children}
      </div>
    </button>
  );
};
