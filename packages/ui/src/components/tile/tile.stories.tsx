import type { Meta, StoryObj } from "@storybook/react-vite";
import Tile from ".";

const meta: Meta<typeof Tile> = {
  title: "Components/Tile",
  component: Tile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const Default: Story = {
  render: () => (
    <Tile
      data={{
        tableName: "가성비 숙소",
        accommodationCount: 5,
        accommodationNames: [
          "더 베스트 제주 성산 (The Best Jeju Seongsan)",
          "제주신라호텔 (The Shilla Jeju)",
          "호텔 화인 제주 (Hotel Fine Jeju )",
          "호텔 난타 제주 (HOTEL NANTA JEJU)",
          "호텔 제주 (Hotel Jeju)",
        ],
        lastModifiedAt: "24.05.24",
      }}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      onShareClick={() => {}}
    />
  ),
};

export const MultipleTiles: Story = {
  render: () => (
    <div className="flex flex-col justify-center gap-6">
      <Tile
        data={{
          tableName: "가성비 숙소 비교표1",
          accommodationCount: 4,
          accommodationNames: [
            "더 베스트 제주 성산 (The Best Jeju Seongsan)",
            "제주신라호텔 (The Shilla Jeju)",
            "호텔 화인 제주 (Hotel Fine Jeju )",
            "호텔 난타 제주 (HOTEL NANTA JEJU)",
          ],
          lastModifiedAt: "24.05.24",
        }}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
        onShareClick={() => {}}
      />
      <Tile
        data={{
          tableName: "럭셔리 숙소 비교표2",
          accommodationCount: 2,
          accommodationNames: [
            "호텔 화인 제주 (Hotel Fine Jeju )",
            "호텔 난타 제주 (HOTEL NANTA JEJU)",
          ],
          lastModifiedAt: "24.05.24",
        }}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
        onShareClick={() => {}}
      />
      <Tile
        data={{
          tableName: "가족 여행 숙소 비교표3",
          accommodationCount: 2,
          accommodationNames: [
            "성산 마리나 호텔 (Sungsan Marina Hotel)",
            "호텔 난타 제주 (HOTEL NANTA JEJU)",
          ],
          lastModifiedAt: "24.05.24",
        }}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
        onShareClick={() => {}}
      />
    </div>
  ),
};
