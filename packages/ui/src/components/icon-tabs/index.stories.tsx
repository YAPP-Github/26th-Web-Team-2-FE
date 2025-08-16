import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import IcCar from "@/assets/icons/ic_car.svg?react";
import IcKm from "@/assets/icons/ic_km.svg?react";
import IcWalker from "@/assets/icons/ic_walker.svg?react";
import IconTabs, { type IconTabsProps } from "./index";

const meta: Meta<typeof IconTabs> = {
  title: "Components/IconTabs",
  component: IconTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "select" },
      options: ["car", "walk", "km"],
    },
    onChange: { action: "changed" },
  },
};

type TransportationType = "car" | "walk" | "km";

const options: IconTabsProps<TransportationType>["options"] = [
  {
    value: "car",
    icon: <IcCar />,
  },
  {
    value: "walk",
    icon: <IcWalker />,
  },
  {
    value: "km",
    icon: <IcKm />,
  },
];

const Template: StoryFn<IconTabsProps<TransportationType>> = (args) => {
  const [value, setValue] = useState<TransportationType>(args.value);

  return (
    <IconTabs
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange(newValue);
      }}
      options={options}
    />
  );
};

export const Default: StoryFn<IconTabsProps<TransportationType>> =
  Template.bind({});
Default.args = {
  value: "car",
};

export const WalkSelected: StoryFn<IconTabsProps<TransportationType>> =
  Template.bind({});
WalkSelected.args = {
  value: "walk",
};

export const KmSelected: StoryFn<IconTabsProps<TransportationType>> =
  Template.bind({});
KmSelected.args = {
  value: "km",
};

export default meta;
