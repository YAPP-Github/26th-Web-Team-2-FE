import { Graph } from "@ssok/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { ComparisonFormData, ViewState } from "@/domains/compare/types";

export interface CleanlinessScoreCellProps {
  state: ViewState;
  name: `accommodationRequestList.${number}.cleanlinessScore`;
}

const CleanlinessScoreCell = ({ state, name }: CleanlinessScoreCellProps) => {
  const { control } = useFormContext<ComparisonFormData>();

  const getLabel = (value: number): string => {
    if (value >= 9) return "매우 깨끗";
    if (value >= 7) return "깨끗";
    if (value >= 5) return "보통";
    if (value >= 3) return "나쁨";
    return "매우 나쁨";
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Graph
            value={field.value || "0"}
            label={getLabel(parseFloat(field.value || "0"))}
            showGraph
            state={state}
            onChange={field.onChange}
          />
        );
      }}
    />
  );
};

export default CleanlinessScoreCell;
