import { cn, IcAddBox, IcInfo } from "@ssok/ui";
import type { ViewState } from "@/domains/compare/types";

interface AddCellProps {
  onClick?: () => void;
  state?: ViewState;
  className?: string;
}

const AddCell = ({ onClick, className }: AddCellProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mb-[1.6rem] flex h-full w-full cursor-pointer items-center justify-center rounded-[1.2rem] border-2 border-neutral-90 border-dashed bg-neutral-99 transition-colors hover:border-neutral-90 hover:bg-neutral-95",
        className,
      )}
    >
      <IcAddBox width="24" height="24" className="mr-[1rem] text-neutral-70" />
      <span className="mr-[0.2rem] text-body1-semi16 text-neutral-60">
        내용 보충하기
      </span>
      <IcInfo width="20" height="20" className="text-neutral-70" />
    </button>
  );
};

export default AddCell;
