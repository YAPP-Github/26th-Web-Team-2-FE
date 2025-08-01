import type { ViewState } from "@/domains/compare/types";

interface ReviewSummaryCellProps {
  summary: string;
  state?: ViewState;
}

const ReviewSummaryCell = ({ summary }: ReviewSummaryCellProps) => {
  return (
    <section className="flex rounded-[1.2rem] bg-neutral-98 p-[1.6rem] text-body1-semi16 text-neutral-30">
      {summary}
    </section>
  );
};

export default ReviewSummaryCell;
