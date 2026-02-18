"use client";

import { Button, cn, IcArrowRight } from "@ssok/ui";
import Link from "next/link";
import SsokIcon from "@/shared/assets/ssok-icon.svg";
import LandingSectionContainer from "../landing-section-container";

const HeroSection = () => {
  return (
    <LandingSectionContainer
      className={cn(
        "[&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:overflow-y-hidden",
        "[&>div]:gap-[8rem] [&>div]:pt-[1.5rem]",
        "max-xl:[&>div]:gap-[6.4rem] max-xl:[&>div]:pt-[2.4rem]",
        "bg-gradient-to-b from-0% from-[rgba(148,255,176,0.35)] via-95% via-[rgba(177,183,230,0.35)] to-100% to-[rgba(191,150,255,0.2)]",
      )}
    >
      <div className={cn("flex flex-col items-center gap-[2.4rem]")}>
        <div className={cn("flex flex-col items-center gap-[0.4rem]")}>
          <div
            className={cn(
              "w-full text-center text-display2-bold36 text-secondary-15",
              "max-xl:text-body1-bold16",
            )}
          >
            3일 걸리던 숙소 정하기,
          </div>
          <div className={cn("flex flex-wrap justify-center")}>
            <div
              className={cn(
                "flex items-center",
                "max-xl:mr-[0.2rem] max-xl:gap-[0.2rem]",
                "xl:mr-[0.8rem] xl:gap-[0.8rem]",
              )}
            >
              <span
                className={cn(
                  "text-display1-bold56 text-secondary-15",
                  "max-xl:text-[3.2rem] max-xl:leading-[1.4] max-xl:tracking-[-0.06rem]",
                )}
              >
                쏙
              </span>
              <SsokIcon
                className={cn(
                  "h-[4.8rem] w-[4.8rem] shrink-0",
                  "max-xl:h-[2.4rem] max-xl:w-[2.4rem]",
                )}
              />
              <span
                className={cn(
                  "text-display1-bold56 text-secondary-15",
                  "max-xl:text-[3.2rem] max-xl:leading-[1.4] max-xl:tracking-[-0.06rem]",
                )}
              >
                과 함께
              </span>
            </div>
            <span
              className={cn(
                "text-center text-display1-bold56 text-secondary-15",
                "max-xl:text-[3.2rem] max-xl:leading-[1.4] max-xl:tracking-[-0.06rem]",
              )}
            >
              3분만에 끝내보세요
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
              "[&>span]:flex [&>span]:items-center",
              "max-xl:[&>span]:!text-body1-bold16",
              "xl:[&>span]:!text-title3-semi24",
            )}
          >
            설레는 여행 준비 시작하기
            <div
              className={cn(
                "max-xl:h-[2.4rem] max-xl:w-[2.4rem]",
                "xl:h-[3.2rem] xl:w-[3.2rem]",
              )}
            >
              <IcArrowRight className="h-full w-full" />
            </div>
          </Button>
        </Link>
      </div>

      <div className={cn("w-full max-w-[100.5rem]", "max-xl:max-w-[31.2rem]")}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "h-full w-full rounded-t-[1.8rem] border-white object-cover shadow-[9px_22px_50px_0px_rgba(0,0,0,0.25)]",
            "xl:border-8 xl:border-b-0",
            "max-xl:rounded-t-[0.4rem] max-xl:border-[0.3rem] max-xl:border-b-0",
          )}
        >
          <source src="/static/landing/landing-hero.webm" type="video/webm" />
        </video>
      </div>
    </LandingSectionContainer>
  );
};

export default HeroSection;
