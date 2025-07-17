import { cva } from "class-variance-authority";

export const NormalIconButton = cva(
  [
    "flex items-center border-none",
    "bg-transparent hover:bg-neutral-98 focus:bg-neutral-95",
  ],
  {
    variants: {
      size: {
        sm: "rounded-[6.667px] p-[0.5rem]",
        md: "rounded-[0.8rem] p-[0.6rem]",
        lg: "rounded-[1.2rem] p-[0.8rem]",
      },
    },
  },
);
