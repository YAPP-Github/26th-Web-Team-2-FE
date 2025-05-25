import type { PropsWithChildren } from "react";

export type InterimTitleProps = PropsWithChildren<{
  className?: string;
}>;

export const InterimTitle = ({
  children,
  className = "",
  ...props
}: InterimTitleProps) => {
  return (
    <h1 className={`my-8 font-bold text-5xl ${className}`} {...props}>
      {children}
    </h1>
  );
};
