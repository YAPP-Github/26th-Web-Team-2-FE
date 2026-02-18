"use client";
import type React from "react";
import { cn } from "@/utils";
import { card } from "../card/card.variant";

export interface CardSkeletonProps {
  className?: string;
  selected?: boolean;
}

const SkeletonBar = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-[0.6rem] bg-neutral-80",
      className,
    )}
  >
    <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

const Circle = ({ className }: { className?: string }) => (
  <div
    className={cn("animate-pulse rounded-full bg-neutral-75", className)}
    aria-hidden
  />
);

const DotDivider = () => (
  <span className="mx-[0.4rem] inline-block h-[0.2rem] w-[0.2rem] rounded-full bg-neutral-80" />
);

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  selected = false,
}) => {
  return (
    <section
      className={cn(card({ selected }), className, "overflow-hidden")}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative h-[16.4rem] w-[19.9rem] rounded-[1.2rem] border-[rgba(152,152,152,0.10)]">
        <div className="h-full w-full animate-pulse rounded-[1.2rem] bg-neutral-90" />

        <div className="absolute top-[0.8rem] right-[0.8rem] z-elevated rounded-[0.4rem] bg-[rgba(84,84,84,0.7)] px-[0.6rem] py-[0.4rem]">
          <div className="h-[1.6rem] w-[5.8rem]" />
        </div>

        <div className="absolute bottom-0 z-elevated flex w-[-webkit-fill-available] items-center gap-[0.8rem] rounded-b-[1.2rem] bg-[linear-gradient(87deg,_rgba(0,0,0,0.6)_0%,_rgba(72,72,72,0.6)_100%)] px-[1.2rem] py-[0.8rem]">
          <Circle className="h-[3.2rem] w-[3.2rem]" />
        </div>
      </div>

      <article className="flex flex-col justify-between">
        <header>
          <div className="flex flex-col gap-[0.4rem]">
            <SkeletonBar className="h-[2.2rem] w-[30.3rem]" />

            <div className="flex flex-row items-center gap-[0.8rem]">
              <SkeletonBar className="h-[2.0rem] w-[9rem]" />
              <div className="flex items-center gap-[0.4rem]">
                <Circle className="h-[2rem] w-[2rem]" />
                <SkeletonBar className="h-[1.1rem] w-[6rem]" />
              </div>
            </div>
          </div>

          <div className="mt-[8px] flex flex-col gap-[0.8rem]">
            <div className="flex items-center gap-[0.4rem]">
              <Circle className="h-[2rem] w-[2rem]" />
              <SkeletonBar className="h-[1.2rem] w-[24rem]" />
            </div>

            <ul className="m-0 flex list-none flex-row items-center p-0">
              <li className="flex flex-row items-center">
                <SkeletonBar className="h-[2rem] w-[8rem] rounded-[999px]" />
                <DotDivider />
              </li>
              <li className="flex flex-row items-center">
                <SkeletonBar className="h-[2rem] w-[7rem] rounded-[999px]" />
                <DotDivider />
              </li>
              <li className="flex flex-row items-center">
                <SkeletonBar className="h-[2rem] w-[9rem] rounded-[999px]" />
              </li>
            </ul>
          </div>
        </header>

        <div className="mt-[0.4rem] flex items-center gap-[0.6rem]">
          <Circle className="h-[1.6rem] w-[1.6rem]" />
          <SkeletonBar className="h-[1.4rem] w-[18rem]" />
        </div>
      </article>

      <div className="flex flex-col gap-[1.6rem]">
        {/* Add button */}
        <div className="flex items-center justify-center">
          <Circle className="h-[4rem] w-[4rem]" />
        </div>
        <div className="hidden group-hover:block">
          <Circle className="h-[4rem] w-[4rem]" />
        </div>
      </div>
    </section>
  );
};

export default CardSkeleton;
