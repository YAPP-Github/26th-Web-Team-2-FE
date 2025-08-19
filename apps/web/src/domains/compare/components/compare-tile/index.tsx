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
import {
  Button,
  Confirm,
  LoadingIndicator,
  Popup,
  TextField,
  Tile,
  useToast,
  useToggle,
} from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSession from "@/shared/hooks/use-session";
import { formatDate } from "@/shared/utils/date";
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

  const { register, handleSubmit } = useForm<{ tableName: string }>({
    defaultValues: {
      tableName: table.tableName,
    },
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
      <Popup
        title="표 수정하기"
        active={editModal.active}
        onClose={editModal.deactivate}
      >
        <form
          className="w-[59.9rem]"
          onSubmit={handleSubmit(onClickEditConfirm)}
        >
          <div className="flex flex-col gap-[0.8rem] px-[2.4rem] py-[2rem]">
            <p className="text-heading2-semi18 text-neutral-30">
              이 표를 어떻게 부를까요?
            </p>
            <TextField
              maxLength={20}
              placeholder="입력하지 않으면 기존 이름으로 저장돼요."
              {...register("tableName")}
            />
          </div>
          <div className="w-full p-[2.4rem]">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex w-full justify-center"
            >
              수정하기
            </Button>
          </div>
        </form>
      </Popup>
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
