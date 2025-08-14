"use client";

import { Button } from "@ssok/ui";
import SsokIcon from "@/shared/assets/ssok-icon.svg";
import LandingSectionContainer from "./landing-section-container";

const HeroSection = () => {
  return (
    <LandingSectionContainer
      className="h-[92rem] px-[21.8rem] py-[8rem]"
      style={{
        background:
          "linear-gradient(180deg, rgba(148, 255, 176, 0.35) 0%, rgba(177, 183, 230, 0.35) 60%, rgba(191, 150, 255, 0.35) 93%)",
      }}
    >
      <div className="flex flex-col items-center gap-[8rem]">
        {/* Title and Button Group */}
        <div className="flex flex-col items-center gap-[2.4rem]">
          <div className="flex flex-col items-center gap-[0.4rem]">
            <h1 className="w-[90.8rem] text-center font-bold text-[#102B1E] text-[3.6rem] leading-[1.5] tracking-[-0.017em]">
              3일 걸리던 숙소 정하기,
            </h1>
            <div className="flex items-center gap-[0.8rem]">
              <div className="flex items-center gap-[0.4rem]">
                <span className="font-semibold text-[#102B1E] text-[5.6rem] leading-[1.5] tracking-[-0.014em]">
                  쏙
                </span>
                {/* Logo Icon */}
                <SsokIcon className="h-[4.8rem] w-[4.8rem]" />
              </div>
              <span className="font-bold text-[#102B1E] text-[5.6rem] leading-[1.5] tracking-[-0.014em]">
                과 함께 3분만에 끝내보세요
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-[0.4rem] rounded-[100rem] bg-[#0BB77D] px-[3.2rem] py-[1.6rem] font-semibold text-[2.4rem] text-white leading-[1.5] hover:bg-[#09a56f] focus:bg-[#089662] active:bg-[#078655]"
          >
            설레는 여행 준비 시작하기 →
          </Button>
        </div>

        {/* Video */}
        <div className="relative h-[52.6rem] w-[100.5rem]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full rounded-t-[1.2rem] border-8 border-white border-b-0 object-cover shadow-[9px_22px_50px_0px_rgba(0,0,0,0.25)]"
          >
            <source src="/static/landing/landing-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </LandingSectionContainer>
  );
};

export default HeroSection;
