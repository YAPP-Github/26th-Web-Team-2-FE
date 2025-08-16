"use client";

import { useGetTripBoardsInfinite } from "@ssok/api";
import type { TripBoardUpdateRequest } from "@ssok/api/schemas";
import { ActionCard, Popup, TravelBoard } from "@ssok/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/shared/components/header";
import useSession from "@/shared/hooks/use-session";
import BoardCreateForm from "../components/board-create-form";
import BoardEditForm from "../components/board-edit-form";

const DashboardView = () => {
  const { accessToken } = useSession({ required: true });
  const [modalState, setModalState] = useState<
    | { type: "createForm" }
    | { type: "editForm"; tripBoardId: number; data: TripBoardUpdateRequest }
    | null
  >(null);

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

  const handleEditModal = (
    tripBoardId: number,
    data: TripBoardUpdateRequest,
  ) => {
    setModalState({ type: "editForm", tripBoardId, data });
  };

  const handleCreateModal = () => {
    setModalState({ type: "createForm" });
  };

  const handleModalClose = () => {
    setModalState(null);
  };

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
            <ActionCard onClick={handleCreateModal} className="w-full" />
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
                  onEditClick={() =>
                    handleEditModal(tripBoard.tripBoardId!, {
                      boardName: tripBoard.boardName!,
                      destination: tripBoard.destination!,
                      startDate: tripBoard.startDate!,
                      endDate: tripBoard.endDate!,
                    })
                  }
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
        title={
          modalState?.type === "createForm"
            ? "새 여행 만들기"
            : "여행 보드 수정하기"
        }
        active={
          !!modalState &&
          (modalState.type === "createForm" || modalState.type === "editForm")
        }
        onClose={() => handleModalClose()}
      >
        {modalState?.type === "createForm" && (
          <BoardCreateForm className="min-w-[51.1rem]" />
        )}
        {modalState?.type === "editForm" && (
          <BoardEditForm
            className="min-w-[51.1rem]"
            tripBoardId={modalState.tripBoardId}
            data={modalState.data}
            handleModalClose={handleModalClose}
          />
        )}
      </Popup>
    </main>
  );
};

export default DashboardView;
