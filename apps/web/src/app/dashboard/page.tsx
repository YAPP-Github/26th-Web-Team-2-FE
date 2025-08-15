"use client";
import { ActionCard, TravelBoard } from "@ssok/ui";
import useTripBoardList from "@/domains/dashboard/hooks/use-trip-board-list";
import Header from "@/shared/components/header";
import { useSession } from "@/shared/hooks/use-session";

const DashBoardPage = () => {
  const { accessToken } = useSession({ required: true });
  const { data: tripBoards } = useTripBoardList(
    { size: 10 },
    {
      accessToken: accessToken || "",
      enabled: !!accessToken,
    },
  );

  const allTripBoards =
    tripBoards?.pages?.flatMap((page) => page?.result?.tripBoards ?? []) ?? [];

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
            <ActionCard onClick={() => alert("여행생성")} className="w-full" />
          </li>
          {allTripBoards.map((tripBoard) => (
            <li key={tripBoard.tripBoardId}>
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
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default DashBoardPage;
