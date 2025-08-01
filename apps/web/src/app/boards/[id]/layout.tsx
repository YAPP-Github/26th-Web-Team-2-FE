import type { PropsWithChildren } from "react";
import { AccommodationProvider } from "@/domains/list/contexts/accomodation-context";
import MapComponent from "@/shared/components/map-component";
import SideNavigation from "@/shared/components/side-navigation";

const BoardsIdLayout = async ({ children }: PropsWithChildren) => {
  return (
    <AccommodationProvider>
      <div className="flex h-screen">
        <SideNavigation />
        {children}
        <MapComponent />
      </div>
    </AccommodationProvider>
  );
};

export default BoardsIdLayout;
