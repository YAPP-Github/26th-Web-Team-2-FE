import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/domains/auth";
import { prefetchComparisonTableQuery } from "@/domains/compare/api";
import ComparePageView from "@/domains/compare/views/compare-page-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

interface BoardsIdComparesCompareIdPageProps {
  params: Promise<{
    id: string;
    "table-id": string;
  }>;
  searchParams: Promise<{ shareCode?: string }>;
}

const BoardsIdComparesCompareIdPage = async ({
  params,
  searchParams,
}: BoardsIdComparesCompareIdPageProps) => {
  const resolvedParams = await params;
  const { shareCode } = await searchParams;
  const boardId = Number(resolvedParams.id);
  const tableId = Number(resolvedParams["table-id"]);

  const queryClient = getQueryClient();
  if (!Number.isNaN(tableId) && tableId > 0) {
    const session = await auth.getSession({ refresh: false });
    if (!session && !shareCode) {
      const to = `/boards/${boardId}/compares/${tableId}`;
      redirect(`/api/auth/login?to=${encodeURIComponent(to)}`);
    }
    await prefetchComparisonTableQuery(
      queryClient,
      { tableId, shareCode },
      {
        request: {
          headers: session
            ? { Authorization: `Bearer ${session.tokenSet.accessToken}` }
            : undefined,
        },
      },
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ComparePageView
        boardId={boardId}
        tableId={tableId}
        shareCode={shareCode}
      />
    </HydrationBoundary>
  );
};

export default BoardsIdComparesCompareIdPage;
