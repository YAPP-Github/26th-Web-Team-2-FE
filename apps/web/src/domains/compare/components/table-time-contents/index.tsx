import { IcClock } from "@ssok/ui";
import SymbolTableTimeRightArrow from "@/domains/compare/assets/symbol_table_time_right_arrow.svg";
import { formatTime } from "@/shared/utils/date";

interface TableTimeContentsProps {
  checkInAt: Date;
  checkOutAt: Date;
}

const TableTimeContents = ({
  checkInAt,
  checkOutAt,
}: TableTimeContentsProps) => {
  return (
    <section className="flex items-center overflow-hidden rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      <Time date={checkInAt} />
      <span className="flex-shrink-0 text-neutral-60">
        <SymbolTableTimeRightArrow width="20" />
      </span>
      <Time date={checkOutAt} />
    </section>
  );
};

const Time = ({ date }: { date: Date }) => {
  const { meridiem, time } = formatTime(date);

  return (
    <div className="flex items-center">
      <div className="mr-[0.4rem] flex gap-[0.6rem]">
        <p className="truncate text-body1-semi16 text-neutral-30">{meridiem}</p>
        <p className="truncate text-body1-semi16 text-neutral-30">{time}</p>
      </div>
      <span className="flex-shrink-0 text-neutral-60">
        <IcClock width="20" height="20" />
      </span>
    </div>
  );
};

export default TableTimeContents;
