import type { Meta, StoryObj } from "@storybook/react-vite";
import Confirm from "./index";

const meta = {
  title: "Components/Confirm",
  component: Confirm,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onCancel: { action: "canceled" },
    onConfirm: { action: "confirmed" },
  },
} satisfies Meta<typeof Confirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "삭제하시겠습니까?",
    description: "삭제한 내용은 복구할 수 없습니다.",
    cancelText: "취소",
    confirmText: "삭제",
  },
};
