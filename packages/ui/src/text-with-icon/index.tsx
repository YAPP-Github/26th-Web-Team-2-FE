import type React from "react";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/utils";

export type TextWithIconProps = PropsWithChildren<{
  icon?: React.ReactNode;
  className?: string;
}>;

const TextWithIcon = ({ icon, children, className }: TextWithIconProps) => {
  return (
    <div className={cn("flex max-w-fit items-center", className)}>
      {icon}
      {children}
    </div>
  );
};

TextWithIcon.Text = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <span className={cn("w-full truncate", className)} {...props}>
      {children}
    </span>
  );
};

export default TextWithIcon;
