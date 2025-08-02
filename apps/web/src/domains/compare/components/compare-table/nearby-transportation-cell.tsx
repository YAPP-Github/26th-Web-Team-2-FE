import { IcCar, IcWalker } from "@ssok/ui";
import TablePlacesContents from "@/domains/compare/components/table-places-contents";
import type { Accommodation, ViewState } from "@/domains/compare/types";

interface NearbyTransportationCellProps {
  transportation: NonNullable<Accommodation["nearbyTransportation"]>;
  state?: ViewState;
}

const NearbyTransportationCell = ({
  transportation,
  state,
}: NearbyTransportationCellProps) => {
  const contents = transportation.map(({ name, byCar, byFoot }) => {
    return {
      text: name || "",
      label: byFoot?.time || byCar?.time || "",
      icon: byFoot?.time ? <IcWalker /> : <IcCar />,
    };
  });

  return <TablePlacesContents contents={contents} state={state} />;
};

export default NearbyTransportationCell;
