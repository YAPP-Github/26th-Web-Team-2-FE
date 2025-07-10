import type { Meta, StoryFn } from "@storybook/react-vite";
import { Button, type ButtonProps } from "./index";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["md", "lg"],
    },
    color: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    icon: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default: StoryFn<ButtonProps> = Template.bind({});
Default.args = {
  children: "메인 버튼",
  size: "lg",
  color: "primary",
  icon: false,
  disabled: false,
};

export const IconSecondary: StoryFn<ButtonProps> = Template.bind({});
IconSecondary.args = {
  children: "메인 버튼",
  size: "lg",
  color: "secondary",
  icon: true,
};

export const MediumButton: StoryFn<ButtonProps> = Template.bind({});
MediumButton.args = {
  children: "메인 버튼",
  size: "md",
  color: "primary",
  icon: false,
};
