import type { Meta, StoryObj } from "@storybook/react-vite";
import type { BgColor } from "@/constant";
import Divider from "./divider";

const colorOptions: BgColor[] = [
  "bg-primary-100",
  "bg-primary-90",
  "bg-neutral-40",
  "bg-error-50",
  "bg-black",
  "bg-white",
];

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: colorOptions,
    },
    width: {
      control: "text",
    },
    height: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    color: "bg-neutral-40",
    width: "w-full",
    height: "h-[1px]",
    className: "rounded",
  },
};
