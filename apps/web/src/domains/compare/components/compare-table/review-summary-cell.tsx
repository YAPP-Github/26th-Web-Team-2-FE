import { Textarea } from "@ssok/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { ComparisonFormData, ViewState } from "@/domains/compare/types";

export interface ReviewSummaryCellProps {
  state: ViewState;
  name: `accommodationRequestList.${number}.reviewSummary`;
}

const ReviewSummaryCell = ({ state, name }: ReviewSummaryCellProps) => {
  const { control } = useFormContext<ComparisonFormData>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Textarea
          {...field}
          value={typeof field.value === "string" ? field.value : ""}
          maxLength={100}
          placeholder="리뷰 요약을 입력해주세요..."
          disabled={state !== "edit"}
        />
      )}
    />
  );
};

export default ReviewSummaryCell;
