import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils";

export type InterimButtonProps = PropsWithChildren<
  {
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

export const InterimButton = ({
  children,
  className = "",
  ...props
}: InterimButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-lg border border-transparent bg-neutral-900 px-4 py-1.5 font-inherit font-medium text-base text-neutral-100 transition-colors duration-200 hover:border-indigo-400 focus:outline-2 focus:outline-auto focus:outline-blue-400 dark:bg-neutral-100 dark:text-neutral-900",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
