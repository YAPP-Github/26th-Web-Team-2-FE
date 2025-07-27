import type { ReactElement } from "react";
import { cn } from "@/utils";

export interface IconTabsOption<T extends string> {
  value: T;
  icon: ReactElement;
}

export interface IconTabsProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: IconTabsOption<T>[];
  className?: string;
}

export const IconTabs = <T extends string>({
  value,
  onChange,
  options,
  className,
}: IconTabsProps<T>) => {
  const index = options.findIndex((opt) => opt.value === value);

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-[0.4rem] p-[0.25rem]",
        "rounded-full bg-neutral-90",
        className,
      )}
    >
      <div
        className={cn(
          "absolute top-[0.25rem] left-[0.25rem] h-[2.4rem] w-[2.4rem] rounded-full",
          "bg-white transition-all duration-300 ease-out",
        )}
        style={{ left: `${index * 2.8 + 0.25}rem` }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            "relative z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center p-0",
            "rounded-full border-none bg-transparent text-neutral-60 outline-none",
            "cursor-pointer",
            "rounded-full transition-all duration-200",
          )}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};
