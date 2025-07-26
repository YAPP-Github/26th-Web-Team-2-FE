import { Button, cn, IcEdit, IcMap, IcShare } from "@ssok/ui";

interface ComparePageTitleProps {
  title: string;
  className?: string;
}

const ComparePageTitle = ({ title, className }: ComparePageTitleProps) => {
  return (
    <div
      className={cn("flex items-center justify-between px-[0.8rem]", className)}
    >
      <h1 className="text-neutral-30 text-title2-medi28">{title}</h1>
      <div className="flex gap-[0.8rem]">
        <Button
          size="lg"
          variant="text"
          icon={<IcMap width="20" height="20" />}
        >
          지도뷰
        </Button>
        <Button
          size="lg"
          variant="secondary"
          icon={<IcEdit width="20" height="20" />}
        >
          편집하기
        </Button>
        <Button
          size="lg"
          variant="primary"
          icon={<IcShare width="20" height="20" />}
        >
          공유하기
        </Button>
      </div>
    </div>
  );
};

export default ComparePageTitle;
