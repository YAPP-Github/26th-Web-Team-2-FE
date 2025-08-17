import type { ParticipantProfileResponse } from "@ssok/api/schemas";
import { AvatarProfile, Button, Switch, TextField } from "@ssok/ui";
import { useState } from "react";

interface BoardInviteModalProps {
  className?: string;
  tripBoardId: number;
  participants: ParticipantProfileResponse[];
}

const BoardInviteModal = ({
  className,
  tripBoardId,
  participants,
}: BoardInviteModalProps) => {
  const [isInviteEnabled, setIsInviteEnabled] = useState(true);

  console.log(tripBoardId);
  const handleInviteEnabledToggle = (checked: boolean) => {
    setIsInviteEnabled(checked);
  };
  return (
    <section className={`flex flex-col gap-[4.8rem] ${className}`}>
      {/* 링크 만들기 */}
      <div className="flex flex-col gap-[0.8rem]">
        <h2 className="text-heading2-semi18 text-neutral-30">링크 만들기</h2>
        <p className="text-body2-regular14 text-neutral-40">
          본인을 포함해 최대 10명까지 참여할 수 있어요.
        </p>
        <div className="flex gap-[0.4rem]">
          <TextField
            value="https://www.ssok.info/qJPdkbu1WeXDNEDahu4DYe/%E"
            disabled
          />
          <Button size="lg" variant="primary" onClick={() => {}}>
            링크 복사
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
            이 링크로 새 멤버를 초대할 수 있어요.
          </p>
        </div>
        <Switch
          isActive={isInviteEnabled}
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
