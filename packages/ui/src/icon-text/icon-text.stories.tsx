import type { Meta, StoryObj } from "@storybook/react-vite";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import { textColorOptions, typoOptions } from "@/constant";
import IconText from ".";

const meta: Meta<typeof IconText> = {
  title: "Components/Text",
  component: IconText,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: typoOptions,
    },
    typo: {
      control: "select",
      options: textColorOptions,
    },
    gap: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconText>;

export const Default: Story = {
  args: {
    text: "주소 주소 주소 주소 주소 주소 주소 주소 주소 주소 주소 ",
    color: "text-neutral-40",
    typo: "text-caption1-medi12",
    icon: <IcLocation />,
    gap: "8px",
  },
};
