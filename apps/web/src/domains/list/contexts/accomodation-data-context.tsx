"use client";
import type { AccommodationResponse } from "@ssok/api/schemas";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type NonNullableAccommodation = NonNullable<AccommodationResponse>;

interface AccommodationDataContextType {
  accommodations: NonNullableAccommodation[];
  updateAccommodations: (list: NonNullableAccommodation[]) => void;
}

const AccommodationDataContext =
  createContext<AccommodationDataContextType | null>(null);

const AccommodationDataProvider = ({ children }: { children: ReactNode }) => {
  const [accommodations, setAccommodations] = useState<
    NonNullableAccommodation[]
  >([]);

  const updateAccommodations = useCallback(
    (list: NonNullableAccommodation[]) => {
      setAccommodations(list);
    },
    [],
  );

  return (
    <AccommodationDataContext.Provider
      value={{ accommodations, updateAccommodations }}
    >
      {children}
    </AccommodationDataContext.Provider>
  );
};

export const useAccommodationDataContext = () => {
  const context = useContext(AccommodationDataContext);
  if (!context) {
    throw new Error("AccommodationDataProvider 내부에서 사용하세요");
  }
  return context;
};

export default AccommodationDataProvider;
