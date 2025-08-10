import plugin_ from "tailwindcss/plugin";
import { theme } from "@/theme";

export const plugin = plugin_(
  ({ addUtilities }) => {
    addUtilities({
      ".scrollbar-hide": {
        /* IE and Edge */
        "-ms-overflow-style": "none",
        /* Firefox */
        "scrollbar-width": "none",
        /* Safari and Chrome */
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
      ".scrollbar-default": {
        /* IE and Edge */
        "-ms-overflow-style": "auto",
        /* Firefox */
        "scrollbar-width": "auto",
        /* Safari and Chrome */
        "&::-webkit-scrollbar": {
          display: "block",
        },
      },
    });
  },
  {
    theme: { extend: theme },
  },
);
