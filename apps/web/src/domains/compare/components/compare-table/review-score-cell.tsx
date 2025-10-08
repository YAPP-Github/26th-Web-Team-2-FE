import { Graph, IcStarFull } from "@ssok/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { ComparisonFormData, ViewState } from "@/domains/compare/types";
import { parseScore } from "@/domains/compare/utils/validation";

export interface ReviewScoreCellProps {
  state: ViewState;
  name: `accommodationRequestList.${number}.reviewScore`;
}

const ReviewScoreCell = ({ state, name }: ReviewScoreCellProps) => {
  const { control } = useFormContext<ComparisonFormData>();

  const getLabel = (value: number): string => {
    if (value >= 9) return "매우 좋음";
    if (value >= 7) return "좋음";
    if (value >= 5) return "보통";
    if (value >= 3) return "불만족";
    return "매우 불만족";
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Graph
          value={field.value || "0"}
          label={getLabel(parseFloat(field.value || "0"))}
          icon={<IcStarFull />}
          showGraph={false}
          state={state}
          onChange={(value) => field.onChange(parseScore(value))}
          inputProps={{ type: "number", min: "0", max: "10", step: "0.1" }}
        />
      )}
    />
  );
};

export default ReviewScoreCell;
