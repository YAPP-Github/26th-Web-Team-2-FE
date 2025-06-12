import type { SVGProps } from "react";

const SvgIcArrowNext = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <rect
      width={19}
      height={19}
      x={0.5}
      y={0.5}
      fill="#fff"
      stroke="#E1DFDD"
      rx={5.5}
    />
    <path stroke="#A19F9D" d="m7.5 15.5 5-5-5-5" />
  </svg>
);
export default SvgIcArrowNext;
