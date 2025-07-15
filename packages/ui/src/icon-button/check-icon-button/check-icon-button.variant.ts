import { cva } from "class-variance-authority";

export const checkButton = cva(
  "flex items-center transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "h-[2rem] w-[2rem] rounded-[0.4rem] border-[1.25px] p-[1.67px]",
        md: "h-[2.4rem] w-[2.4rem] rounded-[0.4rem] border-[1.5px] p-[2px]",
      },
      selected: {
        true: "border-none bg-primary-70 hover:bg-primary-60 focus:bg-primary-50",
        false:
          "border-neutral-80 bg-neutral-100 hover:border-neutral-70 hover:bg-neutral-98 focus:border-neutral-70 focus:bg-neutral-95",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  },
);
