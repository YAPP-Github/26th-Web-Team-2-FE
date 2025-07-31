import { useEffect, useState } from "react";

type OnBoardStep = "init" | "saveLink" | "finish";

const useOnboarding = () => {
  const [onBoardStep, setOnBoardStep] = useState<OnBoardStep>("init");

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

  return {
    onBoardStep,
    handleOnBoardStep,
    handleOnPrevStep,
    resetOnBoardStep,
  };
};

export default useOnboarding;
