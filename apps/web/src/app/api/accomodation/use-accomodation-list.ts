import { getAccommodationByBoardIdAndUserId } from "@ssok/api";
import type { GetAccommodationByBoardIdAndUserIdParams } from "@ssok/api/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";

type ParamsWithoutPage = Omit<GetAccommodationByBoardIdAndUserIdParams, "page">;

const useAccommodationList = (params: ParamsWithoutPage) =>
  useInfiniteQuery({
    queryKey: [
      "accommodations",
      params.boardId,
      params.userId,
      params.size,
      params.sort,
    ],
    queryFn: async ({ pageParam }) => {
      const res = await getAccommodationByBoardIdAndUserId({
        page: pageParam ?? 0,
        ...params,
      });
      return res.data;
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.result?.hasNext) return undefined;

      return allPages.length;
    },
    initialPageParam: 0,
  });

export default useAccommodationList;
