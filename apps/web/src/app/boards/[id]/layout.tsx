import type { PropsWithChildren } from "react";
import SideNavigation from "@/shared/components/SideNavigation";

const BoardsIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <SideNavigation />
      {children}
    </div>
  );
};

export default BoardsIdLayout;
