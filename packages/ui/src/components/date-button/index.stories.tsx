import type { Meta, StoryFn } from "@storybook/react-vite";
import { DateButton, type DateButtonProps } from "./";

const meta: Meta<DateButtonProps> = {
  title: "Components/DateButton",
  component: DateButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    value: {
      control: false,
      description: "Date object",
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

const Template: StoryFn<DateButtonProps> = (args) => {
  return (
    <div className="space-y-4">
      <DateButton {...args} />
    </div>
  );
};

export const Empty: StoryFn<DateButtonProps> = Template.bind({});
Empty.args = {
  placeholder: "출발일 선택",
};

export const WithValue: StoryFn<DateButtonProps> = Template.bind({});
WithValue.args = {
  value: new Date("2025-06-01"),
};

export default meta;
