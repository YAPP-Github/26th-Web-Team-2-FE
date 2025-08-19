import {
  getGetComparisonTableQueryKey,
  getGetComparisonTablesByTripBoardQueryKey,
  useDeleteComparisonTable,
  useGetComparisonTable,
  useUpdateComparisonTable,
} from "@ssok/api";
import type {
  ComparisonTableSummaryResponse,
  UpdateAccommodationRequest,
} from "@ssok/api/schemas";
import { Confirm, LoadingIndicator, Tile, useToast, useToggle } from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import useSession from "@/shared/hooks/use-session";
import { formatDate } from "@/shared/utils/date";
import CompareEditModal from "../compare-edit-modal";
import CompareShareModal from "../compare-share-modal";

interface CompareTileProps {
  table: ComparisonTableSummaryResponse;
  tripBoardId: number;
}

const CompareTile = ({ table, tripBoardId }: CompareTileProps) => {
  const { toast } = useToast();
  const [shareCode, setShareCode] = useState<string | undefined>();
  const shareModal = useToggle();
  const deleteModal = useToggle();
  const editModal = useToggle();

  const { accessToken } = useSession({ required: true });
  const queryClient = useQueryClient();
  const { data: comparisonTable, isLoading: isMetaDataLoading } =
    useGetComparisonTable(table.tableId || 0, {
      query: {
        enabled:
          !!accessToken ||
          !!queryClient.getQueryData(
            getGetComparisonTableQueryKey(table.tableId),
          ),
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    });
  const { mutate: deleteTable, isPending: isDeleting } =
    useDeleteComparisonTable({
      mutation: {
        onSuccess: () => {
          deleteModal.deactivate();
          queryClient.invalidateQueries({
            queryKey: getGetComparisonTablesByTripBoardQueryKey(tripBoardId),
          });
          toast.success("여행이 삭제되었어요");
        },
        onError: (error) => {
          console.error("보드 삭제 실패:", error);
        },
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

  const { mutate: updateTable } = useUpdateComparisonTable({
    mutation: {
      onSuccess: () => {
        editModal.deactivate();
        queryClient.invalidateQueries({
          queryKey: getGetComparisonTablesByTripBoardQueryKey(tripBoardId),
        });
        toast.success("표가 수정되었어요");
      },
      onError: (error) => {
        console.error("표 수정 실패:", error);
      },
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const onClickShare = (code: string) => {
    setShareCode(code);
    shareModal.activate();
  };

  const handleCancel = () => {
    if (!isDeleting) {
      deleteModal.deactivate();
    }
  };

  const onClickDeleteConfirm = () => {
    if (!table.tableId) {
      return;
    }
    deleteTable({ tableId: table.tableId });
  };

  const onClickEditConfirm = (data: { tableName: string }) => {
    if (!table.tableId) return;

    let newTableName = data.tableName.trim();

    if (newTableName === "") newTableName = table.tableName || "비교표";

    const accommodationIds =
      comparisonTable?.data.result?.accommodationResponsesList
        ?.map((acc) => acc.id)
        .filter((id): id is number => id !== undefined) || [];

    updateTable({
      tableId: table.tableId,
      data: {
        tripBoardId: tripBoardId,
        accommodationRequestList: [
          ...((comparisonTable?.data.result
            ?.accommodationResponsesList as UpdateAccommodationRequest[]) ||
            []),
        ],
        ...comparisonTable?.data.result,
        tableName: newTableName,
        accommodationIdList: accommodationIds,
      },
    });
  };

  return (
    <>
      <Link
        key={table.tableId}
        href={`/boards/${tripBoardId}/compares/${table.tableId}`}
      >
        <Tile
          key={table.tableId}
          data={{
            tableName: table.tableName ?? "",
            accommodationCount: table.accommodationCount ?? 0,
            accommodationNames: table.accommodationNames ?? [],
            lastModifiedAt: formatDate(table.lastModifiedAt ?? new Date(), {
              format: "YY.MM.DD",
            }),
          }}
          onDeleteClick={() => deleteModal.activate()}
          onEditClick={() => editModal.activate()}
          onShareClick={() => onClickShare(table.shareCode ?? "")}
        />
      </Link>
      <Confirm
        active={deleteModal.active}
        title="표를 삭제할까요?"
        description={`정말로 '${table.tableName || "비교"}' 표를 삭제하시겠어요? 한 번 삭제하면 다시 복구할 수 없어요.`}
        cancelText="닫기"
        confirmText="삭제하기"
        onCancel={isDeleting ? undefined : handleCancel}
        onConfirm={isDeleting ? undefined : onClickDeleteConfirm}
      />
      <CompareEditModal
        active={editModal.active}
        initialName={table.tableName || ""}
        onClose={editModal.deactivate}
        onConfirm={onClickEditConfirm}
      />
      <CompareShareModal
        shareCode={shareCode}
        active={shareModal.active}
        deactivate={shareModal.deactivate}
      />
      <LoadingIndicator active={isMetaDataLoading} />
    </>
  );
};

export default CompareTile;
