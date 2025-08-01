import { useEffect, useState } from "react";

type OnboardStep = "init" | "saveLink" | "finish";

/**
 * 온보딩 단계를 관리하는 커스텀 훅
 *
 * - localStorage에 저장된 `onBoardStep` 값을 기반으로 온보딩 단계를 관리합니다.
 * - 컴포넌트에서 온보딩 상태를 UI로 제어할 수 있도록 다양한 상태와 메서드를 제공합니다.
 *
 * @returns {{
 *   onboardStep: "init" | "saveLink" | "finish";  // 현재 온보딩 단계
 *   isVisible: boolean;                            // 온보딩 버블 표시 여부
 *   close: () => void;                             // 온보딩 버블을 닫습니다 (isVisible을 false로 변경)
 *   handleOnboardStep: () => void;                 // 현재 단계에서 다음 단계로 이동합니다
 *   handleOnPrevStep: () => void;                  // 현재 단계에서 이전 단계로 이동합니다
 *   resetOnboardStep: () => void;                  // 온보딩 상태를 초기화하고 1단계(init)로 되돌립니다
 * }}
 */
const useOnboarding = () => {
  const [onboardStep, setOnboardStep] = useState<OnboardStep | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const step =
        (localStorage.getItem("onboardingStep") as OnboardStep) || "init";
      setOnboardStep(step);
      setIsVisible(step !== "finish");
    } catch (_error) {
      setOnboardStep("init");
      setIsVisible(true);
    }
  }, []);

  const handleOnboardStep = () => {
    switch (onboardStep) {
      case "init":
        localStorage.setItem("onboardingStep", "saveLink");
        setOnboardStep("saveLink");
        break;
      case "saveLink":
        localStorage.setItem("onboardingStep", "finish");
        setOnboardStep("finish");
        break;
      default:
        resetOnboardingStep();
    }
  };

  const handleOnPrevStep = () => {
    switch (onboardStep) {
      case "saveLink":
        localStorage.setItem("onboardingStep", "init");
        setOnboardStep("init");
        break;
      default:
        resetOnboardingStep();
    }
  };

  const resetOnboardingStep = () => {
    localStorage.removeItem("onboardingStep");
    setOnboardStep("init");
  };

  const handleClose = () => {
    setIsVisible(false);
    resetOnboardingStep();
  };

  return {
    onboardStep,
    isVisible,
    handleClose,
    handleOnboardStep,
    handleOnPrevStep,
    resetOnboardingStep,
  };
};

export default useOnboarding;
