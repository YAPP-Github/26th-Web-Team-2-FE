"use client";
import {
  Button,
  Card,
  cn,
  IcAddMemo,
  IcCollapse,
  IcExpand,
  IcInfo,
  TextField,
  TextWithIcon,
} from "@ssok/ui";
import { useState } from "react";
import { _MOCK_DATA } from "./_mock";

// TODO: 중복되는 스타일 분리
const _roundedBorder = "rounded-2xl border border-neutral-90";

const BoardsIdListsPage = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  const toggleInputExpansion = () => {
    setIsInputExpanded(!isInputExpanded);
  };

  const handlePersonSelect = (id: number) => {
    setSelectedPerson(id);
  };
  return (
    <main className="flex w-full flex-1 flex-col gap-[1.6rem] bg-neutral-98 p-[2.4rem]">
      {/* 헤더 */}
      <header className="flex w-max gap-[1.6rem] p-2 pr-8 pl-2">
        <span className="text-body1-medi16 text-neutral-25">
          직장동료들과 라면 뿌수기
        </span>
        <div className="flex items-center gap-[1.2rem] text-body2-regular14 text-neutral-60">
          <p>도쿄, 일본</p>
          <div className="h-[1.2rem] w-[0.1rem] bg-neutral-80" />
          <p>8월 19일 - 23일</p>
        </div>
      </header>
      {/* 링크 저장 */}
      <section
        className={cn(
          _roundedBorder,
          "flex w-full flex-col gap-[1.6rem] p-[2.4rem]",
        )}
      >
        {/* 링크 저장_제목 */}
        <div className="flex justify-between">
          <div className="flex items-center gap-[0.8rem]">
            <p className="text-heading1-semi20 text-neutral-10">
              숙소 링크 저장하기
            </p>
            <TextWithIcon
              icon={
                <IcInfo
                  width="20px"
                  height="20px"
                  className="text-primary-70"
                />
              }
              className="flex-row-reverse gap-[0.2rem]"
            >
              <TextWithIcon.Text className="text-caption2-regular11 text-neutral-50">
                저장 가능한 링크
              </TextWithIcon.Text>
            </TextWithIcon>
          </div>
          <button type="button" onClick={toggleInputExpansion}>
            {!isInputExpanded && <IcExpand width="24px" height="24px" />}
            {isInputExpanded && <IcCollapse width="24px" height="24px" />}
          </button>
        </div>
        {isInputExpanded && (
          <>
            {/* 링크 저장_입력란 */}
            <div>
              <TextField placeholder="링크를 입력해주세요" />
            </div>
            {/* 링크 저장_버튼 */}
            <div className="flex flex-row justify-end">
              <Button
                variant="text"
                size="md"
                icon={<IcAddMemo width="24" height="24" />}
              >
                메모
              </Button>
              <Button variant="primary" size="md">
                저장하기
              </Button>
            </div>
          </>
        )}
      </section>
      {/* 숙소 리스트 */}
      <section className={cn(_roundedBorder, "w-max p-[2.4rem]")}>
        {/* 숙소 리스트_제목 */}
        <div className="flex flex-col gap-[1.6rem]">
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
            <span>4곳 저장됨</span>
            <span>드롭다운</span>
          </div>
        </div>
        {/* 숙소 리스트_카드목록 */}
        <ul className="flex flex-col gap-[1.2rem]">
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
    </main>
  );
};

export default BoardsIdListsPage;
