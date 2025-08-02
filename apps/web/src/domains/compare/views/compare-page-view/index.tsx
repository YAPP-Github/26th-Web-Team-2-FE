"use client";

import { cn } from "@ssok/ui";
import ComparePageHeader from "@/domains/compare/components/compare-page-header";
import ComparePageTitle from "@/domains/compare/components/compare-page-title";
import CompareTable from "@/domains/compare/components/compare-table";
import { useCompareData } from "@/domains/compare/hooks/use-compare-data";
import { useViewMode } from "@/domains/compare/hooks/use-view-mode";

interface ComparePageViewProps {
  compareId: string;
}

const ComparePageView = ({ compareId }: ComparePageViewProps) => {
  const { compareItems } = useCompareData(compareId);
  const { currentView, handleViewChange } = useViewMode();

  return (
    <main
      className={cn(
        "flex h-screen flex-col bg-neutral-98 p-[2.4rem] transition-all duration-500 ease-in-out",
        ["table", "edit"].includes(currentView) && "w-full [&+div]:w-0",
        currentView === "map" && "w-[min(71.6rem,100%)] shrink-0",
      )}
    >
      <ComparePageHeader
        title="직장 동료들과 라멘 뿌수기"
        creator="이지수님"
        createdAt={new Date("2025-05-22")}
        count={compareItems.length}
        className="mb-[1.6rem] shrink-0"
      />
      <ComparePageTitle
        title="도쿄 숙소"
        currentView={currentView}
        onViewChange={handleViewChange}
        className="mb-[3.2rem] shrink-0"
      />

      <CompareTable
        items={compareItems}
        state={currentView === "edit" ? "edit" : "default"}
      />
    </main>
  );
};

export default ComparePageView;
