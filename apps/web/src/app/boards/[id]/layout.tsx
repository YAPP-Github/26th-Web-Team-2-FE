import type { PropsWithChildren } from "react";
import MapComponent from "@/shared/components/map-component";
import SideNavigation from "@/shared/components/side-navigation";

const BoardsIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full">
      <SideNavigation />
      <div className="relative flex min-w-0 flex-1">
        {children}
        <MapComponent className="transition-all duration-500 ease-in-out" />
      </div>
    </div>
  );
};

export default BoardsIdLayout;
