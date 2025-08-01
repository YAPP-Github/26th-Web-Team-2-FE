import { useState } from "react";

export const filter = [
  { id: "saved_at_des", name: "저장순" },
  { id: "price_asc", name: "최저가순" },
];

const useDropdown = () => {
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

  return {
    selectedFilter,
    isOpen,
    handleFilterSelect,
    handleToggleDropdown,
  };
};

export default useDropdown;
