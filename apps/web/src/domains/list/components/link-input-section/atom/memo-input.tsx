import { cn, IcUpload } from "@ssok/ui";
import { useRef } from "react";
import type { UseFormRegister } from "react-hook-form";
import useOutsideClick from "@/domains/list/hooks/use-outside-click";

interface MemoInputBoxProps<T extends { memo?: string }> {
  memoText: string;
  maxChars: number;
  register: UseFormRegister<T>;
  fieldName?: keyof T;
  isVisible: boolean;
  isListMemo: number | null;
  onClose: () => void;
  onSubmit?: () => void;
}

const MemoInputBox = <T extends { memo?: string }>({
  memoText,
  maxChars,
  register,
  fieldName = "memo" as keyof T,
  isVisible,
  isListMemo,
  onClose,
  onSubmit,
}: MemoInputBoxProps<T>) => {
  const memoRef = useRef<HTMLDivElement>(null);
  useOutsideClick(memoRef, onClose, isVisible);

  if (!isVisible) return null;

  return (
    <section
      ref={memoRef}
      className={cn(
        "absolute z-popover flex w-[33.2rem] flex-col gap-[1.2rem] rounded-[1.2rem] border px-[1.6rem] py-[1.2rem] focus:outline-none",
        " border-primary-60 bg-neutral-100",
        isListMemo ? "bottom-[-10rem] left-[36%]" : "bottom-[-12.5rem] left-0",
      )}
    >
      <textarea
        aria-label="메모 입력"
        maxLength={50}
        placeholder="남기고 싶은 간단한 설명을 메모로 남겨보세요."
        {...register(fieldName as any, { maxLength: maxChars })}
        className="min-h-[4.8rem] w-full resize-none text-body1-regular16 text-neutral-5 placeholder:text-neutral-60 focus:outline-none"
      />
      <div className="flex flex-row items-center justify-between">
        <span className="text-caption1-medi12 text-neutral-70">
          {memoText.length} / {maxChars}
        </span>
        <button
          type={isListMemo ? "submit" : "button"}
          className=""
          onClick={isListMemo ? undefined : onSubmit}
        >
          <IcUpload
            width="24"
            height="24"
            className={cn(
              memoText.length > 0 ? "text-primary-70" : "text-neutral-80",
            )}
          />
        </button>
      </div>
    </section>
  );
};

export default MemoInputBox;
