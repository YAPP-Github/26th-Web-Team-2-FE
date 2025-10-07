import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import IcStarFull from "@/assets/icons/ic_star_full.svg?react";
import Graph, { type GraphProps } from "@/components/graph";

const meta: Meta<typeof Graph> = {
  title: "Components/Graph",
  component: Graph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    showGraph: {
      control: { type: "boolean" },
    },
    value: {
      control: { type: "range", min: 0, max: 10, step: 0.1 },
    },
    label: {
      control: { type: "text" },
    },
    state: {
      control: { type: "select" },
      options: ["default", "active", "edit"],
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[60rem]">
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<GraphProps> = (args) => (
  <div className="mx-auto w-full max-w-[29.8rem]">
    <Graph {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  showGraph: true,
  value: "9.0",
  label: "매우 깨끗",
  state: "default",
};

export const WithGraph: StoryFn<GraphProps> = () => {
  const [value, setValuee] = useState<string>("9.0");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Default State</h3>
        <div className="grid grid-cols-2 gap-4">
          <Graph
            showGraph={true}
            value="9.5"
            label="매우 깨끗"
            state="default"
          />
          <Graph showGraph={true} value="7.5" label="깨끗" state="default" />
          <Graph showGraph={true} value="5.0" label="보통" state="default" />
          <Graph showGraph={true} value="3.0" label="나쁨" state="default" />
          <Graph
            showGraph={true}
            value="1.0"
            label="매우 나쁨"
            state="default"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Active State</h3>
        <Graph showGraph={true} value="9.0" label="매우 깨끗" state="active" />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Edit State</h3>
        <Graph
          showGraph={true}
          value={value}
          label="매우 깨끗"
          state="edit"
          onChange={setValuee}
        />
      </div>
    </div>
  );
};

export const WithoutGraph: StoryFn<GraphProps> = () => {
  const [value, setValuee] = useState<string>("9.0");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Default State</h3>
        <div className="grid grid-cols-2 gap-4">
          <Graph
            showGraph={false}
            value="9.5"
            label="매우 좋음"
            icon={<IcStarFull />}
            state="default"
          />
          <Graph
            showGraph={false}
            value="7.5"
            label="좋음"
            icon={<IcStarFull />}
            state="default"
          />
          <Graph
            showGraph={false}
            value="5.0"
            label="보통"
            icon={<IcStarFull />}
            state="default"
          />
          <Graph
            showGraph={false}
            value="3.0"
            label="불만족"
            icon={<IcStarFull />}
            state="default"
          />
          <Graph
            showGraph={false}
            value="1.0"
            label="매우 불만족"
            icon={<IcStarFull />}
            state="default"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Active State</h3>
        <Graph
          showGraph={false}
          value="9.0"
          label="매우 좋음"
          icon={<IcStarFull />}
          state="active"
        />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Edit State</h3>
        <Graph
          showGraph={false}
          value={value}
          label="매우 좋음"
          icon={<IcStarFull />}
          state="edit"
          onChange={setValuee}
        />
      </div>
    </div>
  );
};

export default meta;
