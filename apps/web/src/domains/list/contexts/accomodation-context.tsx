"use client";
import type { AccommodationResponse } from "@ssok/api/schemas";
import { createContext, useContext, useState } from "react";

type NonNullableAccommodation = NonNullable<AccommodationResponse>;

const AccommodationContext = createContext<{
  accommodations: NonNullableAccommodation[];
  setAccommodations: (list: NonNullableAccommodation[]) => void;
}>({
  accommodations: [],
  setAccommodations: () => {},
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

  return (
    <AccommodationContext.Provider
      value={{ accommodations, setAccommodations }}
    >
      {children}
    </AccommodationContext.Provider>
  );
};
