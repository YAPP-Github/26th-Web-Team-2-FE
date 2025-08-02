import type { PropsWithChildren } from "react";
import { AccommodationProvider } from "@/domains/list/contexts/accomodation-context";
import MapComponent from "@/shared/components/map-component";
import SideNavigation from "@/shared/components/side-navigation";

const BoardsIdLayout = async ({ children }: PropsWithChildren) => {
  return (
    <AccommodationProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <SideNavigation />
        <div className="relative flex min-w-0 flex-1">
          {children}
          <MapComponent className="transition-all duration-500 ease-in-out" />
        </div>
      </div>
    </AccommodationProvider>
  );
};

export default BoardsIdLayout;
