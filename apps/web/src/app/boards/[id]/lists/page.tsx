import {
  getGetTripBoardDetailQueryKey,
  type getTripBoardDetail,
  prefetchGetTripBoardDetailQuery,
} from "@ssok/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/domains/auth";
import { redirectToLogin } from "@/domains/auth/utils/url";
import PlaceListView from "@/domains/list/views/place-list-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

export interface BoardsIdListsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ joined?: string }>;
}

const BoardsIdListsPage = async ({ params }: BoardsIdListsPageProps) => {
  const { id } = await params;
  const boardId = Number(id);

  const session = await auth.getSession({ refresh: false });
  if (!session) {
    return redirectToLogin();
  }

  const queryClient = getQueryClient();
  if (!Number.isNaN(boardId) && boardId > 0) {
    await prefetchGetTripBoardDetailQuery(queryClient, boardId, {
      request: {
        headers: { Authorization: `Bearer ${session.tokenSet.accessToken}` },
      },
    });

    const { status } =
      queryClient.getQueryData<Awaited<ReturnType<typeof getTripBoardDetail>>>(
        getGetTripBoardDetailQueryKey(boardId),
      ) || {};

    if ((status as number) === 403) {
      const to = encodeURIComponent(`/boards/${id}/lists`);
      redirect(`/error/access-denied/board-list?to=${to}`);
    } else if ((status as number) === 404) {
      redirect(`/boards`);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlaceListView />
    </HydrationBoundary>
  );
};

export default BoardsIdListsPage;
