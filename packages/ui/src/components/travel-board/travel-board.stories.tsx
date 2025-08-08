import type { Meta, StoryObj } from "@storybook/react-vite";
import { TravelBoard } from ".";

const meta: Meta<typeof TravelBoard> = {
  title: "Components/TravelBoard",
  component: TravelBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "384px",
          height: "242px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TravelBoard>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
