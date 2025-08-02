import { getAccommodationByBoardIdAndUserId } from "@ssok/api";
import type { GetAccommodationByBoardIdAndUserIdParams } from "@ssok/api/schemas";
import { dehydrate, QueryClient } from "@tanstack/react-query";

type ParamsWithoutPage = Omit<GetAccommodationByBoardIdAndUserIdParams, "page">;

export const fetchAccommodation = async (params: ParamsWithoutPage) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "accommodations",
      params.boardId,
      params.userId,
      params.size,
      params.sort,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getAccommodationByBoardIdAndUserId({
        boardId: params.boardId,
        userId: params.userId,
        size: params.size,
        sort: params.sort,
        page: pageParam,
      });
      return res.data;
    },
    initialPageParam: 0,
  });

  return dehydrate(queryClient);
};
