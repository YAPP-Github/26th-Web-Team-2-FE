import { cva } from "class-variance-authority";

export const card = cva(
  "group inline-flex w-full gap-[1.6rem] rounded-[1.6rem]",
  {
    variants: {
      selected: {
        true: "border-[2px] border-secondary-90 bg-neutral-99 p-[1.5rem]",
        false:
          "border-[1px] border-neutral-100 bg-neutral-100 p-[1.6rem] hover:border-[1px] hover:border-neutral-90 hover:bg-neutral-98",
      },
    },
  },
);
