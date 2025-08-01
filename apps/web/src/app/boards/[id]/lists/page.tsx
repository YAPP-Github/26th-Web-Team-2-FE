"use client";
import { useState } from "react";
import HeaderSection from "@/domains/list/components/header-section";
import LinkInputSection from "@/domains/list/components/link-input-section";
import PlaceListSection from "@/domains/list/components/place-list-section";
import useDragAndDrop from "@/domains/list/hooks/use-drag-and-drop";
import useRegisterUrlInput from "@/domains/list/hooks/use-register-url-input";

const BoardsIdListsPage = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleCloseInputExpansion = () => {
    setIsInputExpanded(false);
  };

  const toggleInputExpansion = () => {
    setIsInputExpanded(!isInputExpanded);
  };

  const handlePersonSelect = (id: number) => {
    setSelectedPerson(id);
  };

  const handleTooltipvisible = (visible: boolean) => {
    setIsTooltipVisible(visible);
  };

  // TODO: 메모 입력 관련 로직 커스텀훅 분리
  const {
    isMemoInputVisible,
    register,
    // handleSubmit,
    handleMemoInputToggle,
    memoText,
    maxChars,
    setValue,
    watch,
  } = useRegisterUrlInput();

  const { isDragging, onDragEnter, onDragOver, onDragLeave, onDrop } =
    useDragAndDrop((url) => {
      console.log("드롭된 URL:", url); // 🔍 찍히는지 확인
      setValue("link", url);
    });

  return (
    <main
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="flex w-full flex-1 flex-col gap-[1.6rem] bg-neutral-98 p-[2.4rem] "
    >
      {/* 헤더 */}
      <HeaderSection />
      {/* 링크 저장 */}
      <LinkInputSection
        isDragging={isDragging}
        isInputExpanded={isInputExpanded}
        isMemoInputVisible={isMemoInputVisible}
        isTooltipVisible={isTooltipVisible}
        handleCloseInputExpansion={handleCloseInputExpansion}
        toggleInputExpansion={toggleInputExpansion}
        handleMemoInputToggle={handleMemoInputToggle}
        handleTooltipvisible={handleTooltipvisible}
        register={register}
        watch={watch}
        memoText={memoText}
        maxChars={maxChars}
      />
      {/* 숙소 리스트 */}
      <PlaceListSection
        selectedPerson={selectedPerson}
        handlePersonSelect={handlePersonSelect}
      />
    </main>
  );
};

export default BoardsIdListsPage;
