import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { SolidExpand } from "./index";

export default {
  title: "Components/IconButton/Solid/SolidExpand",
  component: SolidExpand,
  tags: ["autodocs"],
  argTypes: {
    expand: {
      control: { type: "boolean" },
      description: "확장 여부 (true일 경우 확장된 상태)",
    },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof SolidExpand>;

const Template: StoryFn<typeof SolidExpand> = (args) => (
  <SolidExpand {...args} />
);

export const Default = Template.bind({});
Default.args = {
  expand: false,
};

export const PressAndHold: StoryFn = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg text-neutral-70">
        버튼을 누르고 있으면 확장됩니다. 떼면 축소됩니다.{" "}
      </p>
      <SolidExpand
        expand={isExpanded}
        onMouseDown={() => setIsExpanded(true)}
        onMouseUp={() => setIsExpanded(false)}
        onMouseLeave={() => setIsExpanded(false)}
      />
    </div>
  );
};
