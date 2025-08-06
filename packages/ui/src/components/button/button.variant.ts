import { cva } from "class-variance-authority";

export const button = cva(
  "flex cursor-pointer items-center gap-[0.8rem] rounded-[1.2rem] transition-colors duration-200 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        xxs: "px-[1.2rem] py-[0.6rem]",
        xs: "px-[0.8rem] py-[0.6rem]",
        sm: "gap-[0.4rem] px-[0.6rem] py-[0.6rem]",
        md: "px-[1.6rem] py-[0.8rem]",
        lg: "px-[2.4rem] py-[1.2rem]",
        sticky: "px-[7.6rem] py-[1.2rem]",
      },
      variant: {
        primary:
          "border-none bg-primary text-primary-100 hover:bg-primary-60 focus:bg-primary-50 active:bg-primary-40 disabled:cursor-not-allowed disabled:bg-neutral-90 disabled:text-neutral-70",
        secondary:
          "border-none bg-secondary-95 text-secondary-40 hover:bg-secondary-90 hover:text-secondary-35 focus:bg-secondary-80 focus:text-secondary-30 active:bg-secondary-70 active:text-secondary-25 disabled:cursor-not-allowed disabled:bg-neutral-90 disabled:text-neutral-70",
        text: "border-none bg-transparent text-neutral-40 hover:bg-neutral-variant-98 hover:text-neutral-40 focus:bg-neutral-variant-90 focus:text-neutral-25 active:bg-neutral-variant-95 active:text-neutral-40 disabled:cursor-not-allowed",
        round: "rounded-[4.8rem] px-[1.2rem] py-[0.6rem]",
        black:
          "bg-neutral-variant-20 text-primary-100 focus:bg-neutral-variant-35",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
    compoundVariants: [
      {
        variant: "round",
        selected: true,
        class: "border-[0.1rem] bg-primary-5 text-primary-100",
      },
      {
        variant: "round",
        selected: false,
        class:
          "border-[0.1rem] border-neutral-90 bg-neutral-100 text-neutral-35 hover:border-neutral-90 hover:bg-neutral-95 hover:text-neutral-40 focus:bg-neutral-90",
      },
      {
        variant: "text",
        size: "lg",
        class: "text-secondary-50",
      },
    ],
  },
);

export const buttonText = cva("m-0 text-center", {
  variants: {
    size: {
      xxs: "text-caption1-semi12",
      xs: "text-body2-semi14",
      sm: "text-body2-medi14",
      md: "text-body3-semi15",
      lg: "text-body1-bold16",
      sticky: "text-body1-bold16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
