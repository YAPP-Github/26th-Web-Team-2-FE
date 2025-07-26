import type { PropsWithChildren } from "react";
import MapComponent from "@/shared/components/Map";
import SideNavigation from "@/shared/components/side-navigation";

const BoardsIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <SideNavigation />
      {children}
      <MapComponent />
    </div>
  );
};

export default BoardsIdLayout;
