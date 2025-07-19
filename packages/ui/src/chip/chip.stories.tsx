import type { Meta, StoryFn } from "@storybook/react-vite";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import { Chip, type ChipProps } from "./index";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["xs", "md"],
    },
    text: {
      control: "text",
    },
    additionalText: {
      control: "text",
    },
    icon: {
      control: "boolean",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

const Template: StoryFn<ChipProps> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "텍스트",
  size: "xs",
  additionalText: "텍스트",
  icon: <IcVariant />,
};

export const AllVariants: StoryFn = () => {
  const names = ["지수", "경민", "시언", "수빈", "고은", "세환", "성연"];
  const additionalText = ["PM", "Design", "Design", "FE", "FE", "BE", "BE"];

  return (
    <div className="flex flex-col gap-8">
      {/* xs + icon */}
      <div>
        <h2 className="mb-2 font-semibold text-lg">Size: xs + Icon</h2>
        <div className="flex flex-wrap gap-4">
          {names.map((name) => (
            <Chip
              key={`xs-icon-${name}`}
              size="xs"
              text={name}
              icon={<IcVariant />}
            />
          ))}
        </div>
      </div>

      {/* md + icon */}
      <div>
        <h2 className="mb-2 font-semibold text-lg">Size: md + Icon</h2>
        <div className="flex flex-wrap gap-4">
          {names.map((name) => (
            <Chip
              key={`md-icon-${name}`}
              size="md"
              text={name}
              icon={<IcVariant />}
            />
          ))}
        </div>
      </div>

      {/* md only text */}
      <div>
        <h2 className="mb-2 font-semibold text-lg">Size: md (Only Text)</h2>
        <div className="flex flex-wrap gap-4">
          {names.map((name) => (
            <Chip key={`md-text-${name}`} size="md" text={name} />
          ))}
        </div>
      </div>

      {/* md + icon + additionalText */}
      <div>
        <h2 className="mb-2 font-semibold text-lg">
          Size: xs + Icon + AdditionalText
        </h2>
        <div className="flex flex-wrap gap-4">
          {names.map((name, idx) => (
            <Chip
              key={`xs-icon-add-${name}`}
              size="xs"
              text={name}
              additionalText={additionalText[idx]}
              icon={<IcVariant />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
