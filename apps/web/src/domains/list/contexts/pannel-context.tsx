"use client";
import { createContext, type ReactNode, useContext, useState } from "react";

type PanelContextType = {
  isPanelExpanded: boolean;
  handlePanelToggle: () => void;
  handlePanelExpand: () => void;
  handlePanelCollapse: () => void;
};

const PanelContext = createContext<PanelContextType | null>(null);

const PanelProvider = ({ children }: { children: ReactNode }) => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  const handlePanelToggle = () => setIsPanelExpanded((prev) => !prev);
  const handlePanelExpand = () => setIsPanelExpanded(true);
  const handlePanelCollapse = () => setIsPanelExpanded(false);

  return (
    <PanelContext.Provider
      value={{
        isPanelExpanded,
        handlePanelToggle,
        handlePanelExpand,
        handlePanelCollapse,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("panelProvider 내부에서 사용하세요");
  }
  return context;
};

export default PanelProvider;
export { usePanelContext };
