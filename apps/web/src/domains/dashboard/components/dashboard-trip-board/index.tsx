"use client";

import {
  getGetTripBoardsQueryKey,
  useDeleteTripBoard,
  useLeaveTripBoard,
} from "@ssok/api";
import { Confirm, TravelBoard, useToggle } from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import useSession from "@/shared/hooks/use-session";
import type { TripBoardSummary } from "../../types";

export interface DashboardTripBoardProps {
  data: TripBoardSummary;
  className?: string;
}

const DashboardTripBoard = ({ data, className }: DashboardTripBoardProps) => {
  const queryClient = useQueryClient();
  const exitModal = useToggle(false);
  const deleteModal = useToggle(false);
  const { accessToken } = useSession({ required: true });

  const { mutate: leaveTripBoard, isPending: isLeaving } = useLeaveTripBoard({
    mutation: {
      onSuccess: () => {
        exitModal.deactivate();
        queryClient.invalidateQueries({ queryKey: getGetTripBoardsQueryKey() });
      },
      onError: (error) => {
        console.error("보드 나가기 실패:", error);
      },
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { mutate: deleteTripBoard, isPending: isDeleting } = useDeleteTripBoard(
    {
      mutation: {
        onSuccess: () => {
          deleteModal.deactivate();
          queryClient.invalidateQueries({
            queryKey: getGetTripBoardsQueryKey(),
          });
        },
        onError: (error) => {
          console.error("보드 삭제 실패:", error);
        },
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    },
  );

  const handleExitConfirm = () => {
    if (!data.tripBoardId) {
      return;
    }
    leaveTripBoard({
      tripBoardId: data.tripBoardId,
      data: { removeResources: false },
    });
  };

  const handleDeleteConfirm = () => {
    if (!data.tripBoardId) {
      return;
    }
    deleteTripBoard({ tripBoardId: data.tripBoardId });
  };

  const handleCancel = () => {
    if (!isLeaving && !isDeleting) {
      exitModal.deactivate();
      deleteModal.deactivate();
    }
  };

  const travelBoardData = {
    boardId: data.tripBoardId || 0,
    boardName: data.boardName || "",
    destination: data.destination || "",
    startDate: data.startDate?.toString() || "",
    endDate: data.endDate?.toString() || "",
    participantCount: data.participantCount || 0,
    participants:
      data.participants?.map((p) => ({
        userId: p.userId || 0,
        profileImageUrl: p.profileImageUrl || "",
        nickname: p.nickname || "",
        role: p.role || "MEMBER",
      })) || [],
    accommodationCount: data.accommodationCount || 0,
  };

  return (
    <>
      <Link href={`/boards/${data.tripBoardId || 0}/lists`} prefetch>
        <TravelBoard
          data={travelBoardData}
          onDeleteClick={() => deleteModal.activate()}
          onEditClick={() => alert("여행 수정")}
          onExitClick={() => exitModal.activate()}
          onInviteClick={() => alert("여행 초대")}
          className={className}
        />
      </Link>
      <Confirm
        active={exitModal.active}
        title="여행에서 나갈까요?"
        description={`'${data.boardName || "여행"}' 보드에서 정말 나가시겠어요? 나가도 내가 남긴 숙소 정보는 그대로 남아 있어요.`}
        cancelText="닫기"
        confirmText="나가기"
        onCancel={isLeaving ? undefined : handleCancel}
        onConfirm={isLeaving ? undefined : handleExitConfirm}
      />
      <Confirm
        active={deleteModal.active}
        title="여행을 모두에게 삭제할까요?"
        description={`정말로 '${data.boardName || "여행"}' 보드를 삭제하시겠어요? 한 번 삭제하면 다시 복구할 수 없어요.`}
        cancelText="닫기"
        confirmText="삭제하기"
        onCancel={isDeleting ? undefined : handleCancel}
        onConfirm={isDeleting ? undefined : handleDeleteConfirm}
      />
    </>
  );
};

export default DashboardTripBoard;
