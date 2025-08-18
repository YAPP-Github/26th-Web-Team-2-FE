"use client";

import {
  useGetComparisonTablesByTripBoardInfinite,
  useGetTripBoardDetail,
} from "@ssok/api";
import { cn, LoadingIndicator, Tile } from "@ssok/ui";
import { useEffect } from "react";
import HeaderSection from "@/domains/list/components/header-section";
import useSession from "@/shared/hooks/use-session";
import { formatDate } from "@/shared/utils/date";

interface CompareListViewProps {
  tripBoardId: number;
}

const CompareListView = ({ tripBoardId }: CompareListViewProps) => {
  const { accessToken } = useSession({ required: true });

  const {
    data: { pages } = {},
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetComparisonTablesByTripBoardInfinite(
    tripBoardId,
    { page: 0, size: 10 },
    {
      query: {
        enabled: !!accessToken && !!tripBoardId,
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.data.result?.hasNext ? allPages.length : undefined;
        },
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    },
  );

  const { data: tripBoardDetail, isLoading: isTripBoardLoading } =
    useGetTripBoardDetail(Number(tripBoardId), {
      query: {
        enabled: !!accessToken,
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

  const allTripBoards =
    pages?.flatMap((page) => page?.data.result?.comparisonTables ?? []) ?? [];

  useEffect(() => {
    if (accessToken && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [accessToken, hasNextPage, isFetching, fetchNextPage]);

  return (
    <section className="flex h-screen w-full flex-col gap-[1.6rem] bg-neutral-98 p-[2.4rem] [&+div]:w-0">
      <HeaderSection {...tripBoardDetail?.data.result} />
      <div
        className={cn(
          "relative h-full w-full max-w-full overflow-scroll rounded-[1.6rem] border border-neutral-90 bg-white",
        )}
      >
        <h1 className="p-[2.4rem] text-heading1-semi20 text-neutral-10">
          생성된 표
        </h1>
        <ul className="grid grid-cols-2 gap-[1.6rem] p-[2.4rem]">
          {allTripBoards.map((table) => (
            <Tile
              key={table.tableId}
              data={{
                tableName: table.tableName ?? "",
                accommodationCount: table.accommodationCount ?? 0,
                accommodationNames: table.accommodationNames ?? [],
                lastModifiedAt: formatDate(table.lastModifiedAt ?? new Date(), {
                  format: "YY.MM.DD",
                }),
              }}
              onDeleteClick={() => {}}
              onEditClick={() => {}}
              onShareClick={() => {}}
            />
          ))}
          {/* TODO: empty list 반영 */}
          {allTripBoards.length === 0 && (
            <div className="col-span-2 w-full py-[10rem] text-center text-heading1-semi20 text-neutral-60">
              생성된 비교표가 없습니다.
            </div>
          )}
        </ul>
      </div>
      <LoadingIndicator active={isFetching || isTripBoardLoading} />
    </section>
  );
};

export default CompareListView;
