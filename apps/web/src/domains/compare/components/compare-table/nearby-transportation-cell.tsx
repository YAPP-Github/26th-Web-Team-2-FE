import { IcCar } from "@ssok/ui";
import TablePlacesContents from "@/domains/compare/components/table-places-contents";
import type { Accommodation } from "@/domains/compare/types";

interface NearbyTransportationCellProps {
  transportation: NonNullable<Accommodation["nearbyTransportation"]>;
}

const NearbyTransportationCell = ({
  transportation,
}: NearbyTransportationCellProps) => {
  const contents = transportation.map((transport) => ({
    text: transport.name || "",
    label: transport.byCar?.time || "",
    icon: <IcCar />,
  }));

  return <TablePlacesContents contents={contents} />;
};

export default NearbyTransportationCell;
