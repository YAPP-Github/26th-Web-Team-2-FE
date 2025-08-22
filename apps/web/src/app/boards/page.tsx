import {
  getGetTripBoardsQueryKey,
  type getTripBoards,
  prefetchGetTripBoardsInfiniteQuery,
  prefetchGetUserInfoQuery,
} from "@ssok/api";
import {
  dehydrate,
  HydrationBoundary,
  type InfiniteData,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/domains/auth";
import DashboardView from "@/domains/dashboard/views/dashboard-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

const DashboardPage = async () => {
  const session = await auth.getSession({ refresh: false });
  if (!session) {
    redirect("/api/auth/login?to=/");
  }

  const queryClient = getQueryClient();

  await Promise.all([
    prefetchGetUserInfoQuery(queryClient, {
      request: {
        headers: {
          Authorization: `Bearer ${session.tokenSet.accessToken}`,
        },
      },
    }),
    prefetchGetTripBoardsInfiniteQuery(
      queryClient,
      { page: 0, size: 10 },
      {
        request: {
          headers: {
            Authorization: `Bearer ${session.tokenSet.accessToken}`,
          },
        },
      },
    ),
  ]);

  const data = queryClient.getQueryData<
    InfiniteData<Awaited<ReturnType<typeof getTripBoards>>>
  >(getGetTripBoardsQueryKey({ page: 0, size: 10 }));
  const savedList = data?.pages[0]?.data?.result?.tripBoards;

  if (!savedList || savedList.length === 0) {
    redirect("/boards/new");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  );
};

export default DashboardPage;
