"use client";

import { SsokUiProvider } from "@ssok/ui";
import type { PropsWithChildren } from "react";
import AnalyticsProvider from "./modules/analytics-provider";
import JotaiProvider from "./modules/jotai-provider";
import QueryProvider from "./modules/query-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <JotaiProvider>
      <QueryProvider>
        <AnalyticsProvider>
          <SsokUiProvider>{children}</SsokUiProvider>
        </AnalyticsProvider>
      </QueryProvider>
    </JotaiProvider>
  );
};

export default Providers;
