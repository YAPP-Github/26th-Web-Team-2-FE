import { getAccommodationByBoardIdAndUserId } from "@ssok/api";
import type { GetAccommodationByBoardIdAndUserIdParams } from "@ssok/api/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";

type ParamsWithoutPage = Omit<GetAccommodationByBoardIdAndUserIdParams, "page">;

interface UseAccommodationListOptions {
  accessToken?: string;
  enabled?: boolean;
}

const useAccommodationList = (
  params: ParamsWithoutPage,
  options?: UseAccommodationListOptions,
) =>
  useInfiniteQuery({
    queryKey: [
      "accommodations",
      params.boardId,
      params.userId,
      params.size,
      params.sort,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getAccommodationByBoardIdAndUserId(
        {
          page: pageParam,
          ...params,
        },
        {
          headers: {
            Authorization: `Bearer ${options?.accessToken ?? ""}`,
          },
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

export default useAccommodationList;
