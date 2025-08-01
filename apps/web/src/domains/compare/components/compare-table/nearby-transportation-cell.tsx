import { IcCar, IcWalker } from "@ssok/ui";
import TablePlacesContents from "@/domains/compare/components/table-places-contents";
import type { Accommodation } from "@/domains/compare/types";

interface NearbyTransportationCellProps {
  transportation: NonNullable<Accommodation["nearbyTransportation"]>;
}

const NearbyTransportationCell = ({
  transportation,
}: NearbyTransportationCellProps) => {
  const contents = transportation.map(({ name, byCar, byFoot }) => {
    return {
      text: name || "",
      label: byFoot?.time || byCar?.time || "",
      icon: byFoot?.time ? <IcWalker /> : <IcCar />,
    };
  });

  return <TablePlacesContents contents={contents} />;
};

export default NearbyTransportationCell;
