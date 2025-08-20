import {
  type GetComparisonTableByShareCodeQueryError,
  type GetComparisonTableByShareCodeQueryResult,
  type GetComparisonTableQueryError,
  type GetComparisonTableQueryResult,
  getGetComparisonTableByShareCodeQueryKey,
  getGetComparisonTableByShareCodeQueryOptions,
  getGetComparisonTableQueryKey,
  getGetComparisonTableQueryOptions,
  prefetchGetComparisonTableByShareCodeQuery,
  prefetchGetComparisonTableQuery,
  type useGetComparisonTable,
  type useGetComparisonTableByShareCode,
} from "@ssok/api";
import type { GetComparisonTableByShareCodeParams } from "@ssok/api/schemas";
import {
  type DataTag,
  type DefinedUseQueryResult,
  type QueryClient,
  type QueryKey,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

export const prefetchComparisonTableQuery = (
  queryClient: QueryClient,
  {
    tableId,
    ...params
  }:
    | (GetComparisonTableByShareCodeParams & { tableId: number })
    | { tableId: number },
  options:
    | Parameters<typeof prefetchGetComparisonTableByShareCodeQuery>[3]
    | Parameters<typeof prefetchGetComparisonTableQuery>[2],
) => {
  if ("shareCode" in params && params.shareCode) {
    return prefetchGetComparisonTableByShareCodeQuery(
      queryClient,
      tableId,
      params as GetComparisonTableByShareCodeParams,
      options as Parameters<
        typeof prefetchGetComparisonTableByShareCodeQuery
      >[3],
    );
  } else {
    return prefetchGetComparisonTableQuery(
      queryClient,
      tableId,
      options as Parameters<typeof prefetchGetComparisonTableQuery>[2],
    );
  }
};

export const getComparisonTableQueryKey = ({
  tableId,
  ...params
}:
  | (GetComparisonTableByShareCodeParams & { tableId: number })
  | { tableId: number }) => {
  if ("shareCode" in params && params.shareCode) {
    return getGetComparisonTableByShareCodeQueryKey(tableId, {
      shareCode: params.shareCode,
    } satisfies GetComparisonTableByShareCodeParams);
  }

  return getGetComparisonTableQueryKey(tableId);
};

export const useComparisonTableQuery = (
  {
    tableId,
    ...params
  }:
    | (GetComparisonTableByShareCodeParams & { tableId: number })
    | { tableId: number },
  options:
    | Parameters<typeof useGetComparisonTableByShareCode>[2]
    | Parameters<typeof useGetComparisonTable>[1],
  queryClient?: QueryClient,
) => {
  const queryOptions =
    "shareCode" in params && params.shareCode
      ? getGetComparisonTableByShareCodeQueryOptions(
          tableId,
          params,
          options as Parameters<typeof useGetComparisonTableByShareCode>[2],
        )
      : getGetComparisonTableQueryOptions(
          tableId,
          options as Parameters<typeof useGetComparisonTable>[1],
        );

  const query = useQuery(
    queryOptions as UseQueryOptions,
    queryClient,
  ) as DefinedUseQueryResult<
    GetComparisonTableByShareCodeQueryResult | GetComparisonTableQueryResult,
    GetComparisonTableByShareCodeQueryError | GetComparisonTableQueryError
  > & {
    queryKey: DataTag<QueryKey, unknown, unknown>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
