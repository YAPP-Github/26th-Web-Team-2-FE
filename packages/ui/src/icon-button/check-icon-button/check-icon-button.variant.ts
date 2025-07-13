import { cva } from "class-variance-authority";

export const checkButton = cva("flex transition-colors duration-200", {
  variants: {
    size: {
      sm: null,
      md: null,
    },
    selected: {
      true: null,
      false: null,
    },
  },
  compoundVariants: [
    {
      size: "sm",
      selected: false,
      class:
        "h-[1.875rem] w-[1.875rem] rounded-[2.70833px] border-[1.25px] border-neutral-80 bg-primary-100",
    },
    {
      size: "sm",
      selected: true,
      class: "h-[2rem] w-[2rem] rounded-[4px] border-none bg-primary-70",
    },
    {
      size: "md",
      selected: false,
      class:
        "h-[2.25rem] w-[2.25rem] rounded-[3.25px] border-[1.5px] border-neutral-80 bg-primary-100 p-[0.4rem]",
    },
    {
      size: "md",
      selected: true,
      class:
        "h-[2.4rem] w-[2.4rem] rounded-[4px] border-none bg-primary-70 p-[0.4rem]",
    },
  ],
  defaultVariants: {
    size: "md",
    selected: false,
  },
});
