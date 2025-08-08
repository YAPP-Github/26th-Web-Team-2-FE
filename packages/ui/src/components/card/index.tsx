import type { PropsWithChildren } from "react";
import IcAddMemo from "@/assets/icons/ic_add_memo.svg?react";
import IcInfo from "@/assets/icons/ic_info.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcMemo from "@/assets/icons/ic_memo.svg?react";
import IcWalker from "@/assets/icons/ic_walker.svg?react";
import { Button } from "@/components/button";
import { Chip } from "@/components/chip";
import { AddIconButton } from "@/components/icon-button/add-icon-button";
import { DeleteIconButton } from "@/components/icon-button/delete-icon-button";
import { ImageCard } from "@/components/image-card";
import TextWithIcon from "@/components/text-with-icon";
import { cn } from "@/utils";
import { card } from "./card.variant";

type TransportInfo = {
  distance?: string;
  time?: string;
};

type Attraction = {
  name?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  distance?: string;
  byFoot?: TransportInfo;
  byCar?: TransportInfo;
};

export type CardProps = PropsWithChildren<{
  className?: string;
  selected: boolean;
  onClick?: () => void;
  onAddClick: () => void;
  onDeleteClick: () => void;

  images: string[];
  address: string;
  url: string;
  logoUrl: string;
  siteName: string;
  accommodationName: string;
  currency: string;
  nearbyAttractions: Attraction[];
  savedByText: string;
  memo?: string;

  // Optional props for next Image
  imageAs?: React.ElementType;
  logoAs?: React.ElementType;
}>;

export const Card = ({
  className,
  selected,
  onAddClick,
  onDeleteClick,
  images,
  logoUrl,
  url,
  siteName,
  accommodationName,
  currency,
  address,
  nearbyAttractions,
  savedByText,
  memo,
  imageAs,
  logoAs,
  ...props
}: CardProps) => {
  return (
    <section className={cn(card({ selected }), className)} {...props}>
      {/* 카드 좌측 호텔 썸네일 */}
      <div className="relative h-[16.4rem] w-[19.9rem] rounded-[1.2rem] border-[rgba(152,152,152,0.10)]">
        <ImageCard
          as={imageAs}
          className="h-full w-full rounded-[1.2rem] object-cover"
          src={images?.[0]}
          width={199}
          height={164}
          alt="thumb-nail-img"
        />
        <span className="absolute top-[0.8rem] right-[0.8rem] z-1 rounded-[0.4rem] bg-[rgba(21,29,25,0.70)] px-[0.6rem] py-[0.4rem] text-caption1-medi12 text-primary-100">
          {savedByText}
        </span>
        <div className="absolute bottom-0 z-1 flex w-[-webkit-fill-available] items-center gap-[0.8rem] rounded-br-[1.2rem] rounded-bl-[1.2rem] bg-[linear-gradient(87deg,_rgba(0,0,0,0.6)_0%,_rgba(72,72,72,0.6)_100%)] px-[1.2rem] py-[0.8rem]">
          <ImageCard
            as={logoAs}
            className="h-[3.2rem] w-[3.2rem] rounded-full object-cover"
            src={logoUrl}
            alt={siteName}
          />
          <a
            href={url}
            className="text-caption1-semi12 text-primary-100 no-underline"
          >
            {siteName}
          </a>
        </div>
      </div>
      {/* 카드 중앙 호텔 info */}
      <article className="flex flex-col justify-between">
        <header>
          {/* 호텔명/ 가격 정보 */}
          <div className="flex flex-col gap-[0.4rem]">
            <h1 className="m-0 w-[30.3rem] overflow-hidden truncate text-ellipsis whitespace-nowrap text-heading2-semi18 text-neutral-30">
              {accommodationName}
            </h1>
            <div className="flex flex-row items-center gap-[0.8rem]">
              <p className="m-0 text-heading1-semi20 text-neutral-variant-20">
                {`${currency?.toLocaleString()}원`}
              </p>
              <TextWithIcon
                icon={
                  <IcInfo
                    width="20px"
                    height="20px"
                    className="text-secondary-70"
                  />
                }
                className="flex-row-reverse gap-[0.2rem]"
              >
                <TextWithIcon.Text className="text-caption2-regular11 text-neutral-60">
                  1박 당 요금
                </TextWithIcon.Text>
              </TextWithIcon>
            </div>
          </div>
          <div className="mt-[8px] flex flex-col gap-[0.8rem]">
            <TextWithIcon
              icon={
                <IcLocation
                  width="20px"
                  height="20px"
                  className="text-secondary-50"
                />
              }
              className="w-[30.3rem] gap-[0.2rem]"
            >
              <TextWithIcon.Text className="text-caption1-medi12 text-neutral-40">
                {address}
              </TextWithIcon.Text>
            </TextWithIcon>
            {/* 인근 관광지 정보 */}
            <ul className="m-0 flex list-none flex-row items-center p-0">
              {nearbyAttractions?.map((attraction, _index) => (
                <li
                  key={attraction.name}
                  className="flex flex-row items-center"
                >
                  <Chip
                    size="xs"
                    text={attraction.name || "-"}
                    icon={<IcWalker width="12px" height="12px" />}
                    additionalText={`${attraction.distance || "-"}분`}
                  />
                  {_index !== nearbyAttractions.length - 1 && (
                    <hr className="mx-[0.4rem] h-[0.2rem] w-[0.2rem] rounded-full border-none bg-neutral-80" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </header>
        {/* 메모 내용 */}
        {memo && (
          <TextWithIcon
            icon={
              <IcMemo
                width="16px"
                height="16px"
                className="text-secondary-50"
              />
            }
            className="w-[30.3rem] gap-[0.4rem]"
          >
            <TextWithIcon.Text className="text-body2-medi14 text-neutral-variant-70">
              {memo}
            </TextWithIcon.Text>
          </TextWithIcon>
        )}
        {!memo && (
          <Button
            variant="text"
            size="sm"
            icon={<IcAddMemo width="16px" height="16px" />}
            className="w-[6rem]"
          >
            메모
          </Button>
        )}
      </article>
      <div className="flex flex-col gap-[1.6rem]">
        <AddIconButton type="button" selected={selected} onClick={onAddClick} />
        {!selected && (
          <div className="hidden group-hover:block">
            <DeleteIconButton type="button" onClick={onDeleteClick} />
          </div>
        )}
      </div>
    </section>
  );
};
