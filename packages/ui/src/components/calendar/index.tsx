import {
  type DateRange,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";
import IcArrowLeft from "@/assets/icons/ic_arrow_left.svg?react";
import IcArrowRight from "@/assets/icons/ic_arrow_right.svg?react";
import { cn } from "@/utils";
import "react-day-picker/dist/style.css";
import { ko } from "react-day-picker/locale";

interface CalendarProps {
  selectedDate: DateRange | undefined;
  onDateSelect: (date: DateRange | undefined) => void;
  onApplyDate: () => void;
  /** 적용 버튼 라벨 (함수로 전달 시 선택된 날짜 범위 기반) */
  applyButtonLabel?: string | ((range: DateRange | undefined) => string);
  variant?: "default" | "minimal";
  className?: string;
  /** true 시 적용 버튼 숨김 (BottomSheet.Footer 등 외부에서 렌더 시) */
  hideApplyButton?: boolean;
}

const Calendar = ({
  selectedDate,
  onDateSelect,
  onApplyDate,
  applyButtonLabel = "적용",
  variant = "default",
  className,
  hideApplyButton = false,
}: CalendarProps) => {
  const label =
    typeof applyButtonLabel === "function"
      ? applyButtonLabel(selectedDate)
      : applyButtonLabel;
  const defaultClassNames = getDefaultClassNames();
  const wrapperClass =
    variant === "minimal"
      ? "rounded-[0.8rem] bg-neutral-100 pt-[2rem] w-full"
      : "rounded-[0.8rem] border border-neutral-90 bg-neutral-100 px-[1.2rem] pt-[2rem] shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]";
  // TODO: 년도 / 월 선택 컴포넌트 커스터마이징
  return (
    <section className={cn(wrapperClass, className)}>
      <DayPicker
        locale={ko}
        startMonth={new Date(new Date().getFullYear(), 0)}
        endMonth={new Date(new Date().getFullYear() + 10, 11)}
        captionLayout="dropdown"
        components={{
          Chevron: Chevron,
        }}
        classNames={{
          root: `${defaultClassNames.root} flex justify-center`,
          nav: `${defaultClassNames.nav} gap-[0.8rem]`,
          month: `flex flex-col gap-[1rem]`,
          month_caption: variant === "minimal" ? "" : "px-[1.2rem]",
          caption_label: `text-body1-medi16 text-neutral-20`,
          weekday: `w-[3.6rem] h-[3.6rem] text-center text-caption1-medi12 text-neutral-60`,
          today: `text-neutral-20`,
          day: `w-[3.6rem] h-[3.6rem] text-center text-caption1-medi12 text-neutral-20`,
          selected: `text-body1-medi16 text-neutral-20 border-0 bg-[#edf9f5]`,
          range_middle: `bg-[#edf9f5] text-neutral-20`,
          range_start: `${defaultClassNames.range_start} !bg-none rounded-l-[50%]`,
          range_end: `${defaultClassNames.range_end} !bg-none rounded-r-[50%]`,
        }}
        mode="range"
        selected={selectedDate}
        onSelect={onDateSelect}
        disabled={{ before: new Date() }}
      />
      {!hideApplyButton && (
        <div
          className={cn("py-[1rem]", variant === "default" && "px-[1.2rem]")}
        >
          <button
            type="button"
            className="flex w-full justify-center rounded-[0.8rem] bg-primary px-[1.6rem] py-[1.2rem] text-body1-semi16 text-primary-100"
            onClick={onApplyDate}
          >
            {label}
          </button>
        </div>
      )}
    </section>
  );
};

interface ChevronProps {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: "left" | "right" | "up" | "down";
}

const Chevron = ({
  className,
  size = 18,
  orientation = "left",
}: ChevronProps) => {
  return (
    <div className={`flex items-center justify-center ${className ?? ""}`}>
      {orientation === "left" && (
        <IcArrowLeft width={size} height={size} className="text-neutral-60" />
      )}
      {orientation === "right" && (
        <IcArrowRight width={size} height={size} className="text-neutral-60" />
      )}
    </div>
  );
};

export default Calendar;
