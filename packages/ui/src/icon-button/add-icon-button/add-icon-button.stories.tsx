import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { IconButtonAdd } from ".";

export default {
  title: "Components/IconButton/Add",
  component: IconButtonAdd,
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: { type: "boolean" },
      description: "아이콘 버튼 클릭 여부",
    },
    onClick: { action: "clicked" },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof IconButtonAdd>;

export const Interactive: StoryFn = () => {
  const [selected, setSelected] = useState(false);

  return (
    <IconButtonAdd
      selected={selected}
      onClick={() => setSelected((prev) => !prev)}
    />
  );
};
