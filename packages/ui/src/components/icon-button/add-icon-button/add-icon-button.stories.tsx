import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import AddIconButton from ".";

export default {
  title: "Components/IconButton/Solid/Add",
  component: AddIconButton,
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
} as Meta<typeof AddIconButton>;

export const Interactive: StoryFn = () => {
  const [selected, setSelected] = useState(false);

  return (
    <AddIconButton
      selected={selected}
      onClick={() => setSelected((prev) => !prev)}
    />
  );
};
