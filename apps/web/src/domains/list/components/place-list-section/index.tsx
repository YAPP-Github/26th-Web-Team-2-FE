import { Button, Card, cn } from "@ssok/ui";
import { useState } from "react";
import { useAccommodationContext } from "../../contexts/accomodation-context";
import { useMemberData } from "../../hooks/use-member-data";
import DropDown from "./atom/drop-down";
import EmptyListContainer from "./atom/empty-list-container";

type PlaceListSectionProps = {
  selectedPerson: number;
  handlePersonSelect: (id: number) => void;
  handleFilterSelect: (id: string) => void;
  handleToggleDropdown: () => void;
  isOpen: boolean;
  selectedFilter: string;
};

const PlaceListSection = ({
  selectedPerson,
  handlePersonSelect,
  handleFilterSelect,
  handleToggleDropdown,
  isOpen,
  selectedFilter,
}: PlaceListSectionProps) => {
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const memberData = useMemberData();
  // const accommodationData = useAccommodationData();
  const { accommodations } = useAccommodationContext();

  const handlePlaceSelect = (placeName: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(placeName)
        ? prev.filter((name) => name !== placeName)
        : [...prev, placeName],
    );
  };

  const handleDeleteClick = (placeName: string) => {
    setSelectedPlaces((prev) => prev.filter((name) => name !== placeName));
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-neutral-90 bg-neutral-100",
        "w-max overflow-visible p-[2.4rem]",
      )}
    >
      {/* 숙소 리스트_제목 */}
      <div className="flex flex-col gap-[1.6rem] p-[2.4rem]">
        <h1 className="text-heading1-semi20"> 저장된 숙소</h1>
        <ul className="flex w-max flex-row gap-[0.8rem]">
          {memberData.map((person) => (
            <li key={person.id}>
              <Button
                variant="round"
                selected={selectedPerson === parseInt(person.id)}
                onClick={() => handlePersonSelect(parseInt(person.id))}
              >
                {person.name}
              </Button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-body2-regular14 text-neutral-40">
          <span>{`${accommodations.length}곳 저장됨`}</span>
          <DropDown
            handleFilterSelect={handleFilterSelect}
            handleToggleDropdown={handleToggleDropdown}
            isOpen={isOpen}
            selectedFilter={selectedFilter}
          />
        </div>
      </div>
      {/* 숙소 리스트_카드목록 */}
      <ul className="flex max-h-[40rem] flex-col gap-[1.2rem] overflow-y-auto">
        {accommodations?.map((place) => (
          <li key={`${place.hotelId}-card`}>
            <Card
              images={place?.images || []}
              siteName={place.siteName || "-"}
              logoUrl={place.logoUrl || ""}
              url={place.url || ""}
              currency={place.lowestPrice?.toLocaleString() || ""}
              accommodationName={place.accommodationName || "-"}
              address={place.address || "주소정보 없음"}
              nearbyAttractions={place.nearbyAttractions?.slice(0, 2) || []}
              savedByText={
                memberData.find(
                  (member) => member.id === String(selectedPerson),
                )?.name || "알 수 없음"
              }
              memo={place.memo}
              selected={selectedPlaces.includes(
                place.accommodationName as string,
              )}
              onClick={() =>
                handlePlaceSelect(place.accommodationName as string)
              }
              onAddClick={() => {
                handlePlaceSelect(place.accommodationName as string);
              }}
              onDeleteClick={() => {
                handleDeleteClick(place.accommodationName as string);
              }}
            />
          </li>
        ))}
        {(!accommodations || accommodations.length === 0) && (
          <EmptyListContainer />
        )}
      </ul>
    </section>
  );
};

export default PlaceListSection;
