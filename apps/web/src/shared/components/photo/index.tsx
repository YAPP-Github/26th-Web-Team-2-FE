"use client";

import { cn, IcArrowLeft, IcArrowRight, IconButton } from "@ssok/ui";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type { PropsWithChildren } from "react";

export interface PhotoProps {
  className?: string;
  state?: "default" | "edit" | "active";
  images: string[];
  imgAlt?: string;
  siteLink?: string;
  siteName: string;
  logoUrl: string;
  placeName: string;
}

const Photo = ({
  className,
  state = "default",
  images,
  imgAlt,
  siteName,
  logoUrl,
  siteLink,
  placeName,
}: PhotoProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[1.2rem] border",
        state === "active" && "border-4 border-primary",
        state !== "active" && "border border-[#989898]/10",
        className,
      )}
    >
      <div className="relative h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((imageSrc, index) => (
            <div
              key={imageSrc}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={imageSrc}
                alt={imgAlt || `${placeName} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      <PhotoButton
        onClick={() => emblaApi?.scrollPrev()}
        className="left-[0.8rem]"
      >
        <IcArrowLeft className="text-primary-100" />
      </PhotoButton>

      <PhotoButton
        onClick={() => emblaApi?.scrollNext()}
        className="right-[0.8rem]"
      >
        <IcArrowRight className="text-primary-100" />
      </PhotoButton>

      <div
        className={cn(
          "absolute bottom-0 z-10 w-full translate-y-full rounded-b-[1.2rem] bg-gradient-to-r from-neutral-0/36 to-[#272727]/48 px-[1.2rem] py-[0.8rem]",
          "transition-transform duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0",
          state === "active" && "translate-y-0",
        )}
      >
        <a
          href={siteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center"
        >
          <div className="relative mr-[0.8rem] flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#70737C]">
            <Image
              src={logoUrl}
              alt={siteName}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="cursor-pointer text-caption1-semi12 text-white">
            {siteName}
          </span>
        </a>
      </div>
    </div>
  );
};

const PhotoButton = ({
  onClick,
  children,
  className,
}: PropsWithChildren<{ onClick?: () => void; className?: string }>) => {
  return (
    <div
      className={cn(
        "-translate-y-1/2 absolute top-1/2 opacity-0 group-hover:opacity-100",
        "flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-[0.8rem] bg-[#272727]/50 backdrop-blur-[13.33px]",
        "transition-all hover:scale-105",
        className,
      )}
    >
      <IconButton
        type="button"
        size="sm"
        onClick={onClick}
        className="flex h-full w-full items-center justify-center bg-transparent p-0 hover:bg-transparent focus:bg-transparent"
      >
        {children}
      </IconButton>
    </div>
  );
};

export default Photo;
