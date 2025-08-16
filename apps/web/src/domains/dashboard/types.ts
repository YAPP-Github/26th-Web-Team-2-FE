import type { TripBoardCreateRequest } from "@ssok/api/schemas";
import type { DateRangeValue } from "@ssok/ui";

export interface BoardCreateFormData
  extends Omit<TripBoardCreateRequest, "boardName" | "startDate" | "endDate"> {
  dateRange: DateRangeValue;
}
