import type { Meta, StoryFn } from "@storybook/react-vite";
import { SolidExpand } from "./index";

export default {
  title: "Components/IconButton/SolidExpand",
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

export const AllStates: StoryFn = () => (
  <div className="flex gap-10">
    <SolidExpand expand={false} />
    <SolidExpand expand={true} />
  </div>
);
