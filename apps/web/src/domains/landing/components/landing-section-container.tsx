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
      className={cn(
        "flex w-full flex-col items-center px-[10.4rem] py-[10.4rem]",
        className,
      )}
      style={style}
    >
      {children}
    </section>
  );
};

export default LandingSectionContainer;
