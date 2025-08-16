import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadingIndicator from ".";

const meta: Meta<typeof LoadingIndicator> = {
  title: "Components/LoadingIndicator",
  component: LoadingIndicator,
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  render: () => <LoadingIndicator active={true} />,
};
