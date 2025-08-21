"use client";

import { useGetTripBoardsInfinite } from "@ssok/api";

import { ActionCard, LoadingIndicator, Popup } from "@ssok/ui";
import { useEffect, useState } from "react";
import Header from "@/shared/components/header";
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
      {/* 페이지 헤더 */}
      <Header />
      {/* 제목 + 여행 보드 목록 */}
      <section className="px-[10.4rem] pt-[7.2rem]">
        <h1 className="mb-[3.6rem] text-neutral-10 text-title1-semi36">
          나의 여행
        </h1>
        <ul className="grid grid-cols-3 gap-[4rem]">
          <li>
            <ActionCard
              onClick={() => setShowCreateModal(true)}
              className="w-full"
            />
          </li>
          {allTripBoards.map((tripBoard) => (
            <li key={tripBoard.tripBoardId}>
              <DashboardTripBoard data={tripBoard} className="w-full" />
            </li>
          ))}
        </ul>
        <LoadingIndicator active={isFetching} />
      </section>
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
