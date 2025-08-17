import type { Meta, StoryFn } from "@storybook/react-vite";
import DeleteIconButton from "./index";

export default {
  title: "Components/IconButton/Solid/Delete",
  component: DeleteIconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn = (args) => <DeleteIconButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
