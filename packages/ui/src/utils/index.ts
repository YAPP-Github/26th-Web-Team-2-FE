import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "title1-semi36",
        "title2-medi28",
        "title3-bold24",
        "heading1-semi20",
        "heading2-semi18",
        "heading2-medi18",
        "body1-semi16",
        "body1-medi16",
        "body1-regular16",
        "body2-medi14",
        "body2-regular14",
        "caption1-semi12",
        "caption1-medi12",
        "caption2-medi11",
        "caption2-regular11",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
