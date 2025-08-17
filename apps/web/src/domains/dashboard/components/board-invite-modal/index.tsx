import { useGetUserInfo } from "@ssok/api";
import type { ParticipantProfileResponse } from "@ssok/api/schemas";
import {
  AvatarProfile,
  Button,
  IcCheckFill,
  Switch,
  TextField,
} from "@ssok/ui";
import { useBoardInvite } from "../../hooks/use-invite";

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
  const {
    inviteLink,
    isInviteEnabled,
    isCopyBtnClicked,
    isLoading,
    isFetching,
    accessToken,
    handleInviteEnabledToggle,
    handleCopyInviteLink,
  } = useBoardInvite(tripBoardId, participants.length);

  const { data: userInfo } = useGetUserInfo({
    query: { enabled: !!accessToken },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const userNickname = userInfo?.data.result?.nickname;

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
            icon={
              isCopyBtnClicked && <IcCheckFill width="2rem" height="2rem" />
            }
            disabled={!isInviteEnabled || participants.length >= 10}
          >
            {isCopyBtnClicked ? "복사됨" : "링크 복사"}
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
        <p className="mb-[0.5rem] text-body2-regular14 text-neutral-40">
          {participants?.length || 0}명 참여 중
        </p>
        <ul className="mb-[1.2rem] grid grid-cols-2 gap-x-[2.4rem] gap-y-[1.2rem]">
          {participants?.map((participant) => (
            <li
              key={participant?.userId}
              className="flex items-center gap-[0.8rem] text-body2-regular14 text-neutral-40"
            >
              <AvatarProfile size={32} imgUrl={participant?.profileImageUrl} />
              <div className="flex gap-[0.2rem]">
                <span className="text-body2-medi14 text-neutral-25">
                  {participant?.nickname}
                </span>
                <span className="text-body2-medi14 text-neutral-50">
                  {userNickname === participant?.nickname && " (나)"}
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
