import { IcArrowLeft, IcArrowRight } from "dist";
import { useState } from "react";
import "../../app.css";
import {
  type DateRange,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { cn } from "@/utils";

const Calendar = () => {
  const defaultClassNames = getDefaultClassNames();
  const [selected, setSelectedd] = useState<DateRange | undefined>();

  // const formatCaption = (date: Date) => {
  //   return date
  //     .toLocaleDateString("ko-KR", { year: "numeric", month: "numeric" })
  //     .replace(".", "년")
  //     .replace(".", "월")
  //     .trim();
  // };

  return (
    <section className="rounded-[0.8rem] border border-neutral-90 bg-neutral-100 px-[1.2rem] py-[2rem] shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]">
      <DayPicker
        locale={ko}
        captionLayout="dropdown"
        // formatters={{ formatCaption }}
        components={{ Chevron: Chevron }}
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
          range_start: cn(`${defaultClassNames.range_start}`),
          range_middle: `bg-[#edf9f5] text-neutral-20`,
          range_end: cn(`${defaultClassNames.range_end}`),
        }}
        mode="range"
        selected={selected}
        onSelect={setSelectedd}
      />
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

// function _CustomCaption({
//   displayMonth,
//   onMonthChange,
//   className,
// }: CaptionProps) {
//   const year = displayMonth.getFullYear();
//   const month = displayMonth.getMonth(); // 0-based

//   const prevMonth = () => {
//     const prev = new Date(year, month - 1);
//     onMonthChange(prev);
//   };
//   const nextMonth = () => {
//     const next = new Date(year, month + 1);
//     onMonthChange(next);
//   };

//   return (
//     <div className={`${className} flex items-center justify-between px-4 py-2`}>
//       <button
//         type="button"
//         onClick={prevMonth}
//         className="flex items-center justify-center p-1"
//         aria-label="Previous month"
//       >
//         <IcArrowLeft className="h-5 w-5 text-neutral-60" />
//       </button>

//       <div className="text-body1-medi16 text-neutral-20">
//         {year}년 {month + 1}월
//       </div>

//       <button
//         type="button"
//         onClick={nextMonth}
//         className="flex items-center justify-center p-1"
//         aria-label="Next month"
//       >
//         <IcArrowRight className="h-5 w-5 text-neutral-60" />
//       </button>
//     </div>
//   );
// }

export default Calendar;
