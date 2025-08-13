import { getAccommodationByTripBoardIdAndUserId } from "@ssok/api";
import type { GetAccommodationByTripBoardIdAndUserIdParams } from "@ssok/api/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";

type ParamsWithoutPage = Omit<
  GetAccommodationByTripBoardIdAndUserIdParams,
  "page"
>;

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
      params.tripBoardId,
      params.userId,
      params.size,
      params.sort,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getAccommodationByTripBoardIdAndUserId(
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

export default useAccommodationList;
