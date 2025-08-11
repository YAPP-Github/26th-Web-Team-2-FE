import type { Accommodation, ViewState } from "@/domains/compare/types";
import TableTimeContents from "../table-time-contents";

interface CheckInOutCellProps {
  checkInTime: Required<NonNullable<Accommodation["checkInTime"]>>;
  checkOutTime: Required<NonNullable<Accommodation["checkOutTime"]>>;
  state?: ViewState;
}

const CheckInOutCell = ({
  checkInTime,
  checkOutTime,
  state,
}: CheckInOutCellProps) => {
  return (
    <TableTimeContents
      checkInAt={checkInTime.from}
      checkOutAt={checkOutTime.to}
      state={state}
    />
  );
};

export default CheckInOutCell;
