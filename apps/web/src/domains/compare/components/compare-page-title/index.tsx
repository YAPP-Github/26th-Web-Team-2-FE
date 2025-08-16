import { Button, cn, IcEdit, IcMap, IcSave, IcShare, IcTable } from "@ssok/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { ViewMode } from "@/domains/compare/hooks/use-view-mode";
import type { ComparisonFormData } from "@/domains/compare/types";
import PageTitle from "./page-title";

export interface ComparePageTitleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onSave: () => void;
  isLoading?: boolean;
  className?: string;
}

const ComparePageTitle = ({
  currentView,
  onViewChange,
  onSave,
  isLoading = false,
  className,
}: ComparePageTitleProps) => {
  const { control } = useFormContext<ComparisonFormData>();
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Controller
        control={control}
        name="tableName"
        render={({ field }) => (
          <PageTitle
            title={field.value || "비교표"}
            isEditingAvailable={currentView === "edit"}
            onTitleChange={field.onChange}
          />
        )}
      />
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
          <SaveButton onClick={onSave} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

const MapButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="button"
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
      type="button"
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
      type="button"
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
      type="button"
      size="lg"
      variant="text"
      icon={<IcTable width="20" height="20" />}
      onClick={onClick}
    >
      표만보기
    </Button>
  );
};

const SaveButton = ({
  onClick,
  isLoading = false,
}: {
  onClick: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Button
      type="button"
      size="lg"
      variant="primary"
      icon={<IcSave width="20" height="20" />}
      onClick={onClick}
      disabled={isLoading}
    >
      저장하기
    </Button>
  );
};

export default ComparePageTitle;
