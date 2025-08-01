import { Graph, IcStarFull } from "@ssok/ui";

interface ReviewScoreCellProps {
  score: number;
}

const ReviewScoreCell = ({ score }: ReviewScoreCellProps) => {
  const getLabel = (value: number): string => {
    if (value >= 9) return "매우 좋음";
    if (value >= 7) return "좋음";
    if (value >= 5) return "보통";
    if (value >= 3) return "불만족";
    return "매우 불만족";
  };

  return (
    <Graph
      value={score}
      label={getLabel(score)}
      icon={<IcStarFull />}
      showGraph={false}
    />
  );
};

export default ReviewScoreCell;
