"use client";

import { cn } from "@ssok/ui";
import GoogleMapReact from "google-map-react";
import MapPin from "@/shared/components/map-component/map-pin";
import { calculateCenter } from "@/shared/utils/map";

// TODO: mock 데이터 삭제 후 실제 데이터로 교체
const locMock = [
  { id: 1, latitude: 37.5665, longitude: 126.978, label: "서울 시청이야!" },
  { id: 2, latitude: 37.3943, longitude: 126.9568, label: "여긴 안양이야!" },
  { id: 3, latitude: 37.3219, longitude: 127.1265, label: "성남 어쩌구 숙소" },
  {
    id: 4,
    latitude: 37.5407,
    longitude: 127.0796,
    label: "광진구 저쩌구 숙소",
  },
  { id: 5, latitude: 37.4563, longitude: 126.7052, label: "인천 어쩌구 숙소" },
];

const MapComponent = ({ className }: { className?: string }) => (
  <div className={cn("relative h-screen w-full", className)}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      }}
      defaultCenter={calculateCenter(locMock)}
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
      {locMock.map((location) => (
        <MapPin
          key={location.id}
          lat={location.latitude}
          lng={location.longitude}
        >
          {location.label}
        </MapPin>
      ))}
    </GoogleMapReact>
  </div>
);

export default MapComponent;
