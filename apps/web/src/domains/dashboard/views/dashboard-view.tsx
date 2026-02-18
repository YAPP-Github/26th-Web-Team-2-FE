"use client";

import { useGetTripBoardsInfinite } from "@ssok/api";

import { ActionCard, LoadingIndicator, Popup } from "@ssok/ui";
import { useEffect, useState } from "react";
import HeaderLayout from "@/shared/components/header-layout";
import useSession from "@/shared/hooks/use-session";
import BoardCreateForm from "../components/board-create-form";
import DashboardTripBoard from "../components/dashboard-trip-board";

const DashboardView = () => {
  const { accessToken } = useSession({ required: true });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    data: { pages } = {},
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetTripBoardsInfinite(
    { page: 0, size: 10 },
    {
      query: {
        enabled: !!accessToken,
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.data.result?.hasNext ? allPages.length : undefined;
        },
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    },
  );

  const allTripBoards =
    pages?.flatMap((page) => page?.data.result?.tripBoards ?? []) ?? [];

  useEffect(() => {
    if (accessToken && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [accessToken, hasNextPage, isFetching, fetchNextPage]);

  return (
    <main>
      <HeaderLayout>
        {/* 제목 + 여행 보드 목록 */}
        <section className="px-[10.4rem] pt-[7.1rem] max-lg:px-[1.6rem] max-lg:pt-[2.4rem]">
          <h1 className="mb-[3.6rem] text-neutral-10 text-title2-medi28 max-lg:mb-[2.4rem]">
            나의 여행
          </h1>
          <ul className="grid grid-cols-1 justify-items-center gap-[4rem] max-lg:gap-[2rem] md:grid-cols-2 xl:grid-cols-3">
            <li className="w-full">
              <ActionCard onClick={() => setShowCreateModal(true)} />
            </li>
            {allTripBoards.map((tripBoard) => (
              <li key={tripBoard.tripBoardId} className="w-full">
                <DashboardTripBoard data={tripBoard} />
              </li>
            ))}
          </ul>
          <LoadingIndicator active={isFetching} />
        </section>
      </HeaderLayout>
      <Popup
        title="새 여행 만들기"
        active={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <BoardCreateForm className="min-w-[51.1rem]" />
      </Popup>
    </main>
  );
};

export default DashboardView;
