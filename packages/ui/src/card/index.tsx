import type { PropsWithChildren } from "react";
import IcInfo from "@/assets/icons/ic_info.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcMemo from "@/assets/icons/ic_memo.svg?react";
import IcWalker from "@/assets/icons/ic_walker.svg?react";
import IconText from "@/icon-text";

export type CardProps = PropsWithChildren<{
  className?: string;
  selected: boolean;
  imgSrc: string;
}>;

export const Card = ({ className, imgSrc, ...props }: CardProps) => {
  return (
    <section className="inline-flex gap-[1.6rem] rounded-[1.6rem] bg-neutral-100 p-[1.6rem]">
      {/* 카드 좌측 호텔 썸네일 */}
      <div className="relative h-[16.4rem] w-[19.9rem] rounded-[1.2rem] border-[rgba(152,152,152,0.10)]">
        <img
          className="h-full w-full rounded-[1.2rem] object-cover"
          src="https://pix8.agoda.net/hotelImages/942/942521/942521_17021009050050901364.jpg?ca=6&ce=1&s=312x235&ar=16x9"
          alt="thumb-nail-img"
        />
        <span className="absolute top-[0.8rem] right-[0.8rem] z-1 rounded-[0.4rem] bg-[rgba(21,29,25,0.70)] px-[0.6rem] py-[0.4rem] text-caption1-medi12 text-primary-100">
          저장한 사람
        </span>
        <div className="absolute bottom-0 z-1 flex w-[-webkit-fill-available] gap-[0.8rem] rounded-br-[1.2rem] rounded-bl-[1.2rem] bg-[linear-gradient(87deg,_rgba(0,0,0,0.6)_0%,_rgba(72,72,72,0.6)_100%)] px-[1.2rem] py-[0.8rem]">
          <img
            className="h-[3.2rem] w-[3.2rem] rounded-full"
            src="https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg"
            alt="출처 사이트명"
          />
          <p className="text-caption1-semi12 text-primary-100">
            출처 사이트명 (리디렉션)
          </p>
        </div>
      </div>
      {/* 카드 중앙 호텔 info */}
      <article className="flex flex-col justify-between">
        <header>
          {/* 호텔명/ 가격 정보 */}
          <div className="flex flex-col gap-[0.4rem]">
            <h1 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-heading2-semi18 text-neutral-30">
              호텔명 호텔명 호텔명 호텔명
            </h1>
            <div className="flex flex-row items-center gap-[0.8rem]">
              <p className="m-0 text-heading1-semi20 text-neutral-variant-20">
                000,000,000,000원
              </p>
              <IconText
                text="1박 당 요금"
                color="text-neutral-60"
                typo="text-caption2-regular11"
                icon={<IcInfo width="20px" height="20px" />}
                gap="2px"
                className="flex-row-reverse"
              />
            </div>
          </div>
          <div className="mt-[8px] flex flex-col gap-[0.8rem]">
            <IconText
              text="주소 주소 주소 주소 주소 주소"
              color="text-neutral-40"
              typo="text-caption1-medi12"
              icon={<IcLocation width="20px" height="20px" />}
              gap="2px"
            />
            {/* 인근 관광지 정보 */}
            <div className="flex flex-row items-center gap-[0.8rem]">
              <IconText
                text="인근 관광지 00분"
                color="text-neutral-40"
                typo="text-caption1-medi12"
                icon={<IcWalker width="12px" height="12px" />}
                gap="2px"
                className="p-[0.4rem]"
              />
              <IconText
                text="인근 관광지 00분"
                color="text-neutral-40"
                typo="text-caption1-medi12"
                icon={<IcWalker width="12px" height="12px" />}
                gap="2px"
                className="p-[0.4rem]"
              />
            </div>
          </div>
        </header>
        <IconText
          text="메모 메모 메모 메모 메모 메모 메모 메모 메모 메모"
          color="text-secondary-50"
          typo="text-body2-medi14"
          icon={<IcMemo width="16px" height="16px" />}
          gap="4px"
        />
      </article>
    </section>
  );
};
