import type { PropsWithChildren } from "react";
import JotaiProvider from "./modules/jotai-provider";
import QueryProvider from "./modules/query-provider";

function Providers({ children }: PropsWithChildren) {
  return (
    <JotaiProvider>
      <QueryProvider>{children}</QueryProvider>
    </JotaiProvider>
  );
}

export default Providers;
