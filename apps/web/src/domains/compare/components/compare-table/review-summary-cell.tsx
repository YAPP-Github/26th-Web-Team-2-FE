interface ReviewSummaryCellProps {
  summary?: string;
}

const ReviewSummaryCell = ({ summary }: ReviewSummaryCellProps) => {
  return (
    <section className="flex rounded-[1.2rem] bg-neutral-98 p-[1.6rem] text-body1-semi16 text-neutral-30">
      {summary || "리뷰 요약 없음"}
    </section>
  );
};

export default ReviewSummaryCell;
