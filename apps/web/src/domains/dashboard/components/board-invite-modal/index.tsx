import { useGetInvitationCode, useToggleInvitationActive } from "@ssok/api";
import type { ParticipantProfileResponse } from "@ssok/api/schemas";
import {
  AvatarProfile,
  Button,
  IcCheckFill,
  Switch,
  TextField,
  useToast,
} from "@ssok/ui";
import { useEffect, useState } from "react";
import useSession from "@/shared/hooks/use-session";

interface BoardInviteModalProps {
  className?: string;
  tripBoardId: number;
  participants: ParticipantProfileResponse[];
}

const SkeletonTextField = () => (
  <div className="flex w-full gap-[0.4rem]">
    <div className="w-full animate-pulse rounded-lg bg-neutral-95" />
  </div>
);

const BoardInviteModal = ({
  className,
  tripBoardId,
  participants,
}: BoardInviteModalProps) => {
  const { accessToken } = useSession({ required: true });
  const { toast } = useToast();
  const {
    data: invitationCode,
    isLoading,
    isFetching,
  } = useGetInvitationCode(tripBoardId, {
    query: {
      enabled: !!accessToken,
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const inviteData = invitationCode?.data.result;
  const inviteLink = `https://www.ssok.info/boards/${tripBoardId}?code=${inviteData?.invitationCode}`;

  const { mutateAsync: toggleInviteActive } = useToggleInvitationActive({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const [isInviteEnabled, setIsInviteEnabled] = useState(inviteData?.isActive);
  const [isCopyBtnClicked, setIsCopyBtnClicked] = useState(false);
  useEffect(() => {
    setIsInviteEnabled(participants.length < 10 && inviteData?.isActive);
  }, [inviteData?.isActive, participants.length]);

  const handleInviteEnabledToggle = async () => {
    try {
      const res = await toggleInviteActive({ tripBoardId });
      const active = res.data.result?.isActive;

      setIsInviteEnabled(active);

      toast.success(
        active ? "초대가 활성화되었어요" : "초대가 비활성화되었어요",
      );
    } catch (_error) {
      console.log("초대 상태를 변경하는 중 오류가 발생했어요", _error);
    }
  };

  const handleCopyInviteLink = async () => {
    if (!inviteLink || !isInviteEnabled) return;

    await navigator.clipboard.writeText(inviteLink);
    setIsCopyBtnClicked(true);
    toast.success("링크가 복사되었어요");
    setTimeout(() => {
      setIsCopyBtnClicked(false);
    }, 2000);
  };

  return (
    <section className={`flex flex-col gap-[4.8rem] ${className}`}>
      {/* 링크 만들기 */}
      <div className="flex flex-col gap-[0.8rem]">
        <h2 className="text-heading2-semi18 text-neutral-30">링크 만들기</h2>
        <p className="text-body2-regular14 text-neutral-40">
          {isInviteEnabled
            ? "본인을 포함해 최대 10명까지 참여할 수 있어요."
            : "초대 링크가 비활성화되어 있어요. 사용하려면 다시 활성화해주세요."}
        </p>
        <div className="flex gap-[0.4rem]">
          {isLoading || isFetching ? (
            <SkeletonTextField />
          ) : (
            <TextField
              value={isInviteEnabled ? inviteLink : ""}
              placeholder={inviteLink}
              disabled
            />
          )}
          <Button
            size="lg"
            variant="primary"
            onClick={handleCopyInviteLink}
            disabled={!isInviteEnabled || participants.length >= 10}
          >
            {isCopyBtnClicked ? (
              <span className="flex gap-[0.8rem] text-body1-bold16 text-primary100">
                <IcCheckFill /> 복사됨
              </span>
            ) : (
              "링크 복사"
            )}
          </Button>
        </div>
      </div>
      {/* 초대 활성화하기 */}
      <div className="flex justify-between gap-[0.8rem]">
        <div className="flex flex-col gap-[0.4rem]">
          <h2 className="text-heading2-semi18 text-neutral-30">
            초대 활성화하기
          </h2>
          <p className="text-body2-regular14 text-neutral-40">
            {isInviteEnabled
              ? "이 링크로 새 멤버를 초대할 수 있어요."
              : "더 이상 이 링크로 멤버를 초대할 수 없어요."}
          </p>
        </div>
        <Switch
          isActive={isInviteEnabled ?? true}
          onChange={handleInviteEnabledToggle}
        />
      </div>
      {/* 여행 멤버들 */}
      <div className="flex flex-col gap-[0.8rem]">
        <h2 className="text-heading2-semi18 text-neutral-30">
          이 여행에 함께하는 멤버들
        </h2>
        <p className="text-body2-regular14 text-neutral-40">
          {participants?.length || 0}명 참여 중
        </p>
        <ul className="mb-[1.2rem] grid grid-cols-2 gap-x-[2.4rem] gap-y-[1.2rem]">
          {participants?.map((participant) => (
            <li
              key={participant?.userId}
              className="flex items-center gap-[0.8rem] text-body2-regular14 text-neutral-40"
            >
              <AvatarProfile size={32} imgUrl={participant?.profileImageUrl} />
              <div>
                <span className="text-body2-medi14 text-neutral-25">
                  {participant?.nickname}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BoardInviteModal;
