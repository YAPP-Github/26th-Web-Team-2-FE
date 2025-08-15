"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import IcCalendar from "@/assets/icons/ic_calendar.svg?react";
import IcCaretDown from "@/assets/icons/ic_caret_down.svg?react";
import { cn } from "@/utils";
import { formatDate } from "@/utils/date";

export interface DateButtonProps
  extends Omit<ComponentProps<"button">, "value"> {
  value?: Date;
  placeholder?: string;
}

export const DateButton = forwardRef<HTMLButtonElement, DateButtonProps>(
  (
    {
      value,
      placeholder = "날짜 선택",
      disabled,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex h-[5.2rem] cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] border px-[1.2rem] py-[1.4rem] text-body1-semi16 transition-colors",
          "border-neutral-90 bg-white",
          "hover:border-neutral-80 hover:bg-neutral-98",
          "focus:border-neutral-80 focus:bg-neutral-95 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <IcCalendar width={24} height={24} className="text-neutral-50" />
        {value && <span className="text-neutral-30">{formatDate(value)}</span>}
        {!value && <span className="text-neutral-50">{placeholder}</span>}
        <IcCaretDown width={16} height={16} className="text-neutral-50" />
      </button>
    );
  },
);

DateButton.displayName = "DateButton";

export default DateButton;
