import {
  getGetInvitationCodeQueryKey,
  type getInvitationCode,
  useGetInvitationCode,
  useToggleInvitationActive,
} from "@ssok/api";
import { useToast } from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useSession from "@/shared/hooks/use-session";
import { useAnalytics } from "@/shared/providers/modules/analytics-provider";

interface InvitationContext {
  prevState?: Awaited<ReturnType<typeof getInvitationCode>>;
}

export const useBoardInvite = (
  tripBoardId: number,
  participantsLength: number,
) => {
  const { trackEvent } = useAnalytics();
  const { accessToken } = useSession({ required: true });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    data: invitationCode,
    isLoading,
    isFetching,
  } = useGetInvitationCode(tripBoardId, {
    query: { enabled: !!accessToken },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const inviteData = invitationCode?.data.result;
  const inviteLink = `${window.location.origin}/boards/${tripBoardId}?code=${inviteData?.invitationCode}`;

  const { mutateAsync: toggleInviteActive } = useToggleInvitationActive({
    mutation: {
      onMutate: async (): Promise<InvitationContext> => {
        await queryClient.cancelQueries({
          queryKey: getGetInvitationCodeQueryKey(tripBoardId),
        });

        const prevState = queryClient.getQueryData<
          Awaited<ReturnType<typeof getInvitationCode>>
        >(getGetInvitationCodeQueryKey(tripBoardId));

        queryClient.setQueryData(getGetInvitationCodeQueryKey(tripBoardId), {
          ...prevState,
          data: {
            ...prevState?.data,
            result: {
              ...prevState?.data.result,
              isActive: !prevState?.data.result?.isActive,
            },
          },
        });

        return { prevState };
      },
      onError: (_error, _variables, context: InvitationContext | undefined) => {
        if (context?.prevState !== undefined) {
          queryClient.setQueryData(
            getGetInvitationCodeQueryKey(tripBoardId),
            context.prevState,
          );
        }
        console.error("초대 활성화 상태 변경 실패:", _error);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: getGetInvitationCodeQueryKey(tripBoardId),
        });
      },
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const [isInviteEnabled, setIsInviteEnabled] = useState(inviteData?.isActive);
  const [isCopyBtnClicked, setIsCopyBtnClicked] = useState(false);

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
      queryClient.refetchQueries({
        queryKey: getGetInvitationCodeQueryKey(tripBoardId),
      });
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
      trackEvent("BOARD_URL_INVITE", {
        board_id: tripBoardId,
      });
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
