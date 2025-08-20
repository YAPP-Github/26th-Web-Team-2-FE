import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "../card";
import CardSkeleton from "./";

const meta: Meta<typeof CardSkeleton> = {
  title: "Components/CardSkeleton",
  component: CardSkeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardSkeleton>;

export const Default: Story = {
  args: {},
};

export const Compare: Story = {
  render: () => (
    <div className="flex w-fit flex-col gap-4">
      {/* 스켈레톤 카드 */}
      <CardSkeleton />

      {/* 실제 카드 */}
      <Card
        selected={false}
        onAddClick={() => console.log("Add clicked")}
        onDeleteClick={() => console.log("Delete clicked")}
        images={[
          "https://pix8.agoda.net/hotelImages/942/942521/942521_17021009050050901364.jpg?ca=6&ce=1&s=312x235&ar=16x9",
        ]}
        address="서울특별시 강남구 테헤란로 123"
        url="https://agoda.com"
        logoUrl="https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg"
        siteName="아고다"
        accommodationName="테스트 호텔"
        currency="₩120,000"
        nearbyAttractions={[
          { name: "관광지 1", distance: "1km" },
          { name: "관광지 2", distance: "2km" },
        ]}
        savedByText="내가 1순위로 찜한 숙소"
        memo="테스트 메모입니다."
      />
    </div>
  ),
};
