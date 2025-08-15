import { getTripBoards } from "@ssok/api";
import type { GetTripBoardsParams } from "@ssok/api/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";

type ParamsWithoutPage = Omit<GetTripBoardsParams, "page">;

interface UseAccommodationListOptions {
  accessToken?: string;
  enabled?: boolean;
}

const useTripBoardList = (
  params: ParamsWithoutPage,
  options?: UseAccommodationListOptions,
) =>
  useInfiniteQuery({
    queryKey: ["tripBoards", params.size],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getTripBoards(
        {
          page: pageParam,
          ...params,
        },
        {
          headers: options?.accessToken
            ? { Authorization: `Bearer ${options.accessToken}` }
            : {},
        },
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.result?.hasNext) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
    enabled: options?.enabled ?? true,
  });

export default useTripBoardList;
