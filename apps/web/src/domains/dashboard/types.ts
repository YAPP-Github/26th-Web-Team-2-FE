import type { TripBoardCreateRequest } from "@ssok/api/schemas";
import type { DateRangeValue } from "@ssok/ui";

export type BoardCreateFormData = Omit<
  TripBoardCreateRequest,
  "boardName" | "startDate" | "endDate"
> & {
  dateRange: DateRangeValue;
};
