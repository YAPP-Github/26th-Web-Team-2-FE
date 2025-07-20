import type { BgColor } from "@/constant";

export type DividerProps = {
  color: BgColor;
  width: string; // w-[npx] 형식
  height: string; // h-[npx] 형식
  className?: string;
};

const Divider = ({ color, width, height, className = "" }: DividerProps) => {
  return <div className={`${width} ${height} ${color} ${className}`} />;
};

export default Divider;
