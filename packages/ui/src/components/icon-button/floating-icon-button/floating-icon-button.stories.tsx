import type { Meta, StoryFn } from "@storybook/react-vite";
import IcArrowRight from "@/assets/icons/ic_arrow_right.svg?react";
import IcVariant from "@/assets/icons/ic_variant.svg?react";

import { FloatingIconButton } from ".";

export default {
  title: "Components/IconButton/Floating",
  component: FloatingIconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof FloatingIconButton>;

export const Interactive: StoryFn<typeof FloatingIconButton> = (_args) => {
  return (
    <div className="relative h-[10rem] w-[13rem]">
      <FloatingIconButton className="top-2 left-0">
        <IcVariant />
      </FloatingIconButton>
      <FloatingIconButton className="top-2 right-0">
        <IcArrowRight />
      </FloatingIconButton>
    </div>
  );
};
