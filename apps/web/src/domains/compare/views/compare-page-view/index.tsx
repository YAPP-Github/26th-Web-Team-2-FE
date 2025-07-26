"use client";

import ComparePageHeader from "@/domains/compare/components/compare-page-header";
import ComparePageTitle from "@/domains/compare/components/compare-page-title";
import CompareTable from "@/domains/compare/components/compare-table";
import { useCompareData } from "@/domains/compare/hooks/use-compare-data";

interface ComparePageViewProps {
  compareId: string;
}

const ComparePageView = ({ compareId }: ComparePageViewProps) => {
  const { compareItems } = useCompareData(compareId);

  return (
    <main className="flex h-screen flex-col bg-neutral-98 p-[2.4rem]">
      <ComparePageHeader
        title="직장 동료들과 라멘 뿌수기"
        creator="이지수님"
        createdAt={new Date("2025-05-22")}
        count={compareItems.length}
        className="mb-[1.6rem]"
      />
      <ComparePageTitle title="도쿄 숙소" className="mb-[3.2rem]" />
      <CompareTable items={compareItems} />
    </main>
  );
};

export default ComparePageView;
