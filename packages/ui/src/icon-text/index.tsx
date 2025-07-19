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
  typo,
  color,
  className = "",
}: IconTextProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {icon}
      <span className={`${typo} ${color} w-full truncate`}>{text}</span>
    </div>
  );
};

export default IconText;
