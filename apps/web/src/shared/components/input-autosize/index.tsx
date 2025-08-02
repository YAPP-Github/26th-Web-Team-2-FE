import { cn } from "@ssok/ui";
import type { ComponentProps } from "react";

const InputAutosize = ({
  value,
  className,
  ...props
}: ComponentProps<"input">) => {
  return (
    <div className={cn("grid", className)}>
      <span className="invisible [grid-area:1/1]">
        {!String(value) && "\u00A0"}
        {String(value).replace(/ /g, "\u00A0")}
      </span>
      <input
        size={1}
        type="text"
        value={value}
        className="[grid-area:1/1]"
        {...props}
      />
    </div>
  );
};

export default InputAutosize;
