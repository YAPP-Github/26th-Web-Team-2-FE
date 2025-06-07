import type { PropsWithChildren } from "react";
import { cn } from "@/utils";

export type InterimTitleProps = PropsWithChildren<{
  className?: string;
}>;

export const InterimTitle = ({
  children,
  className = "",
  ...props
}: InterimTitleProps) => {
  return (
    <h1 className={cn("my-8 font-bold text-5xl", className)} {...props}>
      {children}
    </h1>
  );
};
