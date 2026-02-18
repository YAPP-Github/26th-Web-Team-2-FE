import IcAdd from "@/assets/icons/ic_add.svg?react";
import { cn } from "@/index";

export interface ActionCardProps {
  onClick: () => void;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

const ActionCard = ({
  onClick,
  icon = <IcAdd className="size-8 shrink-0 text-neutral-70 max-xl:size-6" />,
  text = "새 여행 만들기",
  className,
}: ActionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex min-h-[24.2rem] w-full flex-col items-center justify-center gap-[0.8rem] rounded-[1.6rem]`,
        `border border-dashed`,
        `border-neutral-80 bg-neutral-98`,
        `hover:border-neutral-70 hover:bg-neutral-95`,
        `focus:border-neutral-70 focus:bg-neutral-95`,
        `active:border-neutral-variant-70 active:bg-neutral-variant-95`,
        `max-xl:h-[59px] max-xl:min-h-0 max-xl:flex-row`,
        className,
      )}
    >
      {icon}
      <p className="text-heading1-semi20 text-neutral-70">{text}</p>
    </button>
  );
};

export default ActionCard;
