"use client";

import { cn } from "@ssok/ui";
import GoogleMapReact from "google-map-react";
import { useAccommodationDataContext } from "@/domains/list/contexts/accomodation-data-context";
import { usePlaceSelectionContext } from "@/domains/list/contexts/place-select-context";
import MapPin from "@/shared/components/map-component/map-pin";
import { calculateCenter } from "@/shared/utils/map";

export interface MapComponentProps {
  className?: string;
}

const MapComponent = ({ className }: MapComponentProps) => {
  const { accommodations } = useAccommodationDataContext();

  const { onSelectPlace, lastSelectedPlace } = usePlaceSelectionContext();

  const validLocations = accommodations.filter(
    (loc) =>
      typeof loc.latitude === "number" && typeof loc.longitude === "number",
  );

  const defaultCenter = calculateCenter(validLocations);

  const lastSelectedLocation = accommodations.find(
    (loc) => loc.id === lastSelectedPlace,
  );

  const center =
    lastSelectedLocation?.latitude && lastSelectedLocation.longitude
      ? {
          lat: lastSelectedLocation.latitude,
          lng: lastSelectedLocation.longitude,
        }
      : defaultCenter;

  const zoom = lastSelectedPlace ? 15 : 11;

  return (
    <div className={cn("relative h-screen w-full", className)}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        }}
        center={center}
        zoom={zoom}
        // TODO: 지도 스타일링 옵션 변경
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ lightness: 60 }, { saturation: 70 }],
            },
          ],
        }}
      >
        {accommodations.map((location) => {
          const isActive = location.id === lastSelectedPlace;
          return (
            <MapPin
              onClick={() => onSelectPlace(location.id as number)}
              key={location.id}
              lat={location.latitude!}
              lng={location.longitude!}
              isActive={isActive}
            >
              {location.accommodationName}
            </MapPin>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
