import { theme } from "@ssok/tailwind-config";
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: Object.keys(theme?.fontSize ?? {}),
      color: Object.entries(theme?.colors ?? {}).flatMap(([key, value]) =>
        typeof value === "object" && value !== null
          ? Object.keys(value).map((scale) =>
              scale === "DEFAULT" ? key : `${key}-${scale}`,
            )
          : [key],
      ),
      shadow: Object.keys(theme?.boxShadow ?? {}),
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
