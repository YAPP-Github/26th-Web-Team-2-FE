import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "@/components/button";
import Popup from "./index";

const meta: Meta<typeof Popup> = {
  title: "Components/Popup",
  component: Popup,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex h-[60rem] w-[60rem] items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log("Close clicked"),
    className: "w-full max-w-[40rem]",
    children: (
      <div className="flex flex-col gap-[2.4rem]">
        <p className="text-body1-regular16 text-neutral-30">
          팝업 타이틀이 없는 팝업입니다.
        </p>
        <Button
          variant="primary"
          size="lg"
          className="flex w-full justify-center"
        >
          확인
        </Button>
      </div>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: "타이틀",
    onClose: () => console.log("Close clicked"),
    className: "w-full max-w-[40rem]",
    children: (
      <div className="flex flex-col gap-[2.4rem]">
        <p className="text-body1-regular16 text-neutral-30">
          팝업 타이틀이 있는 팝업입니다.
        </p>
        <Button
          variant="primary"
          size="lg"
          className="flex w-full justify-center"
        >
          확인
        </Button>
      </div>
    ),
  },
};
