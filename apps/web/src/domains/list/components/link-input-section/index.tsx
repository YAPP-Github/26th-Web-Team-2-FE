import {
  Button,
  cn,
  IcAddMemo,
  IcCollapse,
  IcExpand,
  IcInfo,
  IcLink,
  IcUpload,
  TextField,
  TextWithIcon,
} from "@ssok/ui";
import { useEffect, useRef } from "react";
import type { UseFormRegister } from "react-hook-form";
import { useOutsideClick } from "../../hooks/use-outside-click";
import BubbleInfo from "./bubble-info";

type FormData = {
  url: string;
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
  const memoRef = useRef<HTMLDivElement>(null);
  useOutsideClick(memoRef, handleMemoInputToggle, isMemoInputVisible);

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
      <div className="flex justify-between">
        <div className="flex items-center gap-[0.8rem]">
          <p className="text-heading1-semi20 text-neutral-10">
            숙소 링크 저장하기
          </p>
          {isInputExpanded && (
            <TextWithIcon
              onMouseEnter={() => handleTooltipvisible(true)}
              onMouseLeave={() => handleTooltipvisible(false)}
              icon={
                <IcInfo
                  width="20px"
                  height="20px"
                  className="text-primary-70"
                />
              }
              className="flex-row-reverse gap-[0.2rem]"
            >
              <TextWithIcon.Text className="text-caption2-regular11 text-neutral-50">
                저장 가능한 링크
              </TextWithIcon.Text>
            </TextWithIcon>
          )}
          {isTooltipVisible && (
            <BubbleInfo>
              지금은 부킹닷컴, 아고다, 호텔스컴바인 링크만 지원 중이에요
            </BubbleInfo>
          )}
        </div>
        <button type="button" onClick={toggleInputExpansion}>
          {!isInputExpanded && <IcExpand width="24px" height="24px" />}
          {isInputExpanded && <IcCollapse width="24px" height="24px" />}
        </button>
      </div>
      <div
        className={cn(
          "flex flex-col gap-[1.6rem] overflow-visible transition-[max-height] duration-800 ease-in-out",
          isInputExpanded ? "max-h-[1000px]" : "max-h-0",
        )}
      >
        {isInputExpanded && (
          <>
            {/* 링크 저장_입력란 */}
            <div>
              <TextField
                placeholder="숙소의 상세 페이지 링크를 복사해서 붙여넣거나, 드래그해 추가해 주세요"
                icon={<IcLink width="24" height="24" />}
                // TODO: zod validation 추가
                {...register("url", { required: "URL을 입력해주세요" })}
              />
            </div>
            {/* 링크 저장_버튼 */}
            <div className="flex flex-row justify-end gap-[0.8rem]">
              <div className="relative">
                <Button
                  variant="text"
                  size="md"
                  onClick={handleMemoInputToggle}
                  icon={<IcAddMemo width="24" height="24" />}
                >
                  메모
                </Button>
                {/* 링크 저장_버튼_메모 입력창 */}
                {isMemoInputVisible && (
                  <section
                    ref={memoRef}
                    className="absolute bottom-[-12.5rem] left-0 z-5 flex w-[33.2rem] flex-col gap-[1.2rem] rounded-[1.2rem] border border-primary-60 bg-neutral-100 px-[1.6rem] py-[1.2rem] focus:outline-none"
                  >
                    <textarea
                      aria-label="메모 입력"
                      maxLength={50}
                      placeholder="남기고 싶은 간단한 설명을 메모로 남겨보세요."
                      {...register("memo", {
                        maxLength: 50,
                      })}
                      className="min-h-[4.8rem] w-full resize-none text-body1-regular16 text-neutral-5 placeholder:text-neutral-60 focus:outline-none"
                    />
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-caption1-medi12 text-neutral-70">
                        {memoText.length} / {maxChars}
                      </span>
                      <button type="submit" className="">
                        <IcUpload
                          width="24"
                          height="24"
                          className={cn(
                            memoText.length > 0
                              ? ` text-primary-70`
                              : `text-neutral-80`,
                          )}
                        />
                      </button>
                    </div>
                  </section>
                )}
              </div>
              <Button variant="primary" size="md">
                저장하기
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LinkInputSection;
