import { Button, Card, cn } from "@ssok/ui";
import { _MOCK_DATA } from "@/app/boards/[id]/lists/_mock";
import DropDown from "./atoms/drop-down";

type PlaceListSectionProps = {
  selectedPerson: number;
  handlePersonSelect: (id: number) => void;
};

const PlaceListSection = ({
  selectedPerson,
  handlePersonSelect,
}: PlaceListSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-2xl border border-neutral-90",
        "w-max overflow-visible p-[2.4rem]",
      )}
    >
      {/* 숙소 리스트_제목 */}
      <div className="flex flex-col gap-[1.6rem] p-[2.4rem]">
        <h1 className="text-heading1-semi20"> 저장된 숙소</h1>
        <ul className="flex w-max flex-row gap-[0.8rem]">
          {_MOCK_DATA.people.map((person) => (
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
          <span>{`${_MOCK_DATA.places.length}곳 저장됨`}</span>
          {/* TODO: 드롭다운 구현  */}
          <DropDown />
        </div>
      </div>
      {/* 숙소 리스트_카드목록 */}
      <ul className="flex max-h-[40rem] flex-col gap-[1.2rem] overflow-y-auto">
        {_MOCK_DATA.places.map((place) => (
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
              selected={false}
              onAddClick={() => {}}
              onDeleteClick={() => {}}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlaceListSection;
