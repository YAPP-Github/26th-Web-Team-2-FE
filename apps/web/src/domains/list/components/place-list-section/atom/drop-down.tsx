import { cn, IcArrowDown, IcCheckFill } from "@ssok/ui";
import { useRef } from "react";
import { filter } from "@/domains/list/hooks/use-dropdown";
import useOutsideClick from "@/domains/list/hooks/use-outside-click";

interface DropDownProps {
  handleFilterSelect: (id: string) => void;
  handleToggleDropdown: () => void;
  isOpen: boolean;
  selectedFilter: string;
}

export const DropDown = ({
  handleFilterSelect,
  handleToggleDropdown,
  isOpen,
  selectedFilter,
}: DropDownProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropDownRef, handleToggleDropdown, isOpen);

  return (
    <div ref={dropDownRef} className="relative">
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="flex flex-row gap-[0.4rem]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="정렬 기준 선택"
      >
        <span className="w-[4.8rem]">
          {filter.find((f) => f.id === selectedFilter)?.name}
        </span>
        <IcArrowDown />
      </button>
      {isOpen && (
        <ul
          aria-label="정렬 기준"
          className="absolute bottom-[-14.8rem] z-100 flex flex-col rounded-[1.2rem] border border-neutral-70 bg-neutral-100 p-[0.8rem]"
        >
          <span className="px-[1.6rem] py-[0.8rem]">
            <p className="text-body2-regular14 text-neutral-30">정렬 기준</p>
          </span>
          {filter.map((el) => (
            <li
              key={el.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFilterSelect(el.id);
                }
              }}
              onClick={() => handleFilterSelect(el.id)}
              className="flex list-none items-center gap-[0.8rem] rounded-[0.8rem] px-[1.6rem] py-[0.8rem] hover:bg-neutral-95 active:bg-neutral-90"
            >
              <p
                className={cn(
                  "w-[8rem] text-body1-medi16",
                  selectedFilter === el.id
                    ? "text-primary-60"
                    : "text-neutral-20",
                )}
              >
                {el.name}
              </p>
              {selectedFilter === el.id && (
                <IcCheckFill
                  width={20}
                  height={20}
                  className="text-primary-60"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
