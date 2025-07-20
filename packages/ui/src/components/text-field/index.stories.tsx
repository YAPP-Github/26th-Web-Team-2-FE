import type { Meta, StoryFn } from "@storybook/react-vite";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import { TextField, type TextFieldProps } from "@/components/text-field";

const meta: Meta<TextFieldProps> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
    },
    endIcon: {
      control: false,
    },
    hasError: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    value: {
      control: "text",
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

const Template: StoryFn<TextFieldProps> = (args) => <TextField {...args} />;

export const Default: StoryFn<TextFieldProps> = Template.bind({});
Default.args = {
  placeholder: "호텔 상세 페이지 링크를 입력해 주세요.",
  icon: <IcLink width={24} height={24} />,
};

export const WithError: StoryFn<TextFieldProps> = Template.bind({});
WithError.args = {
  value: "airbnb.com/",
  endIcon: <IcAlert width={24} height={24} />,
  hasError: true,
};

export default meta;
