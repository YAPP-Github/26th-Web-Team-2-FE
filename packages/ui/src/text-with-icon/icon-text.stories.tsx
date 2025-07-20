import type { Meta, StoryObj } from "@storybook/react-vite";
import IcInfo from "@/assets/icons/ic_info.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcMemo from "@/assets/icons/ic_memo.svg?react";
import TextWithIcon from ".";

const meta: Meta<typeof TextWithIcon> = {
  title: "Components/Text/TextWithIcon",
  component: TextWithIcon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
    },
    className: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TextWithIcon>;

export const Variants: Story = {
  render: () => (
    <div className="flex w-[50rem] flex-col items-center gap-8 bg-gray-50 py-[3rem] text-left">
      {/* 주소 섹션 */}
      <div className="flex w-[30rem] flex-col gap-2">
        <h3 className="text-black text-body1-bold16"> 주소</h3>
        <TextWithIcon icon={<IcLocation />} className="gap-[0.2rem]">
          <TextWithIcon.Text className="text-caption1-medi12 text-neutral-40">
            서울특별시 서초구 강남대로 1234
          </TextWithIcon.Text>
        </TextWithIcon>
        <TextWithIcon icon={<IcLocation />} className="gap-[0.2rem]">
          <TextWithIcon.Text className="text-caption1-medi12 text-neutral-40">
            서울특별시 종로구 종로3가 77-1
          </TextWithIcon.Text>
        </TextWithIcon>
        <TextWithIcon icon={<IcLocation />} className="gap-[0.2rem]">
          <TextWithIcon.Text className="text-caption1-medi12 text-neutral-40">
            부산광역시 해운대구 우동 123-45
          </TextWithIcon.Text>
        </TextWithIcon>
      </div>
      {/* 메모 섹션 */}
      <div className="flex w-[30rem] flex-col gap-2">
        <h3 className="text-black text-body1-bold16"> 메모</h3>
        <TextWithIcon icon={<IcMemo />} className="gap-[0.4rem]">
          <TextWithIcon.Text className="text-body2-medi14 text-secondary-50">
            객실 내 와이파이 제공
          </TextWithIcon.Text>
        </TextWithIcon>
        <TextWithIcon icon={<IcMemo />} className="gap-[0.4rem]">
          <TextWithIcon.Text className="text-body2-medi14 text-secondary-50">
            주차 공간 협소, 대중교통 이용 권장
          </TextWithIcon.Text>
        </TextWithIcon>
        <TextWithIcon icon={<IcMemo />} className="gap-[0.4rem]">
          <TextWithIcon.Text className="text-body2-medi14 text-secondary-50">
            애완동물 출입 금지
          </TextWithIcon.Text>
        </TextWithIcon>
      </div>
      {/* 기타 정보 섹션 */}
      <div className="flex w-[30rem] flex-col gap-2">
        <h3 className="text-black text-body1-bold16">기타 정보</h3>
        <TextWithIcon
          icon={<IcInfo />}
          className="flex-row-reverse gap-[0.2rem]"
        >
          <TextWithIcon.Text className="text-caption2-regular11 text-neutral-60">
            1박 당 요금
          </TextWithIcon.Text>
        </TextWithIcon>
      </div>
    </div>
  ),
};
