import IcAdd from "@/assets/icons/ic_add.svg?react";
import { cn } from "@/index";

type ActionCardProps = {
  onClick: () => void;
};

const ActionCard = ({ onClick, ...props }: ActionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex min-h-[24.2rem] min-w-[38.4rem] flex-col items-center justify-center gap-[0.8rem] rounded-[1.6rem]`,
        `border border-dashed`,
        `border-neutral-80 bg-neutral-98`,
        `hover:border-neutral-70 hover:bg-neutral-95`,
        `focus:border-neutral-70 focus:bg-neutral-95`,
        `active:border-neutral-variant-70 active:bg-neutral-variant-95`,
      )}
      {...props}
    >
      <IcAdd width={32} height={32} className="text-neutral-70" />
      <p className="text-heading1-semi20 text-neutral-70">새 여행 만들기</p>
    </button>
  );
};

export default ActionCard;
