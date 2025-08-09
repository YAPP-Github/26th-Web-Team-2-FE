import type { Meta, StoryObj } from "@storybook/react-vite";
import Calendar from ".";
import "react-day-picker/dist/style.css"; // react-day-picker 기본 스타일

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => <Calendar />,
};
