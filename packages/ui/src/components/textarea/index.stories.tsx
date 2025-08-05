import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { Textarea, type TextareaProps } from "@/components/textarea";

const meta: Meta<TextareaProps> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    hasError: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    value: {
      control: "text",
    },
    maxLength: {
      control: "number",
    },
    minRows: {
      control: "number",
    },
    maxRows: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[35.9rem]">
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<TextareaProps> = (args) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: StoryFn<TextareaProps> = Template.bind({});
Default.args = {
  placeholder: "텍스트를 입력해 주세요.",
};

export const WithMaxLength: StoryFn<TextareaProps> = Template.bind({});
WithMaxLength.args = {
  placeholder: "최대 100자까지 입력할 수 있습니다.",
  maxLength: 100,
};

export const WithError: StoryFn<TextareaProps> = Template.bind({});
WithError.args = {
  value: "오류가 있는 텍스트입니다.",
  hasError: true,
};

export const WithDisabled: StoryFn<TextareaProps> = Template.bind({});
WithDisabled.args = {
  value: "비활성화된 상태입니다.",
  disabled: true,
};

export default meta;
