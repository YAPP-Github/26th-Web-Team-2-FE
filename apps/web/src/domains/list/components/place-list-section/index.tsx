import { Button, Card, cn } from "@ssok/ui";
import { useState } from "react";
import { useMemberData } from "../../hooks/use-member-data";
import { useAccommodationData } from "../../hooks/use-place-data";
import DropDown from "./atom/drop-down";
import EmptyListContainer from "./atom/empty-list-container";

type PlaceListSectionProps = {
  selectedPerson: number;
  handlePersonSelect: (id: number) => void;
};

const PlaceListSection = ({
  selectedPerson,
  handlePersonSelect,
}: PlaceListSectionProps) => {
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const memberData = useMemberData();
  const accommodationData = useAccommodationData();
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
          <span>{`${accommodationData.length}곳 저장됨`}</span>
          <DropDown />
        </div>
      </div>
      {/* 숙소 리스트_카드목록 */}
      <ul className="flex max-h-[40rem] flex-col gap-[1.2rem] overflow-y-auto">
        {accommodationData?.map((place) => (
          <li key={`${place.placeName}-card`}>
            <Card
              imgSrc={place.imgSrc}
              platform={place.platform}
              placeName={place.placeName}
              price={place.price}
              address={place.address}
              attractions={place.attractions}
              savedByText={place.savedByText}
              memoContent={place.memoContent}
              selected={selectedPlaces.includes(place.placeName)}
              onAddClick={() => {
                handlePlaceSelect(place.placeName);
              }}
              onDeleteClick={() => {
                handleDeleteClick(place.placeName);
              }}
            />
          </li>
        ))}
        {(!accommodationData || accommodationData.length === 0) && (
          <EmptyListContainer />
        )}
      </ul>
    </section>
  );
};

export default PlaceListSection;
