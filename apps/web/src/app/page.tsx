import { prefetchGetUserInfoQuery } from "@ssok/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "@/domains/auth";
import IndexPageView from "@/domains/landing/views/index-page-view";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

const IndexPage = async () => {
  const session = await auth.getSession({ refresh: false });
  const queryClient = getQueryClient();

  if (session) {
    await prefetchGetUserInfoQuery(queryClient, {
      request: {
        headers: { Authorization: `Bearer ${session.tokenSet.accessToken}` },
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IndexPageView />
    </HydrationBoundary>
  );
};

export default IndexPage;
