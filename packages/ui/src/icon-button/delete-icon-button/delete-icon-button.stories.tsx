import type { Meta, StoryFn } from "@storybook/react-vite";
import { IconButtonDelete } from "./index";

export default {
  title: "Components/IconButton/Delete",
  component: IconButtonDelete,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn = (args) => <IconButtonDelete {...args} />;

export const Default = Template.bind({});
Default.args = {};
