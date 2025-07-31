import { Button, IcClose } from "@ssok/ui";
import type React from "react";

type BaseOnboardingProps = {
  title: string;
  description: React.ReactNode;
  nextBtnText: string;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
};

type OnboardingBubbleProps =
  | (BaseOnboardingProps & {
      prevBtnText: string;
      onPrev: () => void;
    })
  | (BaseOnboardingProps & {
      prevBtnText?: undefined;
      onPrev?: undefined;
    });

const OnboardingBubble = ({
  title,
  description,
  prevBtnText,
  nextBtnText,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: OnboardingBubbleProps) => {
  return (
    <div className="absolute bottom-[-20rem] left-[-2.5rem] inline-block">
      <div className="relative rounded-[1.6rem] bg-neutral-variant-5 px-[2.4rem] py-[2rem] after:absolute after:top-[-12px] after:left-10 after:border-x-[8px] after:border-x-transparent after:border-t-0 after:border-b-[12px] after:border-b-neutral-variant-5 after:content-[''] ">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-heading1-semi20 text-neutral-100">{title}</h1>
          <button type="button" onClick={onClose}>
            <IcClose
              width={24}
              height={24}
              className="text-neutral-100"
              onClick={onClose}
            />
          </button>
        </header>
        <p className="pt-[0.8rem] text-start text-body1-medi16 text-neutral-90">
          {description}
        </p>
        <div className="flex flex-row items-center justify-between pt-[1.6rem]">
          <p className="text-caption1-medi12 text-neutral-70">{`${index} / ${total}`}</p>
          <div className="flex flex-row gap-[0.8rem]">
            {onPrev && (
              <Button
                variant="text"
                size="sm"
                onClick={onPrev}
                className="text-neutral-100"
              >
                {prevBtnText}
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={onNext}>
              {nextBtnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBubble;
