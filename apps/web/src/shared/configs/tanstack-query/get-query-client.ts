import { QueryClient } from "@tanstack/react-query";
import queryClientOptions from "@/shared/configs/tanstack-query/query-client-options";

const makeQueryClient = () => {
  return new QueryClient(queryClientOptions);
};

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export default getQueryClient;
