"use client";

import { Button, cn } from "@ssok/ui";
import Link from "next/link";
import LandingSectionContainer from "./landing-section-container";

const CTASection = () => {
  return (
    <LandingSectionContainer
      className={cn(
        "flex flex-col items-center gap-[2.4rem] bg-gradient-cta py-[10.4rem]",
        "bg-gradient-to-b from-0% from-[rgba(148,255,176,0.20)] via-50% via-[rgba(177,183,230,0.20)] to-100% to-[rgba(148,255,176,0.20)]",
      )}
    >
      <div className="flex flex-col items-center gap-[0.4rem]">
        <div className="text-center text-display2-bold36 text-secondary-15">
          흩어진 숙소 링크, 쏙으로 정리하고
        </div>
        <div className="text-center text-display1-bold56 text-secondary-15">
          여행 전의 설렘을 지켜보세요
        </div>
      </div>
      <Link href="/boards" prefetch>
        <Button
          variant="primary"
          size="lg"
          className="gap-[0.4rem] rounded-full bg-primary px-[3.2rem] py-[1.6rem] text-white hover:bg-primary-60 focus:bg-primary-50 active:bg-primary-40"
        >
          <span className="text-title3-semi24">지금 무료로 사용해보기</span>
        </Button>
      </Link>
    </LandingSectionContainer>
  );
};

export default CTASection;
