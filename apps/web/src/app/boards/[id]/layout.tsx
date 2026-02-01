import type { PropsWithChildren } from "react";
import AccommodationDataProvider from "@/domains/list/contexts/accomodation-data-context";
import PanelProvider from "@/domains/list/contexts/pannel-context";
import PlaceSelectionProvider from "@/domains/list/contexts/place-select-context";
import MapComponent from "@/shared/components/map-component";
import MobileIncompatibleLayout from "@/shared/components/mobile-incompatible-layout";
import SideNavigation from "@/shared/components/side-navigation";

const BoardsIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <MobileIncompatibleLayout>
      <AccommodationDataProvider>
        <PanelProvider>
          <PlaceSelectionProvider>
            <div className="flex h-screen w-full overflow-hidden">
              <SideNavigation />
              <div className="relative flex min-w-0 flex-1">
                {children}
                <MapComponent className="transition-all duration-500 ease-in-out" />
              </div>
            </div>
          </PlaceSelectionProvider>
        </PanelProvider>
      </AccommodationDataProvider>
    </MobileIncompatibleLayout>
  );
};

export default BoardsIdLayout;
