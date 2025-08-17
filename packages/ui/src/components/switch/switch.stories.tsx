import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Switch, { type SwitchProps } from ".";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isActive: {
      control: "boolean",
      description: "스위치의 현재 상태 (true=활성화, false=비활성화)",
    },
    onChange: {
      action: "changed",
      description: "스위치 상태가 변경될 때 실행되는 함수",
    },
    className: {
      control: "text",
      description: "추가적인 CSS 클래스",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args: SwitchProps) => {
    const [active, setActive] = useState(args.isActive);

    return (
      <Switch
        {...args}
        isActive={active}
        onChange={(checked) => {
          setActive(checked);
          args.onChange?.(checked);
        }}
      />
    );
  },
  args: {
    isActive: false,
  },
};
