import { IcAddBox, IcInfo } from "@ssok/ui";
import type { ViewState } from "@/domains/compare/types";
import AddButton from "@/shared/components/add-button";

interface AddCellProps {
  onClick?: () => void;
  state?: ViewState;
  className?: string;
}

const AddCell = ({ onClick, className }: AddCellProps) => {
  return (
    <AddButton
      onClick={onClick}
      className={`mb-[1.6rem] h-full w-full ${className || ""}`}
    >
      <IcAddBox width="24" height="24" className="mr-[1rem] text-neutral-70" />
      <span className="mr-[0.2rem] text-body1-semi16 text-neutral-60">
        내용 보충하기
      </span>
      <IcInfo width="20" height="20" className="text-neutral-70" />
    </AddButton>
  );
};

export default AddCell;
