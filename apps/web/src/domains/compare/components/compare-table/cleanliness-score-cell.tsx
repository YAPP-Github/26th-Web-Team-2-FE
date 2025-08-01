import { Graph } from "@ssok/ui";
import type { ViewState } from "@/domains/compare/types";

interface CleanlinessScoreCellProps {
  score: number;
  state?: ViewState;
}

const CleanlinessScoreCell = ({ score }: CleanlinessScoreCellProps) => {
  const getLabel = (value: number): string => {
    if (value >= 9) return "매우 깨끗";
    if (value >= 7) return "깨끗";
    if (value >= 5) return "보통";
    if (value >= 3) return "나쁨";
    return "매우 나쁨";
  };

  return <Graph value={score} label={getLabel(score)} showGraph />;
};

export default CleanlinessScoreCell;
