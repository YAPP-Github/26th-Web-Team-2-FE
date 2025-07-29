import { cn, IcArrowDown, IcCheckFill } from "@ssok/ui";
import { useState } from "react";

const filter = [
  { id: "saved_at_des", name: "저장순" },
  { id: "price_asc", name: "최저가순" },
];

const DropDown = () => {
  const [selectedFilter, setSelectedFilter] =
    useState<(typeof filter)[number]["id"]>("saved_at_des");
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSelect = (id: (typeof filter)[number]["id"]) => {
    setSelectedFilter(id);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="flex flex-row gap-[0.4rem]"
      >
        <span className="w-[4.8rem]">
          {filter.find((f) => f.id === selectedFilter)?.name}
        </span>
        <IcArrowDown />
      </button>
      {isOpen && (
        <ul className="absolute bottom-[-14.8rem] z-100 flex flex-col rounded-[1.2rem] border border-neutral-70 bg-neutral-100 p-[0.8rem]">
          <span className="px-[1.6rem] py-[0.8rem]">
            <p className="text-body2-regular14 text-neutral-30">정렬 기준</p>
          </span>
          {filter.map((el) => (
            <li
              key={el.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
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

export default DropDown;
