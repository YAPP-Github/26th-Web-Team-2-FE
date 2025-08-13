"use client";

import {
  getGetComparisonTableQueryKey,
  useUpdateComparisonTable,
} from "@ssok/api";
import { cn } from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ComparePageHeader from "@/domains/compare/components/compare-page-header";
import ComparePageTitle from "@/domains/compare/components/compare-page-title";
import CompareTable from "@/domains/compare/components/compare-table";
import { useComparisonTable } from "@/domains/compare/hooks/use-comparison-table";
import { useViewMode } from "@/domains/compare/hooks/use-view-mode";
import type { ComparisonFormData } from "@/domains/compare/types";
import { transformFormDataToUpdateComparisonTableRequest } from "@/domains/compare/utils/form";
import { useSession } from "@/shared/hooks/use-session";

interface ComparePageViewProps {
  boardId: number;
  tableId: number;
}

const ComparePageView = ({ boardId, tableId }: ComparePageViewProps) => {
  const { currentView, handleViewChange } = useViewMode();
  const queryClient = useQueryClient();
  const { accessToken } = useSession();
  const { formData, response } = useComparisonTable({ boardId, tableId });
  const mutation = useUpdateComparisonTable({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const methods = useForm<ComparisonFormData>({ defaultValues: formData });

  useEffect(() => {
    methods.reset(formData);
  }, [methods, formData]);

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
          className="mb-[3.2rem] shrink-0"
        />

        <CompareTable state={currentView === "edit" ? "edit" : "default"} />
      </form>
    </FormProvider>
  );
};

export default ComparePageView;
