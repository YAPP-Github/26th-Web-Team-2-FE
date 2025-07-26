import { IcCar } from "@ssok/ui";
import TablePlacesContents from "@/domains/compare/components/table-places-contents";
import type { Accommodation } from "@/domains/compare/types";

interface NearbyAttractionsCellProps {
  attractions: Accommodation["nearbyAttractions"];
}

const NearbyAttractionsCell = ({ attractions }: NearbyAttractionsCellProps) => {
  const contents = (attractions || []).map((attraction) => ({
    text: attraction.name || "",
    label: attraction.byCar?.time || "",
    icon: <IcCar />,
  }));

  return <TablePlacesContents contents={contents} />;
};

export default NearbyAttractionsCell;
