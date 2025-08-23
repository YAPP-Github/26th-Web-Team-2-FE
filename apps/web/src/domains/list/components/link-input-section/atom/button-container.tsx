import { Button, IcAddMemo, IcMemoFilled } from "@ssok/ui";
import { useCallback, useRef, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import useOutsideClick from "@/domains/list/hooks/use-outside-click";
import MemoInputBox from "./memo-input";

type FormData = {
  link: string;
  memo?: string;
};

export interface ButtonContainerProps {
  isMemoInputVisible: boolean; // 메모 입력창 표시 여부
  memoText: string; // 메모 텍스트
  maxChars: number; // 최대 글자 수
  register: UseFormRegister<FormData>; // react-hook-form 등록 함수
  handleMemoInput: () => void;
}

const ButtonContainer = ({
  isMemoInputVisible,
  memoText,
  maxChars,
  register,
  handleMemoInput,
}: ButtonContainerProps) => {
  const memoRef = useRef<HTMLDivElement>(null);
  useOutsideClick(memoRef, handleMemoInput, isMemoInputVisible);
  const [isMemoFilled, setIsMemoFilled] = useState(false);

  const handleCheckMemoFilled = useCallback(() => {
    if (memoText.length > 0) {
      setIsMemoFilled(true);
    } else {
      setIsMemoFilled(false);
    }
    handleMemoInput();
  }, [memoText, handleMemoInput]);

  return (
    <div className="flex flex-row justify-end gap-[0.8rem]">
      <div className="relative">
        <Button
          type="button"
          variant="text"
          size="md"
          onClick={handleMemoInput}
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
          <MemoInputBox<FormData>
            memoText={memoText}
            maxChars={maxChars}
            register={register}
            fieldName="memo"
            isListMemo={null}
            isVisible={isMemoInputVisible}
            onClose={handleMemoInput}
            onSubmit={handleCheckMemoFilled}
          />
        )}
      </div>
      <Button variant="primary" size="md" type="submit">
        저장하기
      </Button>
    </div>
  );
};

export default ButtonContainer;
