import type { Meta, StoryObj } from "@storybook/react-vite";
import { TravelBoard } from ".";

const meta: Meta<typeof TravelBoard> = {
  title: "Components/TravelBoard",
  component: TravelBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "384px",
          height: "242px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TravelBoard>;

export const Default: Story = {
  args: {
    onClick: () => {},
    data: {
      boardId: 1,
      boardName: "도키도키 나고야",
      destination: "나고야",
      startDate: "23.10.01",
      endDate: "23.10.05",
      participantCount: 3,
      participants: [
        {
          userId: 1,
          profileImageUrl: "https://example.com/image1.jpg",
          nickname: "참여자1",
        },
        {
          userId: 2,
          profileImageUrl: "https://example.com/image2.jpg",
          nickname: "참여자2",
        },
        {
          userId: 3,
          profileImageUrl: "https://example.com/image3.jpg",
          nickname: "참여자3",
        },
      ],
    },
  },
};
