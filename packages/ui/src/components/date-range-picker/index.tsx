"use client";

import { useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useOutsideClickEffect } from "react-simplikit";
import Calendar from "@/components/calendar";
import DateButton from "@/components/date-button";
import useFloating from "@/hooks/use-floating";
import { cn } from "@/utils";

export interface DateRangeValue {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerRenderProps {
  from: React.ReactNode;
  to: React.ReactNode;
}

export interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (range: DateRangeValue) => void;
  render: (props: DateRangePickerRenderProps) => React.ReactNode;
  disabled?: boolean;
  placeholder?: { from: string; to: string };
  className?: string;
}

const DateRangePicker = ({
  value,
  onChange,
  render,
  disabled = false,
  placeholder = { from: "출발일 선택", to: "도착일 선택" },
  className,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [activeField, setRawActiveField] = useState<"from" | "to" | null>(null);

  const refs = {
    from: useRef<HTMLButtonElement>(null),
    to: useRef<HTMLButtonElement>(null),
  };

  const { referenceRef, floatingRef, floatingStyles, refresh } = useFloating<
    HTMLButtonElement,
    HTMLDivElement
  >({ offset: 8, enabled: open });

  const setActiveField = (field: "from" | "to" | null) => {
    setRawActiveField(field);

    // reference 업데이트
    if (field === "from" && refs.from.current) {
      referenceRef.current = refs.from.current;
    } else if (field === "to" && refs.to.current) {
      referenceRef.current = refs.to.current;
    }

    refresh();
    referenceRef.current?.focus();
  };

  useOutsideClickEffect(
    [refs.from.current, refs.to.current, floatingRef.current],
    () => {
      setOpen(false);
      setActiveField(null);
    },
  );

  const openCalendar = (field: "from" | "to") => {
    if (disabled) {
      return;
    }
    setActiveField(field);
    setOpen(true);
  };

  const closeCalendar = () => {
    setOpen(false);
    setActiveField(null);
  };

  const setFrom = (date: Date | undefined) => {
    onChange({ ...value, from: date });
  };

  const setTo = (date: Date | undefined) => {
    onChange({ ...value, to: date });
  };

  const handleDateSelect = (selected: DateRange | undefined) => {
    if (!selected) {
      return;
    }
    const { from: selectedFrom, to: selectedTo } = selected;
    const { from: currentFrom, to: currentTo } = value || {};

    // 여행 시작일 handler
    if (activeField === "from") {
      // 시작일이 to로 들어간 경우 (기존 from 이 존재하는 경우)
      const isSameFrom = currentFrom?.getTime() === selectedFrom?.getTime();

      if (isSameFrom) {
        const shouldResetTo = selectedTo && currentTo && selectedTo > currentTo;

        if (shouldResetTo) onChange({ from: selectedTo, to: selectedTo });
        else setFrom(selectedTo ?? currentTo);
      } else if (selectedFrom) {
        // 시작일이 from 으로 들어간 경우
        onChange({ from: selectedFrom, to: selectedFrom });
      }

      setActiveField("to");
      return;
    }
    // 여행 종료일 handler
    if (activeField === "to") {
      if (selected.to || selected.from) {
        setTo(selected.to || selected.from);
      }
    }
  };

  return (
    <div className={cn("relative", className)}>
      {render({
        from: (
          <DateButton
            ref={refs.from}
            value={value?.from}
            placeholder={placeholder.from}
            onClick={() => openCalendar("from")}
            disabled={disabled}
          />
        ),
        to: (
          <DateButton
            ref={refs.to}
            value={value?.to}
            placeholder={placeholder.to}
            onClick={() => openCalendar("to")}
            disabled={disabled}
          />
        ),
      })}
      {open && (
        <div ref={floatingRef} style={floatingStyles} className="w-fit">
          <Calendar
            selectedDate={
              value ? { from: value?.from, to: value?.to } : undefined
            }
            onDateSelect={handleDateSelect}
            onApplyDate={closeCalendar}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
