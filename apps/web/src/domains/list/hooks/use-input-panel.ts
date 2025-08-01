import { useState } from "react";

/**
 * 입력 영역의 확장 상태와 툴팁 표시 상태를 관리하는 커스텀 훅
 *
 * @returns {{
 *  isInputExpanded: boolean;              // 입력 패널이 확장되어 있는지 여부
 *  setIsInputExpanded: (v: boolean) => void; // 입력 패널 확장 상태를 직접 설정하는 함수
 *  isTooltipVisible: boolean;             // 툴팁이 표시되고 있는지 여부
 *  setIsTooltipVisible: (v: boolean) => void; // 툴팁 표시 상태를 직접 설정하는 함수
 *  handleCloseInputExpansion: () => void; // 입력 패널을 닫는 함수
 *  toggleInputExpansion: () => void;      // 입력 패널 확장 상태를 토글하는 함수
 *  handleTooltipvisible: (visible: boolean) => void; // 툴팁 표시 여부를 설정하는 함수
 * }}
 *
 */
const useInputPanel = () => {
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleCloseInputExpansion = () => {
    setIsInputExpanded(false);
  };

  const toggleInputExpansion = () => {
    setIsInputExpanded(!isInputExpanded);
  };

  const handleTooltipvisible = (visible: boolean) => {
    setIsTooltipVisible(visible);
  };
  return {
    isInputExpanded,
    setIsInputExpanded,
    isTooltipVisible,
    setIsTooltipVisible,
    handleCloseInputExpansion,
    toggleInputExpansion,
    handleTooltipvisible,
  };
};

export default useInputPanel;
