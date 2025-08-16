import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import Card, { type CardProps } from ".";

export default {
  title: "Components/Card",
  tags: ["autodocs"],
  component: Card,
  argTypes: {
    selected: {
      control: { type: "boolean" },
    },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<CardProps>;

const Template: StoryFn<CardProps> = (args) => {
  const [selected, setSelected] = useState(args.selected ?? false);

  return (
    <Card
      {...args}
      selected={selected}
      onAddClick={() => setSelected((prev) => !prev)}
      onDeleteClick={() => {}}
    />
  );
};

export const Default: StoryFn<CardProps> = Template.bind({});
Default.args = {
  images: [
    "https://pix8.agoda.net/hotelImages/942/942521/942521_17021009050050901364.jpg?ca=6&ce=1&s=312x235&ar=16x9",
  ],
  logoUrl: "https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg",
  url: "https://agoda.com",
  siteName: "아고다",
  accommodationName: "그랜드 하얏트 제주 스페셜 럭셔리 어쩌구 저쩌구 ㅎㅎㅎ",
  currency: "450000",
  address: "제주특별자치도 제주시 연동 123",
  nearbyAttractions: [
    {
      name: "한라산",
      type: "mountain",
      latitude: 0.1,
      longitude: 0.1,
      distance: "15",
      byFoot: { distance: "15", time: "30분" },
      byCar: { distance: "5", time: "10분" },
    },
    {
      name: "이호테우해변",
      type: "beach",
      latitude: 0.1,
      longitude: 0.1,
      distance: "8",
      byFoot: { distance: "8", time: "20분" },
      byCar: { distance: "3", time: "7분" },
    },
  ],
  savedByText: "고은",
  memo: "이 호텔은 조식이 맛있고 위치가 좋아요.",
  selected: false,
  onAddClick: () => {},
  onDeleteClick: () => {},
};
export const MultipleCards: StoryFn<CardProps> = () => {
  const cardData: CardProps[] = [
    {
      images: [
        "https://pix8.agoda.net/hotelImages/942/942521/942521_17021009050050901364.jpg?ca=6&ce=1&s=312x235&ar=16x9",
      ],
      logoUrl:
        "https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg",
      url: "https://agoda.com",
      siteName: "아고다",
      accommodationName:
        "그랜드 하얏트 제주 스페셜 럭셔리 어쩌구 저쩌구 ㅎㅎㅎ",
      currency: "450000",
      address: "제주특별자치도 제주시 연동 123",
      nearbyAttractions: [
        {
          name: "한라산",
          type: "mountain",
          latitude: 0.1,
          longitude: 0.1,
          distance: "15",
          byFoot: { distance: "15", time: "30분" },
          byCar: { distance: "5", time: "10분" },
        },
        {
          name: "이호테우해변",
          type: "beach",
          latitude: 0.1,
          longitude: 0.1,
          distance: "8",
          byFoot: { distance: "8", time: "20분" },
          byCar: { distance: "3", time: "7분" },
        },
      ],
      savedByText: "고은",
      memo: "이 호텔은 조식이 맛있고 위치가 좋아요.",
      selected: false,
      onAddClick: () => {},
      onDeleteClick: () => {},
    },
    {
      images: [
        "https://cf.bstatic.com/xdata/images/hotel/square240/60661791.webp?k=fc40ef70809526a7650df81016752406bac679a46a8ff2193a503e8f57afa558&o=",
      ],
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Booking.com_Icon_2022.svg/1200px-Booking.com_Icon_2022.svg.png",
      url: "https://booking.com",
      siteName: "부킹닷컴",
      accommodationName: "롯데 시그니엘 부산 호텔 오션뷰",
      currency: "550000",
      address: "부산광역시 해운대구 해운대해변로 123",
      nearbyAttractions: [
        {
          name: "해운대 해수욕장",
          type: "beach",
          latitude: 0.1,
          longitude: 0.1,
          distance: "3",
          byFoot: { distance: "3", time: "10분" },
          byCar: { distance: "1", time: "3분" },
        },
        {
          name: "동백섬",
          type: "island",
          latitude: 0.1,
          longitude: 0.1,
          distance: "5",
          byFoot: { distance: "5", time: "15분" },
          byCar: { distance: "2", time: "5분" },
        },
      ],
      savedByText: "수빈",
      memo: "",
      selected: true,
      onAddClick: () => {},
      onDeleteClick: () => {},
    },
  ];

  return (
    <div className="flex flex-wrap gap-8 p-8">
      {cardData.map((data, _idx) => (
        <Card key={data.accommodationName} {...data} />
      ))}
    </div>
  );
};
