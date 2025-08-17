import { cn } from "@/utils";

export interface SwitchProps {
  className?: string;
  onChange: (checked: boolean) => void;
  isActive: boolean;
}

const Switch = ({ onChange, isActive }: SwitchProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!isActive)}
      className={cn(
        `h-[3.2rem] w-[5.6rem]`,
        `relative flex items-center rounded-full p-[0.4rem] transition-colors`,
        isActive ? "bg-primary" : "bg-neutral-90",
      )}
    >
      <div
        className={cn(
          `h-[2.4rem] w-[2.4rem]`,
          `rounded-full bg-primary-100 transition-transform`,
          isActive ? "translate-x-[2.4rem]" : "translate-x-0",
        )}
      />
    </button>
  );
};

export default Switch;
