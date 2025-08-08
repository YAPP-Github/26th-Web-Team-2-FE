import type { Meta, StoryFn } from "@storybook/react-vite";
import Profile from ".";

const meta: Meta<typeof Profile> = {
  title: "Components/Avatar/Profile",
  component: Profile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    imgUrl: {
      control: "text",
      description: "사진의 url, 입력하지 않으면 기본 아이콘이 표시",
    },
    size: {
      control: { type: "radio" },
      options: [32, 40, 48],
      description: "프로필 아이콘 크기",
    },
  },
};

export default meta;

type Story = StoryFn<typeof Profile>;

export const Default: Story = (args) => <Profile {...args} />;
Default.args = {
  size: 32,
  imgUrl: "",
};

export const AllSizes: Story = () => {
  const sizes: Array<32 | 40 | 48> = [32, 40, 48];
  return (
    <div className="flex w-full flex-col items-center gap-y-10">
      <div className="flex flex-row justify-center gap-x-15">
        {sizes.map((s) => (
          <Profile key={s} size={s} />
        ))}
      </div>
      <div className="flex flex-row justify-center gap-x-15">
        {sizes.map((s) => (
          <Profile
            key={`profile-${s}`}
            size={s}
            imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw3TImggVZbRWityDROb55FWfUd1e-TAwdlw&s"
          />
        ))}
      </div>
    </div>
  );
};
