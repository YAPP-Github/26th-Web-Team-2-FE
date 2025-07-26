import { Graph } from "@ssok/ui";

interface CleanlinessScoreCellProps {
  score?: number;
}

const CleanlinessScoreCell = ({ score }: CleanlinessScoreCellProps) => {
  const getLabel = (value: number): string => {
    if (value >= 9) return "매우 깨끗";
    if (value >= 7) return "깨끗";
    if (value >= 5) return "보통";
    if (value >= 3) return "나쁨";
    return "매우 나쁨";
  };

  const safeScore = score || 0;

  return <Graph value={safeScore} label={getLabel(safeScore)} showGraph />;
};

export default CleanlinessScoreCell;
