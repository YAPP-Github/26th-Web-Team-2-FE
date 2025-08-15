import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import {
  DateRangePicker,
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
  const [value, setValue] = useState<DateRangeValue | undefined>();

  return (
    <div className="space-y-4">
      <DateRangePicker
        value={value}
        onChange={setValue}
        placeholder={{ from: "출발일 선택", to: "도착일 선택" }}
        render={({ from, to }) => (
          <div className="flex gap-4">
            <div>
              <label className="mb-2 block text-body2-medi14 text-neutral-30">
                출발일
              </label>
              {from}
            </div>
            <div>
              <label className="mb-2 block text-body2-medi14 text-neutral-30">
                도착일
              </label>
              {to}
            </div>
          </div>
        )}
      />

      <div className="rounded-lg bg-neutral-95 p-4 text-caption1-medi12 text-neutral-50">
        선택된 범위: {value?.from?.toLocaleDateString("ko-KR")} ~{" "}
        {value?.to?.toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
};

// 인라인 레이아웃
export const InlineLayout: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue | undefined>();

  return (
    <DateRangePicker
      value={value}
      onChange={setValue}
      placeholder={{ from: "Check-in", to: "Check-out" }}
      render={({ from, to }) => (
        <div className="flex items-center gap-4">
          {from}
          <span className="text-neutral-60">~</span>
          {to}
        </div>
      )}
    />
  );
};

// 세로 배치
export const VerticalLayout: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue | undefined>();

  return (
    <DateRangePicker
      value={value}
      onChange={setValue}
      render={({ from, to }) => (
        <div className="space-y-4">
          {from}
          {to}
        </div>
      )}
    />
  );
};

// 초기값이 있는 경우
export const WithInitialValue: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue | undefined>({
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

// 여행 기간 계산 예제
export const TravelDuration: StoryFn = () => {
  const [value, setValue] = useState<DateRangeValue | undefined>();

  const calculateDays = () => {
    if (!value?.from || !value?.to) return 0;
    return Math.ceil(
      (value.to.getTime() - value.from.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="space-y-4">
      <DateRangePicker
        value={value}
        onChange={setValue}
        placeholder={{ from: "체크인", to: "체크아웃" }}
        render={({ from, to }) => (
          <div className="rounded-lg bg-gradient-to-r from-primary-95 to-secondary-95 p-6">
            <h3 className="mb-4 text-heading2-semi18 text-neutral-20">
              여행 날짜를 선택하세요
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 text-caption1-semi12 text-neutral-50">
                  CHECK-IN
                </div>
                {from}
              </div>
              <div className="flex-1">
                <div className="mb-2 text-caption1-semi12 text-neutral-50">
                  CHECK-OUT
                </div>
                {to}
              </div>
            </div>
          </div>
        )}
      />

      {value?.from && value?.to && (
        <div className="rounded-lg bg-neutral-95 p-4 text-center">
          <div className="text-body1-semi16 text-neutral-30">
            총 {calculateDays()}박 {calculateDays() + 1}일
          </div>
          <div className="mt-1 text-caption1-medi12 text-neutral-60">
            {value.from.toLocaleDateString("ko-KR")} ~ {value.to.toLocaleDateString("ko-KR")}
          </div>
        </div>
      )}
    </div>
  );
};

// 다양한 placeholder 예제
export const PlaceholderVariations: StoryFn = () => {
  const [value1, setValue1] = useState<DateRangeValue | undefined>();
  const [value2, setValue2] = useState<DateRangeValue | undefined>();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-heading2-semi18">한국어 placeholder</h3>
        <DateRangePicker
          value={value1}
          onChange={setValue1}
          placeholder={{ from: "체크인", to: "체크아웃" }}
          render={({ from, to }) => (
            <div className="flex gap-4">
              {from}
              {to}
            </div>
          )}
        />
      </div>

      <div>
        <h3 className="mb-4 text-heading2-semi18">영어 placeholder</h3>
        <DateRangePicker
          value={value2}
          onChange={setValue2}
          placeholder={{ from: "Check-in", to: "Check-out" }}
          render={({ from, to }) => (
            <div className="flex gap-4">
              {from}
              {to}
            </div>
          )}
        />
      </div>
    </div>
  );
};


export default meta;
