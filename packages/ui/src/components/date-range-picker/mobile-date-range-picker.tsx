"use client";

import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import IcCalendar from "@/assets/icons/ic_calendar.svg?react";
import IcCaretDown from "@/assets/icons/ic_caret_down.svg?react";
import { cn } from "@/utils";
import { formatDate } from "@/utils/date";
import type { DateRangeValue } from "./date-range-picker.types";

export interface DateRangePickerMobileCalendarProps {
  selectedDate: DateRange | undefined;
  onDateSelect: (range: DateRange | undefined) => void;
  onApplyDate: () => void;
}

export interface DateRangePickerMobileRenderProps {
  trigger: React.ReactNode;
  calendarProps: DateRangePickerMobileCalendarProps;
}

export interface DateRangePickerMobileProps {
  value: DateRangeValue;
  onChange: (range: DateRangeValue) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  render: (props: DateRangePickerMobileRenderProps) => React.ReactNode;
  disabled?: boolean;
  placeholder?: { from: string; to: string };
  className?: string;
  /** label의 htmlFor와 연결할 trigger 버튼 id */
  triggerId?: string;
}

const DateRangePickerMobile = ({
  value,
  onChange,
  open,
  onOpenChange,
  render,
  disabled = false,
  placeholder = { from: "출발일 선택", to: "도착일 선택" },
  className,
  triggerId,
}: DateRangePickerMobileProps) => {
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  useEffect(() => {
    if (open) {
      setActiveField("from");
    } else {
      setActiveField(null);
    }
  }, [open]);

  const closeCalendar = () => {
    onOpenChange(false);
    setActiveField(null);
  };

  const setFrom = (date: Date | undefined) => {
    onChange({ ...value, from: date });
  };

  const setTo = (date: Date | undefined) => {
    onChange({ ...value, to: date });
  };

  const handleDateSelect = (selected: DateRange | undefined) => {
    if (!selected) return;

    if (activeField === "from") {
      if (value?.from?.getTime() === selected.from?.getTime()) {
        const [selectedFrom, currentTo] = [selected.to, value?.to];
        if (selectedFrom && currentTo && selectedFrom > currentTo) {
          onChange({ from: selectedFrom, to: selectedFrom });
        } else {
          setFrom(selectedFrom ?? currentTo);
        }
      } else if (selected.from) {
        onChange({ from: selected.from, to: selected.from });
      }
      setActiveField("to");
      return;
    }
    if (activeField === "to") {
      if (selected.to || selected.from) {
        setTo(selected.to || selected.from);
      }
    }
  };

  const openCalendar = () => {
    if (disabled) return;
    setActiveField("from");
    onOpenChange(true);
  };

  const trigger = (
    <button
      type="button"
      id={triggerId}
      onClick={openCalendar}
      disabled={disabled}
      className={cn(
        "flex h-[5.2rem] w-full cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] border px-[1.2rem] py-[1.4rem] text-left text-body1-semi16 transition-colors",
        "border-neutral-90 bg-white",
        "hover:border-neutral-80 hover:bg-neutral-98",
        "focus:border-neutral-80 focus:bg-neutral-95 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <IcCalendar width={24} height={24} className="shrink-0 text-neutral-50" />
      {value?.from && value?.to ? (
        <span className="truncate text-neutral-30">
          {formatDate(value.from)} → {formatDate(value.to)}
        </span>
      ) : (
        <span className="truncate text-neutral-50">{placeholder.from}</span>
      )}
      <IcCaretDown
        width={16}
        height={16}
        className="ml-auto shrink-0 text-neutral-50"
      />
    </button>
  );

  const calendarProps: DateRangePickerMobileCalendarProps = {
    selectedDate: value ? { from: value?.from, to: value?.to } : undefined,
    onDateSelect: handleDateSelect,
    onApplyDate: () => {
      closeCalendar();
      onOpenChange(false);
    },
  };

  return (
    <div className={cn("relative", className)}>
      {render({ trigger, calendarProps })}
    </div>
  );
};

export default DateRangePickerMobile;
