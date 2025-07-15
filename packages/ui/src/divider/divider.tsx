import type { BgColor } from "@/constant";

export type DividerProps = {
  color: BgColor;
  width: string;
  height: string;
  className?: string;
};

const Divider = ({ color, width, height, className = "" }: DividerProps) => {
  return <div className={`${width} ${height} ${color} ${className}`} />;
};

export default Divider;
