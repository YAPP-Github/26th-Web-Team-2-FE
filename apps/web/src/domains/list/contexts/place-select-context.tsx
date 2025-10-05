"use client";
import { useToast } from "@ssok/ui";
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
  resetSelection: () => void;
};

const PlaceSelectionContext = createContext<PlaceSelectionContextType | null>(
  null,
);

const PlaceSelectionProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);
  const [lastSelectedPlace, setLastSelectedPlace] = useState<number | null>(
    null,
  );

  const { handlePanelExpand, isPanelExpanded } = usePanelContext();

  const togglePlaceSelect = useCallback(
    (id: number) => {
      if (selectedPlaces.length >= 10) {
        toast.success("최대 10개까지 선택할 수 있습니다.");
        return;
      }

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
    [selectedPlaces, isPanelExpanded, handlePanelExpand, toast.success],
  );

  const onSelectPlace = useCallback(
    (id: number) => {
      if (selectedPlaces.includes(id)) return;

      if (selectedPlaces.length >= 10) {
        toast.success("최대 10개까지 선택할 수 있습니다.");
        return;
      }

      setSelectedPlaces((prev) => [...prev, id]);
      setLastSelectedPlace(id);
      if (!isPanelExpanded) handlePanelExpand();
    },
    [selectedPlaces, isPanelExpanded, handlePanelExpand, toast],
  );

  const removePlace = useCallback((id: number) => {
    setSelectedPlaces((prev) => prev.filter((placeId) => placeId !== id));
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedPlaces([]);
    setLastSelectedPlace(null);
  }, []);

  return (
    <PlaceSelectionContext.Provider
      value={{
        selectedPlaces,
        togglePlaceSelect,
        removePlace,
        lastSelectedPlace,
        onSelectPlace,
        resetSelection,
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

export default PlaceSelectionProvider;
