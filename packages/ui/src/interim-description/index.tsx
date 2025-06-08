import type { PropsWithChildren } from "react";

export type InterimDescriptionProps = PropsWithChildren<{
  className?: string;
}>;

export const InterimDescription = ({
  children,
  className = "",
  ...props
}: InterimDescriptionProps) => {
  return (
    <p className={`my-4 text-base ${className}`} {...props}>
      {children}
    </p>
  );
};
