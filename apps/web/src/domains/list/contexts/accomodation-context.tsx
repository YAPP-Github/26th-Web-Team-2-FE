"use client";
import type { AccommodationResponse } from "@ssok/api/schemas";
import { createContext, useContext, useState } from "react";

type NonNullableAccommodation = NonNullable<AccommodationResponse>;

const AccommodationContext = createContext<{
  accommodations: NonNullableAccommodation[];
  setAccommodations: (list: NonNullableAccommodation[]) => void;
  selectedPlaces: string[];
  togglePlaceSelect: (placeName: string) => void;
  removePlace: (placeName: string) => void;
  lastSelectedPlace: string | null;
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
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [lastSelectedPlace, setLastSelectedPlace] = useState<string | null>(
    null,
  );

  const togglePlaceSelect = (placeName: string) => {
    setSelectedPlaces((prev) => {
      const alreadySelected = prev.includes(placeName);
      if (alreadySelected) {
        return prev.filter((name) => name !== placeName);
      } else {
        setLastSelectedPlace(placeName);
        return [...prev, placeName];
      }
    });
  };

  const removePlace = (placeName: string) => {
    setSelectedPlaces((prev) => prev.filter((name) => name !== placeName));
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
