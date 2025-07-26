import type { Accommodation } from "@/domains/compare/types";
import TableTimeContents from "../table-time-contents";

interface CheckInOutCellProps {
  checkInTime: Required<NonNullable<Accommodation["checkInTime"]>>;
  checkOutTime: Required<NonNullable<Accommodation["checkOutTime"]>>;
}

const CheckInOutCell = ({ checkInTime, checkOutTime }: CheckInOutCellProps) => {
  const transform = (time: string) => new Date(`1970-01-01T${time}:00+09:00`);
  return (
    <TableTimeContents
      checkInAt={transform(checkInTime.checkInTimeFrom)}
      checkOutAt={transform(checkOutTime.checkInTimeTo)}
    />
  );
};

export default CheckInOutCell;
