import { cn, IcBookmark, IcLocation } from "dist";
import { IcMore } from "@/index";
import TextWithIcon from "../text-with-icon";

type Participant = {
  userId: number;
  profileImageUrl: string;
  nickname: string;
};

type TravelBoardProps = {
  onClick: () => void;
  data: {
    boardId: number;
    boardName: string;
    destination: string;
    startDate: string;
    endDate: string;
    participantCount: number;
    participants: Participant[];
  };
};

export const TravelBoard = ({ onClick, data, ...props }: TravelBoardProps) => {
  const {
    boardName,
    destination,
    startDate,
    endDate,
    // participantCount,
    // participants,
  } = data;

  return (
    <section
      className={cn(
        `flex min-h-[24.2rem] min-w-[38.4rem] flex-col rounded-[1.6rem] pt-[2.4rem] pr-[2.8rem] pb-[2.4rem] pl-[3.2rem]`,
        `border border-neutral-90 bg-neutral-99`,
      )}
      {...props}
    >
      {/* 헤더 정보 */}
      <header className="mt-[0.8rem] flex w-full flex-row justify-between">
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
              {`n곳 저장됨`}
            </TextWithIcon.Text>
          </TextWithIcon>
        </div>
        <button type="button" onClick={() => {}}>
          <IcMore width={32} height={32} className="text-neutral-50" />
        </button>
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
    </section>
  );
};
