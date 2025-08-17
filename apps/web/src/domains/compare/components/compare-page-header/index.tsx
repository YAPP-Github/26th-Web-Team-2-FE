import { cn } from "@ssok/ui";
import { formatDate } from "@/shared/utils/date";

export interface ComparePageHeaderProps {
  title: string;
  creator: string;
  createdAt: Date;
  count: number;
  className?: string;
}

const ComparePageHeader = ({
  title,
  creator,
  createdAt,
  count,
  className,
}: ComparePageHeaderProps) => {
  return (
    <header
      className={cn(
        "flex h-[4rem] items-center gap-[1.6rem] px-[0.8rem]",
        className,
      )}
    >
      <h2 className="text-heading2-medi18 text-neutral-50">{title}</h2>
      <div className="flex items-center gap-[1.2rem] text-body1-regular16 text-neutral-70">
        <div className="flex items-center gap-[0.4rem]">
          <div className="h-[1.6rem] w-[1.6rem] rounded-full bg-neutral-70" />
          <span>{creator}</span>
        </div>
        <Divider />
        <span>{formatDate(createdAt)} 생성</span>
        <Divider />
        <span>{count}곳 저장</span>
      </div>
    </header>
  );
};

const Divider = () => <div className="h-[1.2rem] w-px bg-neutral-70" />;

export default ComparePageHeader;
