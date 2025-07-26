import ComparePageView from "@/domains/compare/views/compare-page-view";

interface BoardsIdComparesCompareIdPageProps {
  params: Promise<{
    id: string;
    "compare-id": string;
  }>;
}

const BoardsIdComparesCompareIdPage = async ({
  params,
}: BoardsIdComparesCompareIdPageProps) => {
  const { "compare-id": compareId } = await params;
  return <ComparePageView compareId={compareId} />;
};

export default BoardsIdComparesCompareIdPage;
