import { useState } from "react";

/**
 * 보드 패널의 확장 상태를 관리하는 커스텀 훅
 *
 * @returns {{
 *   isPanelExpanded: boolean;          // 패널이 확장되어 있는지 여부
 *   handlePanelToggle: () => void;     // 패널 확장 상태를 토글하는 함수
 * }}
 *
 */
const useBoardPanel = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  const handlePanelToggle = () => {
    setIsPanelExpanded((prev) => !prev);
  };

  return {
    isPanelExpanded,
    handlePanelToggle,
  };
};

export default useBoardPanel;
