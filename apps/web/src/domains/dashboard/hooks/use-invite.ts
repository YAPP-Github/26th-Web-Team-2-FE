import { useGetInvitationCode, useToggleInvitationActive } from "@ssok/api";
import { useToast } from "@ssok/ui";
import { useEffect, useState } from "react";
import useSession from "@/shared/hooks/use-session";

export const useBoardInvite = (
  tripBoardId: number,
  participantsLength: number,
) => {
  const { accessToken } = useSession({ required: true });
  const { toast } = useToast();

  const {
    data: invitationCode,
    isLoading,
    isFetching,
  } = useGetInvitationCode(tripBoardId, {
    query: { enabled: !!accessToken },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const inviteData = invitationCode?.data.result;
  const inviteLink = `https://www.ssok.info/boards/${tripBoardId}?code=${inviteData?.invitationCode}`;

  const { mutateAsync: toggleInviteActive } = useToggleInvitationActive({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const [isInviteEnabled, setIsInviteEnabled] = useState(inviteData?.isActive);
  const [isCopyBtnClicked, setIsCopyBtnClicked] = useState(false);

  // 초대 활성화 초기화 & participants 길이 반영
  useEffect(() => {
    setIsInviteEnabled(participantsLength < 10 && inviteData?.isActive);
  }, [inviteData?.isActive, participantsLength]);

  const handleInviteEnabledToggle = async () => {
    try {
      const res = await toggleInviteActive({ tripBoardId });
      const active = res.data.result?.isActive;

      setIsInviteEnabled(active);

      toast.success(
        active ? "초대가 활성화되었어요" : "초대가 비활성화되었어요",
      );
    } catch (error) {
      console.error("초대 상태를 변경하는 중 오류", error);
    }
  };

  const handleCopyInviteLink = async () => {
    if (!inviteLink || !isInviteEnabled) return;

    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopyBtnClicked(true);
      toast.success("링크가 복사되었어요");
      setTimeout(() => setIsCopyBtnClicked(false), 2000);
    } catch (_error) {
      console.error("링크 복사에 실패했어요", _error);
    }
  };

  return {
    inviteLink,
    isInviteEnabled,
    isCopyBtnClicked,
    isLoading,
    isFetching,
    handleInviteEnabledToggle,
    handleCopyInviteLink,
    accessToken,
  };
};
