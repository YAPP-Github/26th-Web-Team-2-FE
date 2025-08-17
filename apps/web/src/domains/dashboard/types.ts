import type {
  TripBoardCreateRequest,
  TripBoardUpdateRequest,
} from "@ssok/api/schemas";
import type { DateRangeValue } from "@ssok/ui";

export interface BoardCreateFormData
  extends Omit<TripBoardCreateRequest, "boardName" | "startDate" | "endDate"> {
  dateRange: DateRangeValue;
}

export interface BoardEditFormData
  extends Omit<TripBoardUpdateRequest, "startDate" | "endDate"> {
  dateRange: DateRangeValue;
}
