import type React from "react";
import type { TextColor, Typo } from "@/constant";

export type IconTextProps = {
  text: string;
  icon?: React.ReactNode;
  color: TextColor;
  typo: Typo;
  gap?: string;
  className?: string;
};

const IconText = ({
  text,
  icon,
  gap = "8px",
  typo,
  color,
  className = "",
}: IconTextProps) => {
  const textColor = `text-${color}`;
  return (
    <div className={`flex items-center gap-[${gap}px] ${className}`}>
      {icon}
      <span className={`${typo} ${textColor}`}>{text}</span>
    </div>
  );
};

export default IconText;
