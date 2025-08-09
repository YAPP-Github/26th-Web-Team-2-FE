import type { Meta, StoryFn } from "@storybook/react-vite";
import ProfileGroup, { type ProfileGroupProps } from ".";

const meta: Meta<typeof ProfileGroup> = {
  title: "Components/Avatar/ProfileGroup",
  component: ProfileGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryFn<typeof ProfileGroup>;

const sampleProfiles: ProfileGroupProps["profiles"] = [
  {
    userId: 1,
    profileImageUrl: "",
  },
  { userId: 2 },
  { userId: 3, profileImageUrl: "" },
  { userId: 4 },
  {
    userId: 5,
    profileImageUrl: "",
  },
];

export const Default: Story = () => (
  <ProfileGroup size={40} profiles={sampleProfiles} />
);

export const TenRowsIncremental: Story = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 10 }).map((_, rowIndex) => {
        const count = rowIndex + 1;
        const profiles = Array.from({ length: count }).map((_, i) => ({
          userId: i,
          profileImageUrl: i % 2 === 0 ? "" : undefined,
        }));

        return <ProfileGroup key={`avatar`} size={40} profiles={profiles} />;
      })}
    </div>
  );
};
