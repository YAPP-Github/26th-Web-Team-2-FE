import {
  IcAccessibleForward,
  IcCleaningServices,
  IcFitnessCenter,
  IcHomeRepairService,
  IcLocalBar,
  IcLocalParking,
  IcLuggage,
  IcPets,
  IcPointOfSale,
  IcPool,
  IcRestaurant,
  IcWifi,
} from "@ssok/ui";
import TableAmenitiesContents from "@/domains/compare/components/table-amenities-contents";
import type { Accommodation } from "@/domains/compare/types";

interface AmenitiesCellProps {
  amenities: Accommodation["amenities"];
}

const AmenitiesCell = ({ amenities }: AmenitiesCellProps) => {
  const available = amenities
    ?.filter((amenity) => amenity.available && amenity.type)
    .map((amenity) => ({
      text: amenity.type || "",
      label: amenity.description || "",
      icon: <AmenityIcon type={amenity.type || ""} />,
    }));

  return <TableAmenitiesContents contents={available || []} />;
};

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "주차":
      return <IcLocalParking width="20" height="20" />;
    case "조식":
      return <IcRestaurant width="20" height="20" />;
    case "무료 와이파이":
      return <IcWifi width="20" height="20" />;
    case "수영장":
      return <IcPool width="20" height="20" />;
    case "피트니스 & 헬스장":
      return <IcFitnessCenter width="20" height="20" />;
    case "짐보관":
      return <IcLuggage width="20" height="20" />;
    case "바 / 라운지":
      return <IcLocalBar width="20" height="20" />;
    case "프론트데스크":
      return <IcPointOfSale width="20" height="20" />;
    case "반려동물 동반":
      return <IcPets width="20" height="20" />;
    case "비즈니스 서비스":
      return <IcHomeRepairService width="20" height="20" />;
    case "청소 서비스":
      return <IcCleaningServices width="20" height="20" />;
    case "장애인 편의시설":
      return <IcAccessibleForward width="20" height="20" />;
    default:
      return null;
  }
};

export default AmenitiesCell;
