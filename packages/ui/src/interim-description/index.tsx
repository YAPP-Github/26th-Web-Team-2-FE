import type { PropsWithChildren } from "react";
import { cn } from "@/utils";

export type InterimDescriptionProps = PropsWithChildren<{
  className?: string;
}>;

export const InterimDescription = ({
  children,
  className = "",
  ...props
}: InterimDescriptionProps) => {
  return (
    <p className={cn("my-4 text-base", className)} {...props}>
      {children}
    </p>
  );
};
