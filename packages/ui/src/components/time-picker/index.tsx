import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, type KeyboardEvent, useState } from "react";
import { useOutsideClickEffect } from "react-simplikit";
import IcCaretDown from "@/assets/icons/ic_caret_down.svg?react";
import IcClock from "@/assets/icons/ic_clock.svg?react";
import { Button, type ButtonProps } from "@/components/button";
import { useFloating } from "@/hooks/use-floating";
import { cn } from "@/utils";
import { formatTime, getCurrentTimeRounded } from "@/utils/date";

export interface TimePickerProps
  extends Omit<ComponentProps<"div">, "onChange">,
    VariantProps<typeof variants> {
  value: string | null; // "HH:MM"
  onChange: (time: string) => void; // "HH:MM"
  disabled?: boolean;
}

const variants = cva(
  [
    "relative flex w-[11.7rem] items-center justify-between rounded-[0.8rem] p-[0.8rem]",
    "border border-neutral-90 bg-white text-body1-semi16 text-neutral-30",
    "disabled:w-full disabled:border-transparent disabled:bg-transparent disabled:p-0",
    "not-disabled:cursor-pointer transition-all duration-200",
  ],
  {
    variants: {
      active: {
        true: "border-neutral-80 bg-neutral-90",
        false: "border-neutral-90 hover:border-neutral-80",
      },
      empty: { true: "", false: "" },
    },
    defaultVariants: {
      active: false,
      empty: false,
    },
    compoundVariants: [
      { active: true, empty: true, className: "text-neutral-70" },
      { active: false, empty: true, className: "text-neutral-80" },
    ],
  },
);

export const TimePicker = ({
  value,
  onChange,
  disabled,
  className,
  ...props
}: TimePickerProps) => {
  const [active, setActive] = useState(false);

  const { referenceRef, floatingRef, floatingStyles } = useFloating<
    HTMLButtonElement,
    HTMLDivElement
  >({ offset: 8, enabled: active });

  useOutsideClickEffect([referenceRef.current, floatingRef.current], () => {
    setActive(false);
  });

  const empty = value === null;
  const displayValue = value ?? "00:00"; // 기본값
  const { meridiem, time, hours, minutes } = formatTime(displayValue);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!disabled && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setActive(!active);
    } else if (e.key === "Escape" && active) {
      setActive(false);
    }
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => !disabled && setActive(!active)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(variants({ active, empty }))}
        ref={referenceRef}
      >
        <div className="flex items-center gap-[0.8rem]">
          <span>{meridiem}</span>
          <span>{time}</span>
        </div>
        {disabled && (
          <IcClock width="20" height="20" className="text-neutral-60" />
        )}
        {!disabled && (
          <IcCaretDown
            width="16"
            height="16"
            className={cn(
              "text-neutral-30 transition-transform",
              active && "rotate-180 text-neutral-80",
            )}
          />
        )}
      </button>

      {active && !disabled && (
        <div
          ref={floatingRef}
          style={floatingStyles}
          className="flex h-[32.4rem] w-[19.6rem] flex-col rounded-[1.2rem] border border-neutral-90 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.04)]"
        >
          {/* 시간 선택 영역 */}
          <div className="flex min-h-0 flex-1">
            {/* 오전/오후 컬럼 */}
            <div className="flex flex-1 flex-col items-center gap-[0.4rem] py-[0.8rem] pl-[0.8rem]">
              {["오전", "오후"].map((label) => (
                <SelectionButton
                  key={label}
                  selected={meridiem === label}
                  round="left"
                  onClick={() => {
                    if (value === null) {
                      onChange(getCurrentTimeRounded());
                    } else {
                      const newHour = (hours + 12) % 24;
                      const newTime = `${String(newHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                      onChange(newTime);
                    }
                  }}
                >
                  {label}
                </SelectionButton>
              ))}
            </div>

            {/* 시간 컬럼 */}
            <div className="scrollbar-hide flex flex-1 flex-col items-center gap-[0.4rem] overflow-y-scroll py-[0.8rem]">
              {Array.from({ length: 12 }, (_, i) => {
                const displayHour = i === 0 ? 12 : i;
                const actualHour = meridiem === "오전" ? i : i + 12;
                return (
                  <SelectionButton
                    key={displayHour}
                    selected={hours === actualHour}
                    onClick={() => {
                      const newTime = `${String(actualHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                      onChange(newTime);
                    }}
                  >
                    {displayHour}
                  </SelectionButton>
                );
              })}
            </div>

            {/* 분 컬럼 */}
            <div className="scrollbar-hide flex flex-1 flex-col items-center gap-[0.4rem] overflow-y-scroll py-[0.8rem] pr-[0.8rem]">
              {Array.from({ length: 12 }, (_, i) => {
                const minute = i * 5;

                return (
                  <SelectionButton
                    key={minute}
                    selected={minutes === minute}
                    round="right"
                    onClick={() => {
                      const newTime = `${String(hours).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
                      onChange(newTime);
                    }}
                  >
                    {minute.toString().padStart(2, "0")}
                  </SelectionButton>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between px-[1.2rem] py-[1rem]">
            <ActionButton
              onClick={() => {
                onChange(getCurrentTimeRounded());
                setActive(false);
              }}
              className="text-neutral-70 hover:bg-neutral-95"
            >
              현재
            </ActionButton>
            <ActionButton
              onClick={() => setActive(false)}
              className="text-primary hover:bg-primary-98 hover:text-primary-50"
            >
              적용
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionButton = ({
  children,
  className,
  ...props
}: Omit<ButtonProps, "variant" | "size" | "selected">) => {
  return (
    <Button
      variant="text"
      size="xs"
      className={cn("rounded-[0.8rem] px-[0.65rem] py-[0.3rem]", className)}
      {...props}
    >
      {children}
    </Button>
  );
};

interface SelectionButtonProps extends ComponentProps<"button"> {
  selected?: boolean;
  round?: "left" | "right" | "none";
}

const SelectionButton = ({
  selected,
  round = "none",
  children,
  className,
  ...props
}: SelectionButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[4rem] w-full cursor-pointer items-center justify-center p-[0.8rem] text-body1-medi16 transition-colors",
        selected
          ? "bg-primary/[0.08] text-neutral-10"
          : "text-neutral-60 hover:bg-neutral-98",
        round === "left" && "rounded-l-[0.8rem]",
        round === "right" && "rounded-r-[0.8rem]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
