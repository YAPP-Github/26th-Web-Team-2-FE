import { Button, cn, IcAddMemo, IcMemoFilled, IcUpload } from "@ssok/ui";
import { useRef, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import useOutsideClick from "@/domains/list/hooks/use-outside-click";

type FormData = {
  link: string;
  memo?: string;
};

interface ButtonContainerProps {
  isMemoInputVisible: boolean; // 메모 입력창 표시 여부
  memoText: string; // 메모 텍스트
  maxChars: number; // 최대 글자 수
  register: UseFormRegister<FormData>; // react-hook-form 등록 함수
  handleMemoInputToggle: () => void; // 메모 입력창 토글 함수
}

export const ButtonContainer = ({
  isMemoInputVisible,
  memoText,
  maxChars,
  register,
  handleMemoInputToggle,
}: ButtonContainerProps) => {
  const memoRef = useRef<HTMLDivElement>(null);
  useOutsideClick(memoRef, handleMemoInputToggle, isMemoInputVisible);
  const [isMemoFilled, setIsMemoFilled] = useState(false);

  const handleCheckMemoFilled = () => {
    if (memoText.length > 0) {
      setIsMemoFilled(true);
    } else {
      setIsMemoFilled(false);
    }
    // TODO: handleClose로 바꾸기
    handleMemoInputToggle();
  };

  return (
    <div className="flex flex-row justify-end gap-[0.8rem]">
      <div className="relative">
        <Button
          type="button"
          variant="text"
          size="md"
          onClick={handleMemoInputToggle}
          icon={
            isMemoFilled ? (
              <IcMemoFilled width="24" height="24" />
            ) : (
              <IcAddMemo width="24" height="24" />
            )
          }
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
              <button
                type="button"
                className=""
                onClick={handleCheckMemoFilled}
              >
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
      <Button variant="primary" size="md" type="submit">
        저장하기
      </Button>
    </div>
  );
};
