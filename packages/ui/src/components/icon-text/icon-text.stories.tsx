import type { Meta, StoryObj } from "@storybook/react-vite";
import IcInfo from "@/assets/icons/ic_info.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcMemo from "@/assets/icons/ic_memo.svg?react";
import { textColorOptions, typoOptions } from "@/constant";
import IconText from ".";

const meta: Meta<typeof IconText> = {
  title: "Components/Text/TextWithIcon",
  component: IconText,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: textColorOptions,
    },
    typo: {
      control: "select",
      options: typoOptions,
    },
    gap: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof IconText>;

export const Variants: Story = {
  render: () => (
    <div className="flex w-[50rem] flex-col items-center gap-8 bg-gray-50 py-[3rem] text-left">
      {/* 주소 섹션 */}
      <div className="flex w-[30rem] flex-col gap-2">
        <h3 className="text-black text-body1-bold16"> 주소</h3>
        <IconText
          text="서울특별시 서초구 강남대로 1234"
          color="text-neutral-40"
          typo="text-caption1-medi12"
          icon={<IcLocation />}
          gap="gap-[0.2rem]"
        />
        <IconText
          text="서울특별시 종로구 종로3가 77-1"
          color="text-neutral-40"
          typo="text-caption1-medi12"
          icon={<IcLocation />}
          gap="gap-[0.2rem]"
        />
        <IconText
          text="부산광역시 해운대구 우동 123-45"
          color="text-neutral-40"
          typo="text-caption1-medi12"
          icon={<IcLocation />}
          gap="gap-[0.2rem]"
        />
      </div>
      {/* 메모 섹션 */}
      <div className="flex w-[30rem] flex-col gap-2">
        <h3 className="text-black text-body1-bold16"> 메모</h3>
        <IconText
          text="객실 내 와이파이 제공"
          color="text-secondary-50"
          typo="text-body2-medi14"
          icon={<IcMemo />}
          gap="gap-[0.4rem]"
        />
        <IconText
          text="주차 공간 협소, 대중교통 이용 권장"
          color="text-secondary-50"
          typo="text-body2-medi14"
          icon={<IcMemo />}
          gap="gap-[0.4rem]"
        />
        <IconText
          text="애완동물 출입 금지"
          color="text-secondary-50"
          typo="text-body2-medi14"
          icon={<IcMemo />}
          gap="gap-[0.4rem]"
        />
      </div>
      {/* 기타 정보 섹션 */}
      <div className="flex w-[30rem] flex-col gap-2">
        <h3 className="text-black text-body1-bold16">기타 정보</h3>
        <IconText
          text="1박 당 요금"
          color="text-neutral-60"
          typo="text-caption2-regular11"
          icon={<IcInfo />}
          gap="gap-[0.2rem]"
          className="flex-row-reverse"
        />
      </div>
    </div>
  ),
};
