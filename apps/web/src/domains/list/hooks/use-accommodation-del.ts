import {
  getGetAccommodationCountByTripBoardIdQueryKey,
  useDeleteAccommodation,
} from "@ssok/api";
import type { StandardResponseAccommodationPageResponse } from "@ssok/api/schemas";
import { type InfiniteData, useQueryClient } from "@tanstack/react-query";

type AccommodationListData = StandardResponseAccommodationPageResponse;

export const useDeleteAccommodationWithOptimisticUpdate = ({
  accessToken,
  tripBoardId,
  userId,
  size,
  sort,
}: {
  accessToken: string;
  tripBoardId: number;
  userId: number | undefined;
  size: number;
  sort: string;
}) => {
  const queryClient = useQueryClient();

  const listQueryKey = [
    "accommodations",
    tripBoardId,
    userId === 0 ? null : userId,
    size,
    sort,
  ];
  const countQueryKey = getGetAccommodationCountByTripBoardIdQueryKey({
    tripBoardId,
  });

  return useDeleteAccommodation({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
    mutation: {
      onMutate: async ({ accommodationId }) => {
        await queryClient.cancelQueries({ queryKey: listQueryKey });

        const previousData =
          queryClient.getQueryData<InfiniteData<AccommodationListData>>(
            listQueryKey,
          );
        const prevCount = queryClient.getQueryData<number>(countQueryKey);

        console.log("previousData", prevCount);
        queryClient.setQueryData<InfiniteData<AccommodationListData>>(
          listQueryKey,
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                result: {
                  ...page,
                  accommodations: page?.result?.accommodations?.filter(
                    (item) => item.id !== accommodationId,
                  ),
                },
              })),
            };
          },
        );

        queryClient.setQueryData<number>(
          ["accommodationCount", { tripBoardId: tripBoardId }],
          (prevCount) => {
            if (prevCount === undefined) return prevCount;
            return prevCount - 1;
          },
        );

        return { previousData, prevCount };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(listQueryKey, context.previousData);
        }
        if (context?.prevCount !== undefined) {
          queryClient.setQueryData<number>(countQueryKey, context.prevCount);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: listQueryKey });
        queryClient.invalidateQueries({
          queryKey: countQueryKey,
        });
      },
    },
  });
};
