import type { CheckTime } from "@ssok/api/schemas";

export const isCheckTimeExist = (
  checkTime?: CheckTime,
): checkTime is Required<CheckTime> => {
  return !!checkTime?.checkInTimeFrom && !!checkTime?.checkInTimeTo;
};
