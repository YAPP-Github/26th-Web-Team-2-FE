"use client";

import { type MouseEvent, useRef, useState } from "react";
import { useOutsideClickEffect } from "react-simplikit";
import IcDelete from "@/assets/icons/ic_delete.svg?react";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcMore from "@/assets/icons/ic_more.svg?react";
import IcShare from "@/assets/icons/ic_share.svg?react";
import { cn } from "@/utils";
import ActionOption from "../action-option";

export interface TileProps {
  data: {
    tableName: string;
    accommodationCount: number;
    accommodationNames: string[];
    lastModifiedAt: string;
  };

  onEditClick: () => void;
  onDeleteClick: () => void;
  onShareClick: () => void;
}

const Tile = ({
  data,
  onEditClick,
  onDeleteClick,
  onShareClick,
}: TileProps) => {
  const { tableName, accommodationCount, accommodationNames, lastModifiedAt } =
    data;
  const [moreHover, setMoreHover] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  useOutsideClickEffect(dropdownWrapperRef.current, () => {
    handleDropdownClose();
  });

  return (
    <section
      className={cn(
        `relative flex items-center rounded-[1.6rem] p-[2.4rem] py-[2rem] pl-[2rem]`,
        `border border-neutral-95 bg-neutral-100`,
        `hover:border-neutral-80 hover:bg-neutral-98`,
        moreHover &&
          "border hover:border-neutral-variant-90 hover:bg-neutral-98",
      )}
    >
      <h1 className="w-[258px] overflow-ellipsis text-heading2-medi18 text-neutral-20">
        {tableName}
      </h1>
      <div className="flex items-center gap-[0.8rem]">
        {/* 호텔명 외 n 곳 */}
        <span className="flex text-caption1-medi12 text-neutral-60">
          <p className="w-[9.7rem] overflow-hidden text-ellipsis whitespace-nowrap">
            {accommodationNames[0]}
          </p>
          <p className=" whitespace-nowrap">외 {accommodationCount - 1} 곳</p>
        </span>
        {/* 수정일 */}
        <span className="whitespace-nowrap rounded-[0.4rem] bg-neutral-95 px-[0.8rem] py-[0.3rem] text-caption1-medi12 text-neutral-60">
          최근 수정일 {lastModifiedAt}
        </span>
        <div ref={dropdownWrapperRef}>
          <button
            type="button"
            onMouseEnter={() => setMoreHover(true)}
            onMouseLeave={() => setMoreHover(false)}
            onClick={handleDropdownToggle}
            className="rounded-[1.2rem] p-[0.8rem] hover:bg-neutral-98 focus:bg-neutral-95"
          >
            <IcMore width={32} height={32} className="text-neutral-50" />
          </button>
          {/* 드롭다운 */}
          <ActionOption.Menu isOpen={isDropdownOpen}>
            <ActionOption.Option onClick={onShareClick} icon={<IcShare />}>
              공유하기
            </ActionOption.Option>
            <ActionOption.Option onClick={onEditClick} icon={<IcEdit />}>
              수정하기
            </ActionOption.Option>
            <ActionOption.Option onClick={onDeleteClick} icon={<IcDelete />}>
              삭제하기
            </ActionOption.Option>
          </ActionOption.Menu>
        </div>
      </div>
    </section>
  );
};

export default Tile;
