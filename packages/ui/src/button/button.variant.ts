export const sizeClasses = {
  md: "px-[1.6rem] py-[0.8rem] text-[1.5rem] font-Pretendard font-bold leading-[150%]", // TOD: 디자인 폰트 추가후 , 변경 필요
  lg: "px-[2.4rem] py-[1.2rem] text-[1.6rem] font-Pretendard font-bold leading-[150%]", // TOD: 디자인 폰트 추가후 , 변경 필요
};

export const variantClasses = {
  primary: {
    base: "bg-primary text-primary-100",
    hover: "hover:bg-primary-60",
    focus: "focus:bg-primary-50",
    active: "active:bg-primary-40",
    disabled:
      "disabled:bg-neutral-90 disabled:text-neutral-70 disabled:cursor-not-allowed",
  },
  secondary: {
    base: "bg-secondary-95 text-secondary-40",
    hover: "hover:bg-secondary-90 hover:text-secondary-35",
    focus: "focus:bg-secondary-80 focus:text-secondary-30",
    active: "active:bg-secondary-70 active:text-secondary-25",
    disabled:
      "disabled:bg-neutral-90 disabled:text-neutral-7 disabled:cursor-not-allowed",
  },
};
export const buttonClasses = {
  size: sizeClasses,
  variant: variantClasses,
};
