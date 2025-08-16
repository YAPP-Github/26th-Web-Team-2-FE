"use client";
import { type MouseEvent, useRef, useState } from "react";
import { useOutsideClickEffect } from "react-simplikit";
import IcBookmark from "@/assets/icons/ic_bookmark.svg?react";
import IcDelete from "@/assets/icons/ic_delete.svg?react";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcExit from "@/assets/icons/ic_exit.svg?react";
import IcInvite from "@/assets/icons/ic_invite.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcMore from "@/assets/icons/ic_more.svg?react";
import { cn } from "@/index";
import ActionOption from "../action-option";
import ProfileGroup from "../avatar-profile-group";
import TextWithIcon from "../text-with-icon";

export type Participant = {
  userId: number;
  profileImageUrl: string;
  nickname: string;
};

export interface TravelBoardProps {
  data: {
    boardId: number;
    boardName: string;
    destination: string;
    startDate: string;
    endDate: string;
    participantCount: number;
    participants: Participant[];
    accommodationCount: number;
  };
  className?: string;

  onInviteClick: () => void;
  onEditClick: () => void;
  onExitClick: () => void;
  onDeleteClick: () => void;
}

const TravelBoard = ({
  data,
  className,
  onDeleteClick,
  onEditClick,
  onExitClick,
  onInviteClick,
}: TravelBoardProps) => {
  const {
    boardName,
    destination,
    startDate,
    endDate,
    participants,
    accommodationCount,
  } = data;
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
        `relative flex min-h-[24.2rem] min-w-[38.4rem] flex-col rounded-[1.6rem] pt-[2.4rem] pr-[2.8rem] pb-[2.4rem] pl-[3.2rem]`,
        `border border-neutral-90 bg-neutral-99`,
        `hover:border-neutral-80 hover:bg-neutral-98`,
        moreHover && "border hover:border-secondary-90 hover:bg-neutral-99",
        className,
      )}
    >
      {/* 헤더 정보 */}
      <header className="flex w-full flex-row justify-between">
        <div className="flex items-center gap-[0.8rem]">
          <span className="flex gap-[0.4rem] rounded-[0.4rem] bg-neutral-95 px-[0.8rem] py-[0.4rem] text-caption1-medi14 text-neutral-60">
            <p>{startDate}</p>
            <p>~</p>
            <p>{endDate}</p>
          </span>
          <TextWithIcon
            icon={
              <IcBookmark width={16} height={16} className="text-neutral-60" />
            }
          >
            <TextWithIcon.Text className="text-caption1-medi14 text-neutral-60">
              {`${accommodationCount}곳 저장됨`}
            </TextWithIcon.Text>
          </TextWithIcon>
        </div>
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
            <ActionOption.Option
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onInviteClick();
              }}
              icon={<IcInvite />}
            >
              멤버 초대하기
            </ActionOption.Option>
            <ActionOption.Option
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEditClick();
              }}
              icon={<IcEdit />}
            >
              수정하기
            </ActionOption.Option>
            <ActionOption.Option
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onExitClick();
              }}
              icon={<IcExit />}
            >
              나가기
            </ActionOption.Option>
            <ActionOption.Option
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDeleteClick();
              }}
              icon={<IcDelete />}
            >
              삭제하기
            </ActionOption.Option>
          </ActionOption.Menu>
        </div>
      </header>
      {/* 제목 + 여행지 */}
      <div className="flex flex-col gap-[1.2rem]">
        <h1 className="text-neutral-20 text-title3-semi24">{boardName}</h1>
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
          <TextWithIcon.Text className="text-body1-medi16 text-neutral-50">
            {destination}
          </TextWithIcon.Text>
        </TextWithIcon>
      </div>
      {/* 참여자 */}
      <div className="mt-[3.6rem]">
        <ProfileGroup size={40} profiles={participants} />
      </div>
    </section>
  );
};

export default TravelBoard;
