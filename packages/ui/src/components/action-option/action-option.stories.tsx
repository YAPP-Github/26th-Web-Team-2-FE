import type { Meta, StoryFn } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { useOutsideClickEffect } from "react-simplikit";
import IcDelete from "@/assets/icons/ic_delete.svg?react";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcExit from "@/assets/icons/ic_exit.svg?react";
import IcInvite from "@/assets/icons/ic_invite.svg?react";
import IcMore from "@/assets/icons/ic_more.svg?react";
import ActionOption from ".";

const meta: Meta<typeof ActionOption.Menu> = {
  title: "Components/ActionOption",
  component: ActionOption.Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative h-[30rem] w-[20rem]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryFn<typeof ActionOption.Menu>;

export const Default: Story = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownWrapperRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickEffect(dropdownWrapperRef.current, () => {
    setIsOpen(false);
  });

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative" ref={dropdownWrapperRef}>
      <button
        type="button"
        onClick={handleDropdownToggle}
        className="rounded-[1.2rem] p-[0.8rem] hover:bg-neutral-98 focus:bg-neutral-95"
      >
        <IcMore width={32} height={32} className="text-neutral-50" />
      </button>
      {/* 드롭다운 */}
      <ActionOption.Menu {...args} isOpen={isOpen}>
        <ActionOption.Option
          onClick={() => alert("초대하기 클릭")}
          icon={<IcInvite />}
        >
          멤버 초대하기
        </ActionOption.Option>
        <ActionOption.Option
          onClick={() => alert("수정하기 클릭")}
          icon={<IcEdit />}
        >
          수정하기
        </ActionOption.Option>
        <ActionOption.Option
          onClick={() => alert("나가기 클릭")}
          icon={<IcExit />}
        >
          나가기
        </ActionOption.Option>
        <ActionOption.Option
          onClick={() => alert("삭제하기 클릭")}
          icon={<IcDelete />}
        >
          삭제하기
        </ActionOption.Option>
      </ActionOption.Menu>
    </div>
  );
};
