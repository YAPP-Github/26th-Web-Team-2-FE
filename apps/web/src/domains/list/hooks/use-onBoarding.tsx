import { useEffect, useState } from "react";

type OnBoardStep = "init" | "saveLink" | "finish";

/**
 * 온보딩 단계를 관리하는 커스텀 훅
 *
 * - localStorage에 저장된 `onBoardStep` 값을 기반으로 온보딩 단계를 관리합니다.
 * - 컴포넌트에서 온보딩 상태를 UI로 제어할 수 있도록 다양한 상태와 메서드를 제공합니다.
 *
 * @returns {{
 *   onBoardStep: "init" | "saveLink" | "finish";  // 현재 온보딩 단계
 *   isVisible: boolean;                            // 온보딩 버블 표시 여부
 *   close: () => void;                             // 온보딩 버블을 닫습니다 (isVisible을 false로 변경)
 *   handleOnBoardStep: () => void;                 // 현재 단계에서 다음 단계로 이동합니다
 *   handleOnPrevStep: () => void;                  // 현재 단계에서 이전 단계로 이동합니다
 *   resetOnBoardStep: () => void;                  // 온보딩 상태를 초기화하고 1단계(init)로 되돌립니다
 * }}
 */
const useOnboarding = () => {
  const [onBoardStep, setOnBoardStep] = useState<OnBoardStep>("init");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const step = (localStorage.getItem("onBoardStep") as OnBoardStep) || "init";
    setOnBoardStep(step);
  }, []);

  const handleOnBoardStep = () => {
    switch (onBoardStep) {
      case "init":
        localStorage.setItem("onBoardStep", "saveLink");
        setOnBoardStep("saveLink");
        break;
      case "saveLink":
        localStorage.setItem("onBoardStep", "finish");
        setOnBoardStep("finish");
        break;
      default:
        resetOnBoardStep();
    }
  };

  const handleOnPrevStep = () => {
    switch (onBoardStep) {
      case "saveLink":
        localStorage.setItem("onBoardStep", "init");
        setOnBoardStep("init");
        break;
      default:
        resetOnBoardStep();
    }
  };

  const resetOnBoardStep = () => {
    localStorage.removeItem("onBoardStep");
    setOnBoardStep("init");
  };

  const handleClose = () => {
    setIsVisible(false);
    resetOnBoardStep();
  };

  return {
    onBoardStep,
    isVisible,
    handleClose,
    handleOnBoardStep,
    handleOnPrevStep,
    resetOnBoardStep,
  };
};

export default useOnboarding;
