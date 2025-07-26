"use client";

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

const MapComponent = () => {
  return (
    <div className="relative h-screen w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={calculateCenter(locMock)}
        defaultZoom={11}
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
      {/* 지도 opacity 조정을 위한 div */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-2 bg-neutral-70 opacity-20" />
    </div>
  );
};

export default MapComponent;
