"use client";

import { SsokUiProvider } from "@ssok/ui";
import type { PropsWithChildren } from "react";
import JotaiProvider from "./modules/jotai-provider";
import QueryProvider from "./modules/query-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <JotaiProvider>
      <QueryProvider>
        <SsokUiProvider>{children}</SsokUiProvider>
      </QueryProvider>
    </JotaiProvider>
  );
};

export default Providers;
