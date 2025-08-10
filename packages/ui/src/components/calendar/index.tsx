import {
  type DateRange,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";
import IcArrowLeft from "@/assets/icons/arrow-left.svg?react";
import IcArrowRight from "@/assets/icons/arrow-right.svg?react";
import "react-day-picker/dist/style.css";
import { ko } from "react-day-picker/locale";

type CalendarProps = {
  selectedDate: DateRange | undefined;
  onDateSelect: (date: DateRange | undefined) => void;
  onApplyDate: () => void;
};

const Calendar = ({
  selectedDate,
  onDateSelect,
  onApplyDate,
}: CalendarProps) => {
  const defaultClassNames = getDefaultClassNames();
  // TODO: 년도 / 월 선택 컴포넌트 커스터마이징
  return (
    <section className="rounded-[0.8rem] border border-neutral-90 bg-neutral-100 px-[1.2rem] pt-[2rem] shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]">
      <DayPicker
        locale={ko}
        startMonth={new Date(new Date().getFullYear(), 0)}
        endMonth={new Date(new Date().getFullYear() + 10, 11)}
        captionLayout="dropdown"
        components={{
          Chevron: Chevron,
        }}
        classNames={{
          root: `${defaultClassNames.root}`,
          nav: `${defaultClassNames.nav} gap-[0.8rem]`,
          month: `flex flex-col gap-[1rem]`,
          month_caption: `px-[1.2rem]`,
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
      <div className="px-[1.2rem] py-[1rem]">
        <button
          type="button"
          className="flex w-full justify-end px-[0.4rem] py-[0.7rem] text-body2-semi14 text-primary"
          onClick={onApplyDate}
        >
          적용
        </button>
      </div>
    </section>
  );
};

type ChevronProps = {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: "left" | "right" | "up" | "down";
};

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
