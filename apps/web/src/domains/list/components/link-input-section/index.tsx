import { cn } from "@ssok/ui";
import { useEffect } from "react";
import type { UseFormRegister } from "react-hook-form";
import ButtonContainer from "./atom/button-container";
import LinkInputContainer from "./atom/link-input-container";
import TitleContainer from "./atom/title-section";

type FormData = {
  link: string;
  memo?: string;
};

type LinkInputSectionProps = {
  isInputExpanded: boolean;
  isTooltipVisible: boolean;
  isMemoInputVisible: boolean;
  handleCloseInputExpansion: () => void;
  toggleInputExpansion: () => void;
  handleMemoInputToggle: () => void;
  handleTooltipvisible: (visible: boolean) => void;
  register: UseFormRegister<FormData>;
  memoText: string;
  maxChars: number;
};

const LinkInputSection = ({
  isInputExpanded,
  isTooltipVisible,
  isMemoInputVisible,
  handleCloseInputExpansion,
  toggleInputExpansion,
  handleMemoInputToggle,
  handleTooltipvisible,
  register,
  memoText,
  maxChars,
}: LinkInputSectionProps) => {
  useEffect(() => {
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
        "flex w-full flex-col gap-[1.6rem] p-[2.4rem]",
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
            <LinkInputContainer register={register} />
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
      </div>
    </section>
  );
};

export default LinkInputSection;
