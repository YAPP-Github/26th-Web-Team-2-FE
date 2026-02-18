import { cn } from "@ssok/ui";
import type { PropsWithChildren } from "react";
import Header from "../header";

export interface HeaderLayoutProps extends PropsWithChildren {
  className?: string;
}

const HeaderLayout = ({ children, className }: HeaderLayoutProps) => {
  return (
    <>
      <Header />
      <div className={cn("Fax-xl:pt-header-mobile pt-header", className)}>
        {children}
      </div>
    </>
  );
};

export default HeaderLayout;
