import { Button, cn, IcEdit, IcMap, IcSave, IcShare, IcTable } from "@ssok/ui";
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
          <>
            <MapButton onClick={() => onViewChange("map")} />
            <EditButton onClick={() => onViewChange("edit")} />
            <ShareButton onClick={() => {}} />
          </>
        )}
        {currentView === "map" && (
          <>
            <TableButton onClick={() => onViewChange("table")} />
            <EditButton onClick={() => onViewChange("edit")} />
            <ShareButton onClick={() => {}} />
          </>
        )}
        {currentView === "edit" && (
          <SaveButton onClick={() => onViewChange("table")} />
        )}
      </div>
    </div>
  );
};

const MapButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="lg"
      variant="text"
      icon={<IcMap width="20" height="20" />}
      onClick={onClick}
    >
      지도뷰
    </Button>
  );
};

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="lg"
      variant="secondary"
      icon={<IcEdit width="20" height="20" />}
      onClick={onClick}
    >
      편집하기
    </Button>
  );
};

const ShareButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="lg"
      variant="primary"
      icon={<IcShare width="20" height="20" />}
      onClick={onClick}
    >
      공유하기
    </Button>
  );
};

const TableButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="lg"
      variant="text"
      icon={<IcTable width="20" height="20" />}
      onClick={onClick}
    >
      표만보기
    </Button>
  );
};

const SaveButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="lg"
      variant="primary"
      icon={<IcSave width="20" height="20" />}
      onClick={onClick}
    >
      저장하기
    </Button>
  );
};

export default ComparePageTitle;
