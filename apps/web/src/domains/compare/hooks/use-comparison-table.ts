import { useMemo } from "react";
import { useComparisonTableQuery } from "@/domains/compare/api";
import type { ComparisonFormData } from "@/domains/compare/types";
import { transformComparisonTableResponseToFormData } from "@/domains/compare/utils/form";
import useSession from "@/shared/hooks/use-session";

const useComparisonTable = ({
  boardId,
  tableId,
  shareCode,
}: {
  boardId: number;
  tableId: number;
  shareCode?: string;
}) => {
  const { accessToken } = useSession({ required: !shareCode });

  const { data, isLoading: isMetaDataLoading } = useComparisonTableQuery(
    { tableId, shareCode },
    {
      query: {
        enabled: !!tableId && (!!accessToken || !!shareCode),
      },
      request: {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    },
  );

  const formData = useMemo((): ComparisonFormData => {
    const response = data?.data.result;
    if (!response) {
      return { tripBoardId: boardId, accommodationRequestList: [] };
    }
    return transformComparisonTableResponseToFormData({ boardId, response });
  }, [data, boardId]);

  return { formData, response: data?.data.result, isMetaDataLoading };
};

export default useComparisonTable;
