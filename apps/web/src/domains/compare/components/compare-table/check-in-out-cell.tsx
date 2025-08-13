import { useFormContext } from "react-hook-form";
import type { ComparisonFormData, ViewState } from "@/domains/compare/types";
import TableTimeContents from "../table-time-contents";

interface CheckInOutCellProps {
  state: ViewState;
  checkInName: `accommodationRequestList.${number}.checkInTime`;
  checkOutName: `accommodationRequestList.${number}.checkOutTime`;
}

const CheckInOutCell = ({
  state,
  checkInName,
  checkOutName,
}: CheckInOutCellProps) => {
  const { setValue, watch } = useFormContext<ComparisonFormData>();

  const checkInTime = watch(checkInName);
  const checkOutTime = watch(checkOutName);

  const handleCheckInChange = (time: string) => {
    setValue(checkInName, { ...checkInTime, from: time });
  };

  const handleCheckOutChange = (time: string) => {
    setValue(checkOutName, { ...checkOutTime, to: time });
  };

  console.log({ checkInTime, checkOutTime });

  return (
    <TableTimeContents
      checkInAt={checkInTime?.from || null}
      checkOutAt={checkOutTime?.to || null}
      onCheckInChange={state === "edit" ? handleCheckInChange : undefined}
      onCheckOutChange={state === "edit" ? handleCheckOutChange : undefined}
      state={state}
    />
  );
};

export default CheckInOutCell;
