import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Button from "@/components/button";
import BottomSheet from ".";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
      description: "바텀시트 표시 여부",
    },
    showBackdrop: {
      control: "boolean",
      description: "배경 어둡게 표시 여부",
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "배경 터치 시 닫기 여부",
    },
    onClose: {
      action: "closed",
      description: "바텀시트 닫을 때 호출되는 콜백",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center p-[2.4rem]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);

    return (
      <>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => setActive(true)}
        >
          바텀시트 열기
        </Button>
        <BottomSheet
          {...args}
          active={active}
          onClose={() => {
            setActive(false);
            args.onClose?.();
          }}
        >
          <BottomSheet.Header title="바텀시트" />
          <BottomSheet.Body>
            <p className="text-body1-regular16 text-neutral-30">
              Header에는 제목과 닫기 버튼을 배치할 수 있습니다.
            </p>
            <p className="text-body1-regular16 text-neutral-30">
              Body 영역에는 폼 필드나 설명 텍스트 등 다양한 콘텐츠를 넣을 수
              있습니다.
            </p>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <Button
              variant="primary"
              size="lg"
              className="flex w-full items-center"
            >
              확인
            </Button>
          </BottomSheet.Footer>
        </BottomSheet>
      </>
    );
  },
  args: {
    showBackdrop: true,
    closeOnBackdropClick: true,
  },
};
