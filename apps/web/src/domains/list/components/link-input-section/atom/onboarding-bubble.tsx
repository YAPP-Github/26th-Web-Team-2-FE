import { Button, cn, IcClose } from "@ssok/ui";

import useOnboarding from "@/domains/list/hooks/use-onboarding-step";

const config = {
  init: {
    title: "호텔, 이렇게 추가해요",
    description: (
      <>
        호텔 상세 페이지 링크를 붙여넣거나 드래그해서 넣어주세요. <br />
        현재는 부킹닷컴, 아고다, 익스피디아만 지원돼요!
      </>
    ),
    nextBtnText: "다음으로",
    index: 1,
    total: 2,
  },
  saveLink: {
    title: "이제 저장해볼 차례!",
    description: (
      <>
        저장하기 버튼을 누르면 아래 리스트에서 바로 <br /> 확인할 수 있어요!
      </>
    ),
    nextBtnText: "시작하기",
    index: 2,
    total: 2,
  },
} as const;

const OnboardingBubble = () => {
  const {
    isVisible,
    handleClose,
    onboardStep,
    handleOnboardStep,
    handleOnPrevStep,
  } = useOnboarding();
  if (!onboardStep || onboardStep === "finish" || !isVisible) return null;
  const { title, description, index, total, nextBtnText } = config[onboardStep];

  return (
    <div
      role="tooltip"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-description"
      className={cn(
        "absolute z-10 inline-block",
        onboardStep === "init" && "bottom-[-12rem] left-[0rem]",
        onboardStep === "saveLink" && "bottom-[-20rem] left-[84%] w-max",
      )}
    >
      <div className="relative rounded-[1.6rem] bg-neutral-variant-5 px-[2.4rem] py-[2rem] after:absolute after:top-[-12px] after:left-10 after:border-x-[8px] after:border-x-transparent after:border-t-0 after:border-b-[12px] after:border-b-neutral-variant-5 after:content-[''] ">
        <header className="flex w-full items-center justify-between">
          <h1
            id="onboarding-title"
            className="text-heading1-semi20 text-neutral-100"
          >
            {title}
          </h1>
          <button aria-label="온보딩 닫기" type="button" onClick={handleClose}>
            <IcClose width={24} height={24} className="text-neutral-100" />
          </button>
        </header>
        <p
          id="onboarding-description"
          className="pt-[0.8rem] text-start text-body1-medi16 text-neutral-90"
        >
          {description}
        </p>
        <div className="flex flex-row items-center justify-between pt-[1.6rem]">
          <p className="text-caption1-medi12 text-neutral-70">{`${index} / ${total}`}</p>
          <div className="flex flex-row gap-[0.8rem]">
            {onboardStep === "saveLink" && (
              <Button
                variant="text"
                size="sm"
                onClick={handleOnPrevStep}
                className="text-neutral-100"
              >
                이전으로
              </Button>
            )}
            <Button variant="primary" size="xs" onClick={handleOnboardStep}>
              {nextBtnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBubble;
