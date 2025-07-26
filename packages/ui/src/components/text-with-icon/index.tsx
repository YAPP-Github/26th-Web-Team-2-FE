import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { cn } from "@/utils";

export type TextWithIconProps = {
  icon?: ReactNode;
  className?: string;
} & PropsWithChildren<ComponentProps<"div">>;

const TextWithIcon = ({
  icon,
  children,
  className,
  ...props
}: TextWithIconProps) => {
  return (
    <div className={cn("flex max-w-fit items-center", className)} {...props}>
      {icon && <>{icon}</>}
      {children && <>{children}</>}
    </div>
  );
};

TextWithIcon.Text = ({
  children,
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span className={cn("w-full truncate", className)} {...props}>
      {children}
    </span>
  );
};

export default TextWithIcon;
