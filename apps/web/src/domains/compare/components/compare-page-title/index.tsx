import { Button, cn, IcEdit, IcMap, IcShare, IcTable } from "@ssok/ui";
import type { ViewMode } from "@/domains/compare/hooks/use-view-mode";

interface ComparePageTitleProps {
  title: string;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

const ComparePageTitle = ({
  title,
  currentView,
  onViewChange,
  className,
}: ComparePageTitleProps) => {
  return (
    <div
      className={cn("flex items-center justify-between px-[0.8rem]", className)}
    >
      <h1 className="text-neutral-30 text-title2-medi28">{title}</h1>
      <div className="flex gap-[0.8rem]">
        {currentView === "table" && (
          <Button
            size="lg"
            variant="text"
            icon={<IcMap width="20" height="20" />}
            onClick={() => onViewChange("map")}
          >
            지도뷰
          </Button>
        )}
        {currentView === "map" && (
          <Button
            size="lg"
            variant="text"
            icon={<IcTable width="20" height="20" />}
            onClick={() => onViewChange("table")}
          >
            표만보기
          </Button>
        )}
        <Button
          size="lg"
          variant="secondary"
          icon={<IcEdit width="20" height="20" />}
        >
          편집하기
        </Button>
        <Button
          size="lg"
          variant="primary"
          icon={<IcShare width="20" height="20" />}
        >
          공유하기
        </Button>
      </div>
    </div>
  );
};

export default ComparePageTitle;
