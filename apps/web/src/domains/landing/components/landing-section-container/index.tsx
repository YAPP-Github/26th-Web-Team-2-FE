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
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-[123.2rem] px-[10.4rem] max-md:px-[4rem]">
        {children}
      </div>
    </section>
  );
};

export default LandingSectionContainer;
