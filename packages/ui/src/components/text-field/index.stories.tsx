import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
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
    maxLength: {
      control: "number",
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

const Template: StoryFn<TextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

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

export const WithMaxLength: StoryFn<TextFieldProps> = Template.bind({});
WithMaxLength.args = {
  placeholder: "국가 혹은 도시를 입력해주세요.",
  maxLength: 20,
  value: "서울",
};

export const WithMaxLengthAndIcon: StoryFn<TextFieldProps> = Template.bind({});
WithMaxLengthAndIcon.args = {
  placeholder: "호텔명을 입력해주세요.",
  maxLength: 30,
  value: "그랜드 하얏트 서울",
  icon: <IcLink width={24} height={24} />,
};

export const WithMaxLengthAndEndIcon: StoryFn<TextFieldProps> = Template.bind(
  {},
);
WithMaxLengthAndEndIcon.args = {
  placeholder: "링크를 입력해주세요.",
  maxLength: 20,
  value: "https://example.com/foo/foo/foo/foo/foo/foo/foo/foo",
};

export default meta;
