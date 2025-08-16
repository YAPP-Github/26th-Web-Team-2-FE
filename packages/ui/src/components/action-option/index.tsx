import { cn } from "@/utils";

interface DropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
}

interface DropdownOptionProps {
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const DropdownMenu = ({ isOpen, children }: DropdownProps) => {
  if (!isOpen) return null;

  return (
    <ul className="absolute top-[7.3rem] right-0 z-1 flex flex-col items-start gap-[0.8rem] rounded-[1.2rem] border border-neutral-70 bg-primary-100 p-[0.8rem] shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]">
      {children}
    </ul>
  );
};

const DropdownOption = ({ onClick, children, icon }: DropdownOptionProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };
  return (
    <li
      className={cn(
        "flex w-full gap-[0.8rem] rounded-[0.8rem] px-[1.2rem] py-[0.8rem] text-body1-medi16",
        "bg-primary-100 text-neutral-20",
        "hover:bg-neutral-95 active:bg-neutral-90",
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {icon}
      {children}
    </li>
  );
};

const ActionOption = {
  Menu: DropdownMenu,
  Option: DropdownOption,
};

export default ActionOption;
