import { prefetchGetComparisonTablesByTripBoardInfiniteQuery } from "@ssok/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/domains/auth";
import CompareListView from "@/domains/compare/views/compare-list-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

interface BoardsIdComparesPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BoardsIdComparesPage = async ({ params }: BoardsIdComparesPageProps) => {
  const session = await auth.getSession({ refresh: false });

  if (!session) {
    redirect("/api/auth/login?to=/");
  }

  const searchParams = await params;
  const boardId = Number(searchParams.id);

  const queryClient = getQueryClient();
  if (!Number.isNaN(boardId) && boardId > 0) {
    await prefetchGetComparisonTablesByTripBoardInfiniteQuery(
      queryClient,
      boardId,
      {
        size: 10,
        page: 0,
      },
      {
        request: {
          headers: {
            Authorization: `Bearer ${session.tokenSet.accessToken}`,
          },
        },
      },
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompareListView tripBoardId={boardId} />
    </HydrationBoundary>
  );
};
export default BoardsIdComparesPage;
