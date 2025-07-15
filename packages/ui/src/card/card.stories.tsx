import type { Meta, StoryFn } from "@storybook/react-vite";
import { Card, type CardProps } from ".";

export default {
  title: "Components/Card",
  tags: ["autodocs"],
  component: Card,
  argTypes: {
    selected: {
      control: { type: "boolean" },
    },
  },
} as Meta<CardProps>;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default: StoryFn<CardProps> = Template.bind({});
Default.args = {
  children: "메인 버튼",
};
