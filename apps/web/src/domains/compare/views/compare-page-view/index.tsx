"use client";

import {
  getGetComparisonTableQueryKey,
  useUpdateComparisonTable,
} from "@ssok/api";
import { Confirm, cn, LoadingIndicator, useToggle } from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import ComparePageHeader from "@/domains/compare/components/compare-page-header";
import ComparePageTitle from "@/domains/compare/components/compare-page-title";
import CompareTable from "@/domains/compare/components/compare-table";
import useComparisonTable from "@/domains/compare/hooks/use-comparison-table";
import useViewMode from "@/domains/compare/hooks/use-view-mode";
import type { ComparisonFormData } from "@/domains/compare/types";
import { transformFormDataToUpdateComparisonTableRequest } from "@/domains/compare/utils/form";
import LoginPopup from "@/shared/components/login-popup";
import useSession from "@/shared/hooks/use-session";

interface ComparePageViewProps {
  boardId: number;
  tableId: number;
  shareCode?: string;
}

const ComparePageView = ({
  boardId,
  tableId,
  shareCode,
}: ComparePageViewProps) => {
  const { currentView, handleViewChange } = useViewMode();
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated, isLoading } = useSession();

  // 팝업 상태 관리
  const {
    activate: openLoginPopup,
    deactivate: closeLoginPopup,
    active: isLoginPopupOpen,
  } = useToggle();

  const {
    activate: openShareCodeConfirm,
    deactivate: closeShareCodeConfirm,
    active: isShareCodeConfirmOpen,
  } = useToggle();
  const { formData, response, isMetaDataLoading } = useComparisonTable({
    boardId,
    tableId,
    shareCode,
  });
  const mutation = useUpdateComparisonTable({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const methods = useForm<ComparisonFormData>({ defaultValues: formData });

  const handleAddCellClick = () => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      openLoginPopup();
    } else if (shareCode) {
      openShareCodeConfirm();
    }
  };

  const onSubmit = async (formData: ComparisonFormData) => {
    const data = transformFormDataToUpdateComparisonTableRequest(formData);
    await mutation.mutateAsync({ tableId, data });

    await queryClient.invalidateQueries({
      queryKey: getGetComparisonTableQueryKey(tableId),
    });

    if (currentView === "edit") {
      handleViewChange("table");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn(
          "flex h-screen flex-col bg-neutral-98 p-[2.4rem] transition-all duration-500 ease-in-out",
          ["table", "edit"].includes(currentView) && "w-full [&+div]:w-0",
          currentView === "map" && "w-[min(71.6rem,100%)] shrink-0",
        )}
      >
        <ComparePageHeader
          title={formData.tableName || "비교표"}
          creator={`${response?.createdBy || "알 수 없음"}님`}
          createdAt={new Date()}
          count={formData.accommodationRequestList.length}
          className="mb-[1.6rem] shrink-0"
        />
        <ComparePageTitle
          shareCode={response?.shareCode}
          currentView={currentView}
          onViewChange={handleViewChange}
          onSave={async () => {
            if (currentView === "edit") {
              const handleSubmit = methods.handleSubmit(onSubmit);
              await handleSubmit();
            }
            handleViewChange("table");
          }}
          isLoading={mutation.isPending}
          isAuthenticated={isAuthenticated}
          isAccessedByShareCode={Boolean(shareCode)}
          className="mb-[3.2rem] shrink-0"
        />

        <CompareTable
          state={currentView === "edit" ? "edit" : "default"}
          isAuthenticated={isAuthenticated}
          isAccessedByShareCode={Boolean(shareCode)}
          onAddCellClick={handleAddCellClick}
        />
      </form>
      <LoadingIndicator active={mutation.isPending || isMetaDataLoading} />

      <LoginPopup
        active={isLoginPopupOpen}
        onClose={closeLoginPopup}
        to={`/boards/${boardId}/compares/${tableId}`}
      />

      <Confirm
        active={isShareCodeConfirmOpen}
        onCancel={closeShareCodeConfirm}
        onConfirm={closeShareCodeConfirm}
        title="멤버만 수정할 수 있어요"
        description="이 표는 읽기 전용이에요. 이 여행의 멤버로 참여를 요청해보세요."
        confirmText="닫기"
        confirmVariant="primary"
      />
    </FormProvider>
  );
};

export default ComparePageView;
