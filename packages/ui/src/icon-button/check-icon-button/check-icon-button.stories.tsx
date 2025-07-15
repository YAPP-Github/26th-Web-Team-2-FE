import type { Meta, StoryFn } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { CheckIconButton } from "./index";

export default {
  title: "Components/IconButton/Solid/Check",
  component: CheckIconButton,
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: { type: "boolean" },
      description: "선택된 상태일 경우 체크 아이콘이 나타납니다.",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
      description: "버튼의 사이즈",
    },
    onClick: { action: "clicked" },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof CheckIconButton>;

const Template: StoryFn<typeof CheckIconButton> = (args) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(args.selected ?? false);
  }, [args.selected]);

  return (
    <CheckIconButton
      {...args}
      selected={selected}
      onClick={() => {
        setSelected((prev) => !prev);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  selected: false,
  size: "md",
};
