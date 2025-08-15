"use client";

import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useOutsideClickEffect } from "react-simplikit";
import Calendar from "@/components/calendar";
import { DateButton } from "@/components/date-button";
import { useFloating } from "@/hooks/use-floating";

export type DateRangeValue = {
  from?: Date;
  to?: Date;
};

export type DateRangePickerRenderProps = {
  from: React.ReactNode;
  to: React.ReactNode;
};

export type DateRangePickerProps = {
  value?: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  render: (props: DateRangePickerRenderProps) => React.ReactNode;
  disabled?: boolean;
  placeholder?: { from: string; to: string };
};

export const DateRangePicker = ({
  value,
  onChange,
  render,
  disabled = false,
  placeholder = { from: "출발일 선택", to: "도착일 선택" },
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setRawActiveField] = useState<"from" | "to" | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeValue | undefined>(value);
  
  // activeField를 읽기 위한 getter
  const currentActiveField = activeField;

  const fromButtonRef = useRef<HTMLButtonElement>(null);
  const toButtonRef = useRef<HTMLButtonElement>(null);

  const { referenceRef, floatingRef, floatingStyles } = useFloating<
    HTMLButtonElement,
    HTMLDivElement
  >({
    offset: 8,
    enabled: isOpen,
  });

  // activeField 업데이트 시 reference도 함께 업데이트
  const setActiveField = (field: "from" | "to" | null) => {
    setRawActiveField(field);
    
    // reference 업데이트
    if (field === "from" && fromButtonRef.current) {
      referenceRef.current = fromButtonRef.current;
    } else if (field === "to" && toButtonRef.current) {
      referenceRef.current = toButtonRef.current;
    }
  };

  useOutsideClickEffect([fromButtonRef.current, toButtonRef.current, floatingRef.current], () => {
    setIsOpen(false);
    setActiveField(null);
  });

  // value prop이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setDateRange(value);
  }, [value]);

  const openCalendar = (field: "from" | "to") => {
    if (disabled) return;
    setActiveField(field);
    setIsOpen(true);
  };

  const closeCalendar = () => {
    setIsOpen(false);
    setActiveField(null);
  };

  const setFrom = (date: Date | undefined) => {
    const newRange = { ...dateRange, from: date };
    setDateRange(newRange);
    onChange?.(newRange);
  };

  const setTo = (date: Date | undefined) => {
    const newRange = { ...dateRange, to: date };
    setDateRange(newRange);
    onChange?.(newRange);
  };

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange) return;

    // 범위 선택 로직
    if (currentActiveField === "from") {
      if (selectedRange.from) {
        setFrom(selectedRange.from);
        // from 선택 후 to로 자동 전환
        if (!dateRange?.to || selectedRange.from > dateRange.to) {
          setActiveField("to");
        } else {
          closeCalendar();
        }
      }
    } else if (currentActiveField === "to") {
      if (selectedRange.to || selectedRange.from) {
        const toDate = selectedRange.to || selectedRange.from;
        setTo(toDate);
        closeCalendar();
      }
    }
  };

  const fromButton = (
    <DateButton
      ref={fromButtonRef}
      value={dateRange?.from}
      placeholder={placeholder.from}
      onClick={() => openCalendar("from")}
      disabled={disabled}
      className={currentActiveField === "from" ? "ring-2 ring-primary" : ""}
    />
  );

  const toButton = (
    <DateButton
      ref={toButtonRef}
      value={dateRange?.to}
      placeholder={placeholder.to}
      onClick={() => openCalendar("to")}
      disabled={disabled}
      className={currentActiveField === "to" ? "ring-2 ring-primary" : ""}
    />
  );

  const calendarElement = isOpen ? (
    <div ref={floatingRef} style={floatingStyles} className="z-50">
      <Calendar
        selectedDate={
          dateRange?.from
            ? { from: dateRange.from, to: dateRange.to }
            : undefined
        }
        onDateSelect={handleDateSelect}
        onApplyDate={closeCalendar}
      />
    </div>
  ) : null;

  return (
    <div>
      {render({
        from: fromButton,
        to: toButton,
      })}
      {calendarElement}
    </div>
  );
};

export default DateRangePicker;
