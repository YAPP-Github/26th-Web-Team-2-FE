import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import DateRangePicker, {
  type DateRangePickerProps,
  type DateRangeValue,
} from "./";

const meta: Meta<DateRangePickerProps> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[60rem]">
        <Story />
      </div>
    ),
  ],
};

// 기본 사용법
export const Default: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue>({});

  return (
    <div className="space-y-4">
      <DateRangePicker
        value={value}
        onChange={setValue}
        placeholder={{ from: "출발일 선택", to: "도착일 선택" }}
        render={({ from, to }) => (
          <div className="flex gap-4">
            <div>{from}</div>
            <div>{to}</div>
          </div>
        )}
      />

      <div className="rounded-lg bg-neutral-95 p-4 text-caption1-medi12 text-neutral-50">
        선택된 범위: {value.from?.toLocaleDateString("ko-KR")} ~{" "}
        {value.to?.toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
};

// 초기값이 있는 경우
export const WithInitialValue: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue>({
    from: new Date("2025-06-01"),
    to: new Date("2025-06-05"),
  });

  return (
    <DateRangePicker
      value={value}
      onChange={setValue}
      render={({ from, to }) => (
        <div className="flex gap-4">
          {from}
          {to}
        </div>
      )}
    />
  );
};

// 비활성화 상태
export const Disabled: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue>({
    from: new Date("2025-06-01"),
    to: new Date("2025-06-05"),
  });

  return (
    <DateRangePicker
      value={value}
      onChange={setValue}
      disabled={true}
      placeholder={{ from: "출발일", to: "도착일" }}
      render={({ from, to }) => (
        <div className="flex gap-4">
          {from}
          {to}
        </div>
      )}
    />
  );
};

export default meta;
