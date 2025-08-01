import { cn, IcLink } from "@ssok/ui";
import { useEffect } from "react";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import ButtonContainer from "./atom/button-container";
import LinkInputContainer from "./atom/link-input-container";
import OnboardingBubble from "./atom/onboarding-bubble";
import TitleContainer from "./atom/title-section";

type FormData = {
  link: string;
  memo?: string;
};

type LinkInputSectionProps = {
  isDragging: boolean;
  isInputExpanded: boolean;
  isTooltipVisible: boolean;
  isMemoInputVisible: boolean;
  handleCloseInputExpansion: () => void;
  toggleInputExpansion: () => void;
  handleMemoInputToggle: () => void;
  handleTooltipvisible: (visible: boolean) => void;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  memoText: string;
  maxChars: number;
};

const LinkInputSection = ({
  isDragging,
  isInputExpanded,
  isTooltipVisible,
  isMemoInputVisible,
  handleCloseInputExpansion,
  toggleInputExpansion,
  handleMemoInputToggle,
  handleTooltipvisible,
  register,
  watch,
  memoText,
  maxChars,
}: LinkInputSectionProps) => {
  useEffect(() => {
    if (localStorage.getItem("onboardingStep") !== "finished") return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timer) {
        clearTimeout(timer);
      }

      if (isInputExpanded) {
        timer = setTimeout(() => {
          handleCloseInputExpansion();
        }, 200);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [isInputExpanded, handleCloseInputExpansion]);

  return (
    <section
      className={cn(
        "rounded-2xl border border-neutral-90 bg-neutral-100",
        "relative flex w-full flex-col gap-[1.6rem] p-[2.4rem]",
      )}
    >
      {/* 링크 저장_제목 */}
      <TitleContainer
        isInputExpanded={isInputExpanded}
        isTooltipVisible={isTooltipVisible}
        toggleInputExpansion={toggleInputExpansion}
        handleTooltipVisible={handleTooltipvisible}
      />
      <div
        className={cn(
          "flex flex-col gap-[1.6rem] overflow-visible transition-[max-height] duration-800 ease-in-out",
          isInputExpanded ? "max-h-[1000px]" : "max-h-0",
        )}
      >
        {isInputExpanded && (
          // TODO: submit 이벤트 핸들러 추가
          <form className="flex flex-col gap-[1.6rem]" onSubmit={() => {}}>
            {/* 링크 저장_입력란 */}
            <LinkInputContainer register={register} watch={watch} />
            {/* 링크 저장_버튼 */}
            <ButtonContainer
              isMemoInputVisible={isMemoInputVisible}
              register={register}
              memoText={memoText}
              maxChars={maxChars}
              handleMemoInputToggle={handleMemoInputToggle}
            />
          </form>
        )}
        <OnboardingBubble />
      </div>
      {isDragging && (
        <>
          <div className="absolute top-0 left-0 z-1 h-full w-full rounded-2xl border-2 border-primary-70 bg-[rgba(232,255,239,0.4)]" />
          <div
            className={cn(
              "absolute top-0 right-[-60%] z-2",
              "flex flex-col items-center justify-center gap-[0.8rem]",
              "rounded-2xl border border-neutral-0 bg-neutral-variant-5",
              "px-[6.8rem] pt-[2rem] pb-[3.6rem]",
              "after:absolute after:top-[50%] after:left-[-12px] after:translate-y-[-50%]",
              "after:border-y-[13px] after:border-r-[12px] after:border-l-0",
              "after:border-y-transparent after:border-r-neutral-variant-5",
              "after:content-['']",
            )}
          >
            <IcLink width={48} height={48} className="text-neutral-100" />
            <p className="text-center text-heading1-semi20 text-neutral-100">
              링크를 여기에 끌어다 놓기
            </p>
            <p className="text-center text-body1-medi16 text-neutral-98">
              숙소의 상세 페이지 링크를 올리고 <br />
              저장해주세요.
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default LinkInputSection;
