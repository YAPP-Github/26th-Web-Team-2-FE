"use client";

import { Button } from "@ssok/ui";
import LandingSectionContainer from "./landing-section-container";

const CTASection = () => {
  return (
    <LandingSectionContainer className="gap-[2.4rem] bg-white">
      <div className="flex flex-col items-center gap-[0.4rem]">
        <h2 className="w-[90.8rem] text-center font-bold text-[#102B1E] text-[3.6rem] leading-[1.5] tracking-[-0.017em]">
          흩어진 숙소 링크, 쏙으로 정리하고
        </h2>
        <div className="flex items-center gap-[0.8rem]">
          <span className="text-center font-bold text-[#102B1E] text-[5.6rem] leading-[1.5] tracking-[-0.014em]">
            여행 전의 설렘을 지켜보세요
          </span>
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        className="rounded-[100rem] bg-primary px-[3.2rem] py-[1.6rem] font-semibold text-[2.4rem] text-primary-100 leading-[1.5] hover:bg-primary-60 focus:bg-primary-50 active:bg-primary-40"
      >
        지금 무료로 사용해보기
      </Button>
    </LandingSectionContainer>
  );
};

export default CTASection;
