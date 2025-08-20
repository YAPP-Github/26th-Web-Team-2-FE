"use client";

import { Button, cn, IcArrowRight } from "@ssok/ui";
import Link from "next/link";
import SsokIcon from "@/shared/assets/ssok-icon.svg";
import LandingSectionContainer from "../landing-section-container";

const HeroSection = () => {
  return (
    <LandingSectionContainer
      className={cn(
        "flex flex-col items-center gap-[8rem] overflow-y-hidden pt-[8rem]",
        "bg-gradient-to-b from-0% from-[rgba(148,255,176,0.35)] via-95% via-[rgba(177,183,230,0.35)] to-100% to-[rgba(191,150,255,0.2)]",
      )}
    >
      <div className="flex flex-col items-center gap-[2.4rem]">
        <div className="flex flex-col items-center gap-[0.4rem]">
          <div className="w-full text-center text-display2-bold36 text-secondary-15">
            3일 걸리던 숙소 정하기,
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="mr-[0.8rem] flex items-center gap-[0.8rem]">
              <span className="text-display1-bold56 text-secondary-15">쏙</span>
              <SsokIcon className="h-[4.8rem] w-[4.8rem] shrink-0" />
              <span className="text-display1-bold56 text-secondary-15">
                과 함께
              </span>
            </div>
            <span className="text-center text-display1-bold56 text-secondary-15">
              3분만에 끝내보세요
            </span>
          </div>
        </div>
        <Link href="/boards" prefetch>
          <Button
            variant="primary"
            size="lg"
            className={cn(
              "gap-[0.4rem] rounded-full bg-primary px-[3.2rem] py-[1.6rem] text-white hover:bg-primary-60 focus:bg-primary-50 active:bg-primary-40",
              "[&>span]:flex [&>span]:items-center",
            )}
          >
            <span className="text-title3-semi24">
              설레는 여행 준비 시작하기
            </span>
            <IcArrowRight className="h-[3.2rem] w-[3.2rem]" />
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-[100.5rem]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full rounded-t-[1.8rem] border-8 border-white border-b-0 object-cover shadow-[9px_22px_50px_0px_rgba(0,0,0,0.25)]"
        >
          <source src="/static/landing/landing-hero.webm" type="video/webm" />
        </video>
      </div>
    </LandingSectionContainer>
  );
};

export default HeroSection;
