"use client";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { usePanelContext } from "./pannel-context";

type PlaceSelectionContextType = {
  selectedPlaces: number[];
  togglePlaceSelect: (id: number) => void;
  removePlace: (id: number) => void;
  lastSelectedPlace: number | null;
  onSelectPlace: (id: number) => void;
};

const PlaceSelectionContext = createContext<PlaceSelectionContextType | null>(
  null,
);

export const PlaceSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);
  const [lastSelectedPlace, setLastSelectedPlace] = useState<number | null>(
    null,
  );

  const { handlePanelExpand, isPanelExpanded } = usePanelContext();

  const togglePlaceSelect = useCallback(
    (id: number) => {
      setSelectedPlaces((prev) => {
        const alreadySelected = prev.includes(id);
        const updated = alreadySelected
          ? prev.filter((placeId) => placeId !== id)
          : [...prev, id];
        return updated;
      });
      setLastSelectedPlace(id);
      if (!isPanelExpanded) handlePanelExpand();
    },
    [isPanelExpanded, handlePanelExpand],
  );

  const onSelectPlace = useCallback(
    (id: number) => {
      if (!selectedPlaces.includes(id)) {
        setSelectedPlaces((prev) => [...prev, id]);
      }
      setLastSelectedPlace(id);
      if (!isPanelExpanded) handlePanelExpand();
    },
    [selectedPlaces, isPanelExpanded, handlePanelExpand],
  );

  const removePlace = useCallback((id: number) => {
    setSelectedPlaces((prev) => prev.filter((placeId) => placeId !== id));
  }, []);

  return (
    <PlaceSelectionContext.Provider
      value={{
        selectedPlaces,
        togglePlaceSelect,
        removePlace,
        lastSelectedPlace,
        onSelectPlace,
      }}
    >
      {children}
    </PlaceSelectionContext.Provider>
  );
};

export const usePlaceSelectionContext = () => {
  const context = useContext(PlaceSelectionContext);
  if (!context) {
    throw new Error("PlaceSelectionProvider 내부에서 사용하세요");
  }
  return context;
};
