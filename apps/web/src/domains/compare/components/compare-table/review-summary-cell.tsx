import { Textarea } from "@ssok/ui";
import type { ViewState } from "@/domains/compare/types";

interface ReviewSummaryCellProps {
  summary: string;
  state?: ViewState;
}

const ReviewSummaryCell = ({ summary, state }: ReviewSummaryCellProps) => {
  return (
    <Textarea disabled={state !== "edit"} value={summary} maxLength={100} />
  );
};

export default ReviewSummaryCell;
