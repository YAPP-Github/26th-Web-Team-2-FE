import type { Meta, StoryFn } from "@storybook/react-vite";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import { Button, type ButtonProps } from "./index";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      if: { arg: "variant", neq: "round" },
    },
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "text"],
    },
    icon: {
      control: false,
    },

    disabled: {
      control: { type: "boolean" },
    },
    additionalText: {
      control: { type: "text" },
      description: "추가적인 텍스트를 버튼에 추가합니다.",
      if: { arg: "variant", neq: "round" },
    },
    selected: {
      control: { type: "boolean" },
      if: { arg: "variant", eq: "round" },
    },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default: StoryFn<ButtonProps> = Template.bind({});
Default.args = {
  children: "메인 버튼",
  size: "lg",
  variant: "primary",
  disabled: false,
  icon: <IcVariant width="20px" height="20px" role="img" />,
};

export const IconSecondary: StoryFn<ButtonProps> = Template.bind({});
IconSecondary.args = {
  children: "메인 버튼",
  size: "lg",
  variant: "secondary",
  icon: <IcVariant width="20px" height="20px" role="img" />,
};

export const MediumButton: StoryFn<ButtonProps> = Template.bind({});
MediumButton.args = {
  children: "메인 버튼",
  size: "md",
  variant: "primary",
};

export const AdditionalTextButton: StoryFn<ButtonProps> = Template.bind({});
AdditionalTextButton.args = {
  children: "메인 버튼",
  size: "lg",
  variant: "primary",
  additionalText: "메인 버튼",
};

export const StickyButton: StoryFn<ButtonProps> = Template.bind({});
StickyButton.args = {
  children: "메인 버튼",
  size: "sticky",
  variant: "primary",
};

export const RoundButton: StoryFn<ButtonProps> = Template.bind({});
RoundButton.args = {
  children: "메인 버튼",
  variant: "round",
  selected: false,
};

export const TextButton: StoryFn<ButtonProps> = Template.bind({});
TextButton.args = {
  children: "메인 버튼",
  size: "lg",
  variant: "text",
};
