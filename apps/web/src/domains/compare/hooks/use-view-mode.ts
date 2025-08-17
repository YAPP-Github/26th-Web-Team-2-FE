import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type ViewMode = "table" | "map" | "edit";

const useViewMode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentView: ViewMode = useMemo(() => {
    const view = searchParams.get("view");
    if (view === "table" || view === "map" || view === "edit") {
      return view;
    }
    return "table";
  }, [searchParams]);

  const handleViewChange = useCallback(
    (view: ViewMode) => {
      const params = new URLSearchParams(searchParams);
      params.set("view", view);
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  return { currentView, handleViewChange };
};

export default useViewMode;
