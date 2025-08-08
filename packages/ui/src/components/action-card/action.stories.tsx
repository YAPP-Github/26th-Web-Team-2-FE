import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionCard } from ".";

const meta: Meta<typeof ActionCard> = {
  title: "Components/ActionCard",
  component: ActionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "384px",
          height: "242px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ActionCard>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
