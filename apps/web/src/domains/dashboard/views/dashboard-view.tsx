"use client";

import { useGetTripBoardsInfinite } from "@ssok/api";
import { ActionCard, Popup, TravelBoard } from "@ssok/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/shared/components/header";
import useSession from "@/shared/hooks/use-session";
import BoardCreateForm from "../components/board-create-form";

const DashboardView = () => {
  const { accessToken } = useSession({ required: true });
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

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
              onClick={() => setIsCreateFormOpen(true)}
              className="w-full"
            />
          </li>
          {allTripBoards.map((tripBoard) => (
            <li key={tripBoard.tripBoardId}>
              <Link href={`/boards/${tripBoard.tripBoardId}/lists`} prefetch>
                <TravelBoard
                  data={{
                    boardId: tripBoard.tripBoardId!,
                    boardName: tripBoard.boardName!,
                    destination: tripBoard.destination!,
                    startDate: tripBoard.startDate?.toString()!,
                    endDate: tripBoard.endDate?.toString()!,
                    participantCount: tripBoard.participantCount!,
                    participants:
                      tripBoard.participants?.map((p) => ({
                        userId: p.userId ?? 0,
                        profileImageUrl: p.profileImageUrl ?? "",
                        nickname: p.nickname ?? "",
                        role: p.role ?? "MEMBER",
                      })) ?? [],
                    accommodationCount: tripBoard.accommodationCount!,
                  }}
                  // TODOT: 핸들러 함수 api 부착
                  onDeleteClick={() => alert("여행 삭제")}
                  onEditClick={() => alert("여행 수정")}
                  onExitClick={() => alert("여행 나가기")}
                  onInviteClick={() => alert("여행 초대")}
                  className="w-full"
                />
              </Link>
            </li>
          ))}
        </ul>
        {isFetching && (
          <div className="mt-[2rem] text-center">
            <p className="text-body2-medi14 text-neutral-60">
              데이터를 불러오는 중...
            </p>
          </div>
        )}
      </section>
      <Popup
        title="새 여행 만들기"
        active={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
      >
        <BoardCreateForm className="min-w-[51.1rem]" />
      </Popup>
    </main>
  );
};

export default DashboardView;
