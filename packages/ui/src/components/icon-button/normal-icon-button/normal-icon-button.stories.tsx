import type { Meta, StoryFn } from "@storybook/react-vite";
import IcAddMemo from "@/assets/icons/ic_add_memo.svg?react";
import IcStarFull from "@/assets/icons/ic_star_full.svg?react";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import { IconButton } from "./index";

export default {
  title: "Components/IconButton/Normal",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "버튼 사이즈",
      defaultValue: "lg",
    },
  },
} as Meta<typeof IconButton>;

export const Interactive: StoryFn<typeof IconButton> = (args) => {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <IconButton {...args}>
        <IcVariant key="variant" />
      </IconButton>
      <IconButton {...args}>
        <IcAddMemo key="memo" />
      </IconButton>
      <IconButton {...args}>
        <IcStarFull key="star" />
      </IconButton>
    </div>
  );
};

Interactive.args = {
  size: "lg",
};
