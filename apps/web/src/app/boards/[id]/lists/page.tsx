"use client";
import {
  Button,
  Card,
  cn,
  IcAddMemo,
  IcCollapse,
  IcExpand,
  IcInfo,
  IcLink,
  IcUpload,
  TextField,
  TextWithIcon,
} from "@ssok/ui";
import { useState } from "react";
import BubbleInfo from "@/domains/list/components/bubble-info";
import useRegisterUrlInput from "@/domains/list/hooks/use-register-url-input";
import { _MOCK_DATA } from "./_mock";

const BoardsIdListsPage = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toggleInputExpansion = () => {
    setIsInputExpanded(!isInputExpanded);
  };

  const handlePersonSelect = (id: number) => {
    setSelectedPerson(id);
  };

  // TODO: 메모 입력 관련 로직 커스텀훅 분리
  const {
    isMemoInputVisible,
    register,
    // handleSubmit,
    handleMemoInputToggle,
    memoText,
    maxChars,
  } = useRegisterUrlInput();

  return (
    <main className="flex w-full flex-1 flex-col gap-[1.6rem] bg-neutral-98 p-[2.4rem] ">
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
          "rounded-2xl border border-neutral-90",
          "flex w-full flex-col gap-[1.6rem] p-[2.4rem]",
        )}
      >
        {/* 링크 저장_제목 */}
        <div className="flex justify-between">
          <div className="flex items-center gap-[0.8rem]">
            <p className="text-heading1-semi20 text-neutral-10">
              숙소 링크 저장하기
            </p>
            {isInputExpanded && (
              <TextWithIcon
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
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
            )}
            {isTooltipVisible && (
              <BubbleInfo>
                지금은 부킹닷컴, 아고다, 호텔스컴바인 링크만 지원 중이에요
              </BubbleInfo>
            )}
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
              <TextField
                placeholder="숙소의 상세 페이지 링크를 복사해서 붙여넣거나, 드래그해 추가해 주세요"
                icon={<IcLink width="24" height="24" />}
              />
            </div>
            {/* 링크 저장_버튼 */}
            <div className="flex flex-row justify-end gap-[0.8rem]">
              <div className="relative">
                <Button
                  variant="text"
                  size="md"
                  onClick={handleMemoInputToggle}
                  icon={<IcAddMemo width="24" height="24" />}
                  {...register("url")}
                >
                  메모
                </Button>
                {/* 링크 저장_버튼_메모 입력창 */}
                {isMemoInputVisible && (
                  <section className="absolute bottom-[-12.5rem] left-0 z-5 flex w-[33.2rem] flex-col gap-[1.2rem] rounded-[1.2rem] border border-primary-60 bg-neutral-100 px-[1.6rem] py-[1.2rem] focus:outline-none">
                    <textarea
                      placeholder="남기고 싶은 간단한 설명을 메모로 남겨보세요."
                      {...register("memo", {
                        maxLength: 50,
                      })}
                      className="min-h-[4.8rem] w-full resize-none text-body1-regular16 text-neutral-5 placeholder:text-neutral-60 focus:outline-none"
                    />
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-caption1-medi12 text-neutral-70">
                        {memoText.length} / {maxChars}
                      </span>
                      <button type="submit" className="">
                        <IcUpload
                          width="24"
                          height="24"
                          className={cn(
                            memoText.length > 0
                              ? ` text-primary-70`
                              : `text-neutral-80`,
                          )}
                        />
                      </button>
                    </div>
                  </section>
                )}
              </div>
              <Button variant="primary" size="md">
                저장하기
              </Button>
            </div>
          </>
        )}
      </section>
      {/* 숙소 리스트 */}
      <section
        className={cn(
          "rounded-2xl border border-neutral-90",
          "w-max overflow-y-scroll p-[2.4rem]",
        )}
      >
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
            <span>{`${_MOCK_DATA.places.length}곳 저장됨`}</span>
            {/* TODO: 드롭다운 구현  */}
            <span>최저가 순</span>
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
