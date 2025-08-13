import { prefetchGetComparisonTableQuery } from "@ssok/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "@/domains/auth";
import ComparePageView from "@/domains/compare/views/compare-page-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

interface BoardsIdComparesCompareIdPageProps {
  params: Promise<{
    id: string;
    "table-id": string;
  }>;
}

const BoardsIdComparesCompareIdPage = async ({
  params,
}: BoardsIdComparesCompareIdPageProps) => {
  const searchParams = await params;
  const boardId = Number(searchParams.id);
  const tableId = Number(searchParams["table-id"]);

  const queryClient = getQueryClient();
  if (!Number.isNaN(tableId) && tableId > 0) {
    const session = await auth.getSession();
    await prefetchGetComparisonTableQuery(queryClient, tableId, {
      request: {
        headers: session
          ? { Authorization: `Bearer ${session.tokenSet.accessToken}` }
          : {},
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ComparePageView boardId={boardId} tableId={tableId} />
    </HydrationBoundary>
  );
};

export default BoardsIdComparesCompareIdPage;
