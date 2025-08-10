import type { Accommodation } from "@/domains/compare/types";

const mockCompareData: Accommodation[] = [
  {
    id: 1,
    accommodationName: "파크 하이엇 도쿄",
    lowestPrice: 250000,
    images: [
      "https://pix8.agoda.net/hotelImages/9373867/0/d325a6b849fb3bcce909f813ea7adfb8.jpg?ce=2&s=1024x",
      "https://pix8.agoda.net/hotelImages/692/69287/69287_16060314210043106872.jpg?ca=6&ce=1&s=600x",
    ],
    reviewScore: 8.5,
    cleanlinessScore: 7.2,
    nearbyAttractions: [
      {
        name: "도쿄역",
        type: "STATION",
        latitude: 35.6812,
        longitude: 139.7671,
        distance: "500m",
        byCar: { distance: "500m", time: "8분" },
      },
      {
        name: "황궁",
        type: "ATTRACTION",
        latitude: 35.6852,
        longitude: 139.7528,
        distance: "1km",
        byCar: { distance: "1km", time: "5분" },
      },
      {
        name: "긴자",
        type: "SHOPPING",
        latitude: 35.6717,
        longitude: 139.765,
        distance: "800m",
        byCar: { distance: "800m", time: "7분" },
      },
    ],
    checkInTime: { from: "15:00", to: "24:00" },
    checkOutTime: { from: "00:00", to: "11:00" },
    amenities: [
      {
        type: "무료 와이파이",
        available: true,
        description: "",
      },
      { type: "주차", available: true, description: "유료" },
      {
        type: "피트니스 & 헬스장",
        available: true,
        description: "",
      },
      { type: "수영장", available: true, description: "오전 07시 ~ 오후 22시" },
      { type: "조식", available: true, description: "오전 07시 ~ 오전 11시" },
    ],
    reviewSummary:
      "위치가 좋고 시설이 깨끗합니다. 직원들이 친절하고 조식이 맛있어요.",
    nearbyTransportation: [
      {
        name: "도쿄역",
        type: "TRAIN",
        latitude: 35.6812,
        longitude: 139.7671,
        distance: "500m",
        byCar: { distance: "500m", time: "8분" },
      },
      {
        name: "긴자선 교바시역",
        type: "SUBWAY",
        latitude: 35.6786,
        longitude: 139.7713,
        distance: "300m",
        byCar: { distance: "300m", time: "6분" },
      },
    ],
  },
  {
    id: 2,
    accommodationName: "아사쿠사 류칸",
    lowestPrice: 180000,
    images: [
      "https://pix8.agoda.net/hotelImages/49986351/0/e311c6d8b735a44ace73b8219d07876d.jpeg?ce=0&s=600x",
      "https://pix8.agoda.net/hotelImages/9373867/0/d325a6b849fb3bcce909f813ea7adfb8.jpg?ce=2&s=1024x",
    ],
    reviewScore: 7.8,
    cleanlinessScore: 8.9,
    nearbyAttractions: [
      {
        name: "아사쿠사",
        type: "DISTRICT",
        latitude: 35.7118,
        longitude: 139.7969,
        distance: "100m",
        byFoot: { distance: "100m", time: "1분" },
      },
      {
        name: "스카이트리",
        type: "ATTRACTION",
        latitude: 35.7101,
        longitude: 139.8107,
        distance: "1.5km",
        byFoot: { distance: "1.5km", time: "18분" },
      },
      {
        name: "센소지",
        type: "TEMPLE",
        latitude: 35.7148,
        longitude: 139.7967,
        distance: "300m",
        byFoot: { distance: "300m", time: "3분" },
      },
    ],
    checkInTime: { from: "14:00", to: "23:00" },
    checkOutTime: { from: "00:00", to: "10:00" },
    amenities: [
      {
        type: "무료 와이파이",
        available: true,
        description: "",
      },
      { type: "수영장", available: true, description: "오전 06시 ~ 오후 23시" },
      {
        type: "바 / 라운지",
        available: true,
        description: "오전 11시 ~ 오후 23시",
      },
    ],
    reviewSummary: "전통적인 분위기가 좋고 온천 시설이 훌륭합니다.",
    nearbyTransportation: [
      {
        name: "아사쿠사역",
        type: "SUBWAY",
        latitude: 35.7119,
        longitude: 139.7983,
        distance: "300m",
        byFoot: { distance: "300m", time: "3분" },
      },
      {
        name: "스카이트리 셔틀버스 정류장",
        type: "BUS",
        latitude: 35.7115,
        longitude: 139.7975,
        distance: "200m",
        byFoot: { distance: "200m", time: "2분" },
      },
    ],
  },
  {
    id: 3,
    accommodationName: "만다린 오리엔탈 도쿄",
    lowestPrice: 450000,
    images: [
      "https://pix8.agoda.net/hotelImages/692/69287/69287_16060314210043106872.jpg?ca=6&ce=1&s=600x",
    ],
    reviewScore: 9.2,
    cleanlinessScore: 9.5,
    amenities: [
      {
        type: "무료 와이파이",
        available: true,
        description: "",
      },
      {
        type: "프론트데스크",
        available: true,
        description: "오전 07시 ~ 오후 23시",
      },
      { type: "수영장", available: true, description: "오전 07시 ~ 오후 23시" },
      {
        type: "피트니스 & 헬스장",
        available: true,
        description: "",
      },
      {
        type: "청소 서비스",
        available: true,
        description: "",
      },
    ],
    checkInTime: { from: "15:00", to: "24:00" },
    checkOutTime: { from: "00:00", to: "12:00" },
    reviewSummary: "최고급 호텔로 서비스와 시설 모든 면에서 완벽합니다.",
    nearbyTransportation: [
      {
        name: "시부야역",
        type: "TRAIN",
        latitude: 35.658,
        longitude: 139.7016,
        distance: "200m",
        byCar: { distance: "200m", time: "5분" },
      },
      {
        name: "JR 야마노테선 시부야역",
        type: "TRAIN",
        latitude: 35.6585,
        longitude: 139.7013,
        distance: "200m",
        byCar: { distance: "200m", time: "5분" },
      },
    ],
  },
  {
    id: 4,
    accommodationName: "도쿄 비즈니스 호텔",
    lowestPrice: 120000,
    images: [
      "https://pix8.agoda.net/hotelImages/1723671/-1/47378d14e9f58fdd96ed6f18b4f8f060.jpg?ca=13&ce=1&s=1024x",
    ],
    reviewScore: 6.8,
    cleanlinessScore: 6.5,
    nearbyAttractions: [
      {
        name: "신주쿠",
        type: "DISTRICT",
        latitude: 35.6896,
        longitude: 139.7004,
        distance: "500m",
        byCar: { distance: "500m", time: "8분" },
      },
      {
        name: "동경도청",
        type: "GOVERNMENT",
        latitude: 35.6892,
        longitude: 139.6921,
        distance: "700m",
        byCar: { distance: "700m", time: "9분" },
      },
      {
        name: "카부키쵸",
        type: "ENTERTAINMENT",
        latitude: 35.6938,
        longitude: 139.7039,
        distance: "1km",
        byCar: { distance: "1km", time: "5분" },
      },
    ],
    amenities: [
      {
        type: "무료 와이파이",
        available: true,
        description: "",
      },
      {
        type: "비즈니스 서비스",
        available: true,
        description: "오전 09시 ~ 오후 18시",
      },
      {
        type: "청소 서비스",
        available: true,
        description: "",
      },
    ],
    checkInTime: { from: "15:00", to: "24:00" },
    checkOutTime: { from: "00:00", to: "11:00" },
    reviewSummary: "가격 대비 괜찮은 편이지만 시설이 다소 오래되었습니다.",
    nearbyTransportation: [
      {
        name: "신주쿠역",
        type: "TRAIN",
        latitude: 35.6896,
        longitude: 139.7004,
        distance: "800m",
        byCar: { distance: "800m", time: "10분" },
      },
      {
        name: "마루노우치선 신주쿠역",
        type: "SUBWAY",
        latitude: 35.6904,
        longitude: 139.6989,
        distance: "600m",
        byCar: { distance: "600m", time: "8분" },
      },
    ],
  },
];

export const useCompareData = (compareId: string) => {
  const compareItems =
    compareId === "2"
      ? mockCompareData.slice(0, 2)
      : compareId === "3"
        ? mockCompareData.slice(0, 3)
        : mockCompareData;

  return { compareItems };
};
