import { cva } from "class-variance-authority";

export const addbutton = cva(
  "flex items-center rounded-[1.2rem] border-none transition-colors duration-200",
  {
    variants: {
      selected: {
        true: "bg-neutral-variant-95 p-[0.4rem] hover:bg-neutral-variant-90 focus:bg-neutral-variant-80 focus:text-secondary-50",
        false: "bg-primary p-[0.4rem] hover:bg-primary-60 focus:bg-primary-50",
      },
    },
  },
);
