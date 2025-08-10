import {
  getGetComparisonTableQueryKey,
  useGetComparisonTable,
} from "@ssok/api";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ComparisonFormData } from "@/domains/compare/types";
import { transformComparisonTableResponseToFormData } from "@/domains/compare/utils/form";
import { useSession } from "@/shared/hooks/use-session";

export const useComparisonTable = ({
  boardId,
  tableId,
}: {
  boardId: number;
  tableId: number;
}) => {
  const queryClient = useQueryClient();
  const { accessToken } = useSession({ required: true });

  const { data } = useGetComparisonTable(tableId, {
    query: {
      enabled:
        !!accessToken ||
        !!queryClient.getQueryData(getGetComparisonTableQueryKey(tableId)),
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const formData = useMemo((): ComparisonFormData => {
    const response = data?.data.result;
    if (!response) {
      return { boardId, accommodationRequestList: [] };
    }
    return transformComparisonTableResponseToFormData({ boardId, response });
  }, [data, boardId]);

  return { formData, response: data?.data.result };
};
