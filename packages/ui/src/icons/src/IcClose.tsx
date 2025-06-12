import type { SVGProps } from "react";

const SvgIcClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <path
      stroke="#999"
      strokeLinecap="round"
      strokeWidth={1.333}
      d="M13.333 3.166 2.667 13.833M2.667 3.166l10.667 10.667"
    />
  </svg>
);
export default SvgIcClose;
