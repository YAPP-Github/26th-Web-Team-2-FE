"use client";
import type { AccommodationResponse } from "@ssok/api/schemas";
import { createContext, useContext, useState } from "react";

const AccommodationContext = createContext<{
  accommodations: AccommodationResponse[];
  setAccommodations: (list: AccommodationResponse[]) => void;
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
