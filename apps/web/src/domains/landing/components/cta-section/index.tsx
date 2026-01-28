"use client";

import { Button, cn } from "@ssok/ui";
import Link from "next/link";
import LandingSectionContainer from "../landing-section-container";

const CTASection = () => {
  return (
    <LandingSectionContainer
      className={cn(
        "[&>div]:flex [&>div]:flex-col [&>div]:items-center",
        "[&>div]:gap-[2.4rem] [&>div]:py-[10.4rem]",
        "max-xl:[&>div]:pt-[7.2rem] max-xl:[&>div]:pb-[4.8rem]",
        "bg-gradient-to-b from-0% from-[rgba(148,255,176,0.20)] via-50% via-[rgba(177,183,230,0.20)] to-100% to-[rgba(148,255,176,0.20)]",
      )}
    >
      <div className={cn("flex flex-col items-center gap-[0.4rem]")}>
        <div
          className={cn(
            "text-center text-secondary-15",
            "max-xl:text-body1-bold16 xl:text-display2-bold36",
          )}
        >
          흩어진 숙소 링크, 쏙으로 정리하고
        </div>
        <div
          className={cn(
            "text-center text-secondary-15",
            "max-xl:text-display4-bold32 xl:text-display1-bold56",
          )}
        >
          <span className={cn("max-xl:hidden", "xl:inline")}>
            여행 전의 설렘을 지켜보세요
          </span>
          <span className={cn("max-xl:inline", "xl:hidden")}>
            여행 전의 설렘을
            <br />
            지켜보세요
          </span>
        </div>
      </div>
      <Link href="/boards" prefetch>
        <Button
          variant="primary"
          size="lg"
          className={cn(
            "gap-[0.4rem] rounded-full bg-primary text-white hover:bg-primary-60 focus:bg-primary-50 active:bg-primary-40",
            "max-xl:!px-[2rem] max-xl:!py-[1.2rem]",
            "xl:!px-[3.2rem] xl:!py-[1.6rem]",
            "max-xl:[&>span]:!text-body1-bold16",
            "xl:[&>span]:!text-title3-semi24",
          )}
        >
          지금 무료로 사용해보기
        </Button>
      </Link>
    </LandingSectionContainer>
  );
};

export default CTASection;
