import { Button, IcArrowLeft, IcPerson } from "@ssok/ui";
import { formatDate } from "@/shared/utils/date";
import { useBoardData } from "../../hooks/use-board-data";

const HeaderSection = () => {
  const { boardName, place, startDate, endDate, members } = useBoardData();
  return (
    <header className="flex w-full items-center justify-between p-2 pr-8 pl-2">
      {/* 헤더 좌측  */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="flex items-center gap-[0.8rem]">
          <IcArrowLeft width={24} height={24} className="text-neutral-40" />
          <span className="text-body1-medi16 text-neutral-25">{boardName}</span>
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <p className="text-body2-semi14 text-neutral-60">{place}</p>
          <div className="flex gap-[0.4rem] rounded-[0.4rem] bg-neutral-95 px-[0.8rem] py-[0.3rem] text-caption1-medi12 text-neutral-60">
            <p>{formatDate(new Date(startDate), { format: "YY.MM.DD" })}</p>
            <p>~</p>
            <p>{formatDate(new Date(endDate), { format: "YY.MM.DD" })}</p>
          </div>
        </div>
      </div>
      {/* 헤더 우측 */}
      <div className="flex gap-[0.8rem]">
        <span className="flex items-center">
          <IcPerson width={16} height={16} className="text-neutral-40" />
          <p className="text-body2-semi14 text-neutral-40">{members.length}</p>
        </span>
        <Button size="xxs" variant="black">
          초대하기
        </Button>
      </div>
    </header>
  );
};

export default HeaderSection;
