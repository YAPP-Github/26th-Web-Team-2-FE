"use client";

import { cn } from "@ssok/ui";
import type { PropsWithChildren } from "react";

export interface LandingSectionContainerProps
  extends PropsWithChildren<{
    className?: string;
  }> {}

const LandingSectionContainer = ({
  children,
  className,
}: LandingSectionContainerProps) => {
  return (
    <section className={cn("w-full px-[10.4rem] max-md:px-[4rem]", className)}>
      {children}
    </section>
  );
};

export default LandingSectionContainer;
