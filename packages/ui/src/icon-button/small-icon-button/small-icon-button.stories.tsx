import type { Meta, StoryFn } from "@storybook/react-vite";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import { IconButton } from "./index";

export default {
  title: "Components/IconButton/Small",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof IconButton>;

export const Interactive: StoryFn = () => {
  return (
    <IconButton>
      <IcVariant width="24px" height="24px" />
    </IconButton>
  );
};
