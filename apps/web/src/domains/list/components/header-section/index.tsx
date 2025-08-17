import type { TripBoardSummaryResponse } from "@ssok/api/schemas";
import { Button, IcArrowLeft, IcPerson, Popup } from "@ssok/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BoardInviteModal from "@/domains/dashboard/components/board-invite-modal";
import { formatDate } from "@/shared/utils/date";

const HeaderSection = (tripBoardDetail: TripBoardSummaryResponse) => {
  const router = useRouter();
  const {
    boardName,
    startDate,
    endDate,
    participantCount,
    destination,
    participants,
    tripBoardId,
  } = tripBoardDetail;
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const onBackClick = () => {
    router.push("/boards");
  };
  return (
    <header className="flex w-full items-center justify-between p-2 pr-8 pl-2">
      {/* 헤더 좌측  */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="flex items-center gap-[0.8rem]">
          <button type="button" onClick={onBackClick}>
            <IcArrowLeft width={24} height={24} className="text-neutral-40" />
          </button>

          <span className="text-body1-medi16 text-neutral-25">{boardName}</span>
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <p className="text-body2-semi14 text-neutral-60">{destination}</p>
          <div className="flex gap-[0.4rem] rounded-[0.4rem] bg-neutral-95 px-[0.8rem] py-[0.3rem] text-caption1-medi12 text-neutral-60">
            <p>{`${formatDate(start ?? new Date(), { format: "YY.MM.DD" })}`}</p>
            <p>~</p>
            <p>{`${formatDate(end ?? new Date(), { format: "YY.MM.DD" })}`}</p>
          </div>
        </div>
      </div>
      {/* 헤더 우측 */}
      <div className="flex gap-[0.8rem]">
        <span className="flex items-center">
          <IcPerson width={16} height={16} className="text-neutral-40" />
          <p className="text-body2-semi14 text-neutral-40">
            {participantCount}
          </p>
        </span>
        <Button
          size="xxs"
          variant="black"
          onClick={() => setIsInviteModalOpen(true)}
        >
          초대하기
        </Button>
      </div>
      <Popup
        title="멤버 초대하기"
        active={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      >
        <BoardInviteModal
          className="min-w-[51.1rem]"
          tripBoardId={tripBoardId || 0}
          participants={participants || []}
        />
      </Popup>
    </header>
  );
};

export default HeaderSection;
