"use client";
import type { AccommodationResponse } from "@ssok/api/schemas";
import { createContext, useContext, useState } from "react";

type NonNullableAccommodation = NonNullable<AccommodationResponse>;

const AccommodationContext = createContext<{
  accommodations: NonNullableAccommodation[];
  setAccommodations: (list: NonNullableAccommodation[]) => void;
  selectedPlaces: number[];
  togglePlaceSelect: (id: number) => void;
  removePlace: (id: number) => void;
  lastSelectedPlace: number | null;
}>({
  accommodations: [],
  setAccommodations: () => {},
  selectedPlaces: [],
  togglePlaceSelect: () => {},
  removePlace: () => {},
  lastSelectedPlace: null,
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

  const togglePlaceSelect = (id: number) => {
    setSelectedPlaces((prev) => {
      const alreadySelected = prev.includes(id);
      if (alreadySelected) {
        return prev.filter((name) => name !== id);
      } else {
        setLastSelectedPlace(id);
        return [...prev, id];
      }
    });
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
      }}
    >
      {children}
    </AccommodationContext.Provider>
  );
};
