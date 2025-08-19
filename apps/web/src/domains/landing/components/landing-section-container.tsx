"use client";

import { cn } from "@ssok/ui";
import type { CSSProperties, ReactNode } from "react";

interface LandingSectionContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const LandingSectionContainer = ({
  children,
  className,
  style,
}: LandingSectionContainerProps) => {
  return (
    <section
      className={cn("w-full px-[10.4rem] max-md:px-[4rem]", className)}
      style={style}
    >
      {children}
    </section>
  );
};

export default LandingSectionContainer;
