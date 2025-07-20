import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { Card, type CardProps } from ".";

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
  imgSrc:
    "https://pix8.agoda.net/hotelImages/942/942521/942521_17021009050050901364.jpg?ca=6&ce=1&s=312x235&ar=16x9",
  platform: {
    name: "아고다",
    href: "https://agoda.com",
    logoSrc:
      "https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg",
  },
  placeName: "그랜드 하얏트 제주 스페셜 럭셔리 어쩌구 저쩌구 ㅎㅎㅎ",
  price: 450000,
  address: "제주특별자치도 제주시 연동 123",
  attractions: [
    { id: "1", placeName: "한라산", distance: 15 },
    { id: "2", placeName: "이호테우해변", distance: 8 },
  ],
  savedByText: "고은",
  memoContent: "이 호텔은 조식이 맛있고 위치가 좋아요.",
};
export const MultipleCards: StoryFn<CardProps> = () => {
  const cardData: CardProps[] = [
    {
      imgSrc:
        "https://pix8.agoda.net/hotelImages/942/942521/942521_17021009050050901364.jpg?ca=6&ce=1&s=312x235&ar=16x9",
      platform: {
        name: "아고다",
        href: "https://agoda.com",
        logoSrc:
          "https://play-lh.googleusercontent.com/EN4vEdLW-Y2CudJ01SiOsa3XOv5MdlO7uOVAmm-FuE6gDmPZZshcQDu-SuEI1RpTG0g",
      },
      placeName: "그랜드 하얏트 제주 럭셔리 호텔",
      price: 450000,
      address: "제주특별자치도 제주시 연동 123",
      attractions: [
        { id: "1", placeName: "한라산", distance: 15 },
        { id: "2", placeName: "이호테우해변", distance: 8 },
      ],
      savedByText: "고은",
      memoContent: "조식 맛집이에요.",
      selected: false,
      onAddClick: () => {},
      onDeleteClick: () => {},
    },
    {
      imgSrc:
        "https://cf.bstatic.com/xdata/images/hotel/square240/60661791.webp?k=fc40ef70809526a7650df81016752406bac679a46a8ff2193a503e8f57afa558&o=",
      platform: {
        name: "부킹닷컴",
        href: "https://booking.com",
        logoSrc:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Booking.com_Icon_2022.svg/1200px-Booking.com_Icon_2022.svg.png",
      },
      placeName: "롯데 시그니엘 부산 호텔 오션뷰",
      price: 550000,
      address: "부산광역시 해운대구 해운대해변로 123",
      attractions: [
        { id: "1", placeName: "해운대 해수욕장", distance: 3 },
        { id: "2", placeName: "동백섬", distance: 5 },
      ],
      savedByText: "수빈",
      memoContent: "",
      selected: true,
      onAddClick: () => {},
      onDeleteClick: () => {},
    },
  ];

  return (
    <div className="flex flex-wrap gap-8 p-8">
      {cardData.map((data, _idx) => (
        <Card key={data.placeName} {...data} />
      ))}
    </div>
  );
};
