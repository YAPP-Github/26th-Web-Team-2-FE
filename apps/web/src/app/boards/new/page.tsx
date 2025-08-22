import { prefetchGetUserInfoQuery } from "@ssok/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "@/domains/auth";
import { redirectToLogin } from "@/domains/auth/utils/url";
import NewUserBoardCreateView from "@/domains/dashboard/views/new-user-board-create-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

const BoardsNewPage = async () => {
  const session = await auth.getSession({ refresh: false });
  if (!session) {
    return redirectToLogin();
  }

  const queryClient = getQueryClient();
  await prefetchGetUserInfoQuery(queryClient, {
    request: {
      headers: {
        Authorization: `Bearer ${session.tokenSet.accessToken}`,
      },
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewUserBoardCreateView />
    </HydrationBoundary>
  );
};

export default BoardsNewPage;
