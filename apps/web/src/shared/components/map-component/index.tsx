"use client";

import GoogleMapReact from "google-map-react";
import { useAccommodationContext } from "@/domains/list/contexts/accomodation-context";
import MapPin from "@/shared/components/map-component/map-pin";
import { calculateCenter } from "@/shared/utils/map";

const MapComponent = () => {
  const { accommodations } = useAccommodationContext();

  const validLocations = accommodations.filter(
    (loc) =>
      typeof loc.latitude === "number" && typeof loc.longitude === "number",
  );

  const center = calculateCenter(validLocations);

  return (
    <div className="relative h-screen w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        }}
        center={center}
        defaultZoom={11}
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
        {accommodations.map((location) => (
          <MapPin
            key={location.id}
            lat={location.latitude as number}
            lng={location.longitude as number}
          >
            {location.accommodationName}
          </MapPin>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
