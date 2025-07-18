import type { Meta, StoryFn } from "@storybook/react-vite";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import { Chip, type ChipProps } from "./index";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["xs", "md"],
    },
    text: {
      control: "text",
    },
    additionalText: {
      control: "text",
    },
    icon: {
      control: "boolean",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

const Template: StoryFn<ChipProps> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "텍스트",
  size: "xs",
  additionalText: "텍스트",
  icon: <IcVariant />,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: "텍스트",
  size: "md",
  icon: <IcVariant />,
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: "텍스트",
  size: "md",
};
