import plugin_ from "tailwindcss/plugin";
import { theme } from "@/theme";

export const plugin = plugin_(() => {}, {
  theme: { extend: theme },
});
