import type { Meta, StoryFn } from "@storybook/react-vite";
import IcDelete from "@/assets/icons/ic_delete.svg?react";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcExit from "@/assets/icons/ic_exit.svg?react";
import IcInvite from "@/assets/icons/ic_invite.svg?react";
import ActionOption from ".";

const meta: Meta<typeof ActionOption.Menu> = {
  title: "Components/ActionOption",
  component: ActionOption.Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryFn<typeof ActionOption.Menu>;

export const Default: Story = (args) => (
  <ActionOption.Menu {...args}>
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
    <ActionOption.Option onClick={() => alert("나가기 클릭")} icon={<IcExit />}>
      나가기
    </ActionOption.Option>
    <ActionOption.Option
      onClick={() => alert("삭제하기 클릭")}
      icon={<IcDelete />}
    >
      삭제하기
    </ActionOption.Option>
  </ActionOption.Menu>
);

Default.args = {
  isOpen: true,
};
