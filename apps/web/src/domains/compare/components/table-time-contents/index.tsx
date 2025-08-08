import { TimePicker } from "@ssok/ui";
import SymbolTableTimeRightArrow from "@/domains/compare/assets/symbol_table_time_right_arrow.svg";
import type { ViewState } from "@/domains/compare/types";

interface TableTimeContentsProps {
  checkInAt: string | null; // "HH:MM"
  checkOutAt: string | null; // "HH:MM"
  onCheckInChange?: (time: string) => void; // "HH:MM"
  onCheckOutChange?: (time: string) => void; // "HH:MM"
  state?: ViewState;
}

const TableTimeContents = ({
  checkInAt,
  checkOutAt,
  onCheckInChange,
  onCheckOutChange,
  state,
}: TableTimeContentsProps) => {
  return (
    <section className="flex items-center justify-between overflow-hidden rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      <TimePicker
        value={checkInAt}
        onChange={(time) => onCheckInChange?.(time)}
        disabled={state !== "edit"}
        className="flex-1"
      />
      <span className="mx-[0.8rem] flex-shrink-0 text-neutral-60">
        <SymbolTableTimeRightArrow width="20" />
      </span>
      <TimePicker
        value={checkOutAt}
        onChange={(time) => onCheckOutChange?.(time)}
        disabled={state !== "edit"}
        className="flex-1"
      />
    </section>
  );
};

export default TableTimeContents;
