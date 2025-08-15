import { cn } from "@/utils";

export type PinProps = {
  className?: string;
  isActive: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Pin = ({ children, className, isActive, ...props }: PinProps) => {
  return (
    <button
      className={cn(
        // 본체 스타일
        "relative inline-flex items-center justify-center text-heading2-semi18 text-primary-5 shadow-[2px_4px_6px_0px_rgba(0,0,0,0.2)]",
        "rounded-[4.8rem] border border-neutral-70 bg-neutral-100 px-[1.6rem] py-[0.8rem]",
        "hover:border-neutral-60 focus:border-primary-5",
        "focus:bg-primary-5 focus:text-primary-100",

        // 꼬리 테두리 (before)
        "before:-translate-x-1/2 before:absolute before:bottom-[-10px] before:left-1/2",
        "before:z-0 before:h-0 before:w-0 before:content-['']",
        "before:border-x-[6px] before:border-t-[10px] before:border-b-0 before:border-solid",
        "before:border-x-transparent before:border-t-neutral-70",
        "hover:before:border-t-neutral-60",
        "focus:before:border-t-primary-5",

        // 꼬리 배경 (after)
        "after:-translate-x-1/2 after:absolute after:bottom-[-8px] after:left-1/2",
        "after:z-10 after:h-0 after:w-0 after:content-['']",
        "after:border-x-[5px] after:border-t-[9px] after:border-b-0 after:border-solid",
        "after:border-x-transparent after:border-t-neutral-100",
        "hover:after:border-t-neutral-100",
        "focus:after:border-t-primary-5",

        className,
        isActive &&
          "border-primary-5 bg-primary-5 text-primary-100 before:border-t-primary-5 after:border-t-primary-5 hover:after:border-t-primary-5",
      )}
      {...props}
    >
      <span className="block max-w-[25rem] overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
    </button>
  );
};
