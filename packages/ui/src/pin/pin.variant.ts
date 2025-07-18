import { cva } from "class-variance-authority";

export const chip = cva(
  [
    "flex w-fit items-center gap-[0.2rem] rounded-[0.4rem] border-none px-[0.4rem] py-[0.3rem] transition-colors duration-200",
  ],
  {
    variants: {
      size: {
        xs: "text-caption2-medi11 text-neutral-50 hover:text-neutral-50 focus:text-neutral-50",
        md: "text-body2-medi14 text-neutral-50 hover:text-neutral-60 focus:text-neutral-variant-50",
      },
      icon: {
        true: "bg-neutral-98 hover:bg-neutral-95 focus:bg-neutral-variant-95",
        false: "bg-neutral-98 hover:bg-neutral-95 focus:bg-neutral-variant-90",
      },
    },
  },
);
