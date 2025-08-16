import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import TimePicker, { type TimePickerProps } from "@/components/time-picker";

const meta: Meta<TimePickerProps> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    value: {
      control: "text",
      description: "Time in HH:MM format (24-hour)",
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[25rem]">
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<TimePickerProps> = (args) => {
  const [value, setValue] = useState<string | null>(args.value || null);

  return (
    <TimePicker
      {...args}
      value={value}
      onChange={(time) => {
        setValue(time);
        console.log("Selected time:", time);
      }}
    />
  );
};

// Empty 상태 (기본)
export const Empty: StoryFn<TimePickerProps> = Template.bind({});
Empty.args = {
  value: null,
};

// Default 상태 (값 있음)
export const Default: StoryFn<TimePickerProps> = Template.bind({});
Default.args = {
  value: "15:30", // 오후 3:30
};

// Disabled 상태들
export const Disabled: StoryFn<TimePickerProps> = Template.bind({});
Disabled.args = {
  value: "09:00", // 오전 9:00
  disabled: true,
};

export const DisabledEmpty: StoryFn<TimePickerProps> = Template.bind({});
DisabledEmpty.args = {
  value: null,
  disabled: true,
};

// Active 상태 시연용 (자동으로 열림)
export const ActiveDemo: StoryFn<TimePickerProps> = () => {
  const [value, setValue] = useState("14:30");

  return (
    <div className="h-[40rem]">
      <TimePicker
        value={value}
        onChange={(time) => {
          setValue(time);
          console.log("Selected time:", time);
        }}
      />
      <p className="mt-4 text-caption1-medi12 text-neutral-60">
        Active 상태: 드롭다운이 열려있을 때의 모습입니다
      </p>
    </div>
  );
};

// Viewport 충돌 테스트용 스토리
export const ViewportCollisionTest: StoryFn<TimePickerProps> = () => {
  const [value, setValue] = useState("12:00");

  return (
    <div className="flex h-[200vh] flex-col justify-between p-8">
      <div>
        <h3 className="mb-4 font-semibold text-lg">상단 (아래로 열림)</h3>
        <TimePicker value={value} onChange={setValue} />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg">
          중간 (스크롤 위치에 따라 다름)
        </h3>
        <TimePicker value={value} onChange={setValue} />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg">하단 (위로 열림)</h3>
        <TimePicker value={value} onChange={setValue} />
      </div>
    </div>
  );
};
ViewportCollisionTest.parameters = {
  layout: "fullscreen",
};

export default meta;
