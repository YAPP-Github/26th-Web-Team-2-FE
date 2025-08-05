"use client";
import type { AccommodationResponse } from "@ssok/api/schemas";
import { createContext, useContext, useState } from "react";
import useBoardPanel from "../hooks/use-board-panel";

type NonNullableAccommodation = NonNullable<AccommodationResponse>;

const AccommodationContext = createContext<{
  accommodations: NonNullableAccommodation[];
  setAccommodations: (list: NonNullableAccommodation[]) => void;
  selectedPlaces: number[];
  togglePlaceSelect: (id: number) => void;
  removePlace: (id: number) => void;
  lastSelectedPlace: number | null;
  handlePanelToggle: () => void;
  onSelectPlace: (placeId: number) => void;
  isPanelExpanded: boolean;
}>({
  accommodations: [],
  setAccommodations: () => {},
  selectedPlaces: [],
  togglePlaceSelect: () => {},
  removePlace: () => {},
  lastSelectedPlace: null,
  handlePanelToggle: () => {},
  onSelectPlace: () => {},
  isPanelExpanded: false,
});

export const useAccommodationContext = () => useContext(AccommodationContext);

export const AccommodationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accommodations, setAccommodations] = useState<AccommodationResponse[]>(
    [],
  );
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);
  const [lastSelectedPlace, setLastSelectedPlace] = useState<number | null>(
    null,
  );
  const { handlePanelExpand, isPanelExpanded, handlePanelToggle } =
    useBoardPanel();

  const togglePlaceSelect = (id: number) => {
    let updated: number[] = [];
    setSelectedPlaces((prev) => {
      const alreadySelected = prev.includes(id);
      updated = alreadySelected
        ? prev.filter((name) => name !== id)
        : [...prev, id];
      return updated;
    });

    if (!selectedPlaces.includes(id)) {
      setLastSelectedPlace(id);
      if (!isPanelExpanded) handlePanelExpand();
    }
  };

  const onSelectPlace = (placeId: number) => {
    setSelectedPlaces((prev) => {
      return [...prev, placeId];
    });
    setLastSelectedPlace(placeId);
    if (!isPanelExpanded) handlePanelExpand();
  };

  const removePlace = (placeId: number) => {
    setSelectedPlaces((prev) => prev.filter((id) => id !== placeId));
  };

  return (
    <AccommodationContext.Provider
      value={{
        accommodations,
        setAccommodations,
        selectedPlaces,
        togglePlaceSelect,
        removePlace,
        lastSelectedPlace,
        handlePanelToggle,
        onSelectPlace,
        isPanelExpanded,
      }}
    >
      {children}
    </AccommodationContext.Provider>
  );
};
