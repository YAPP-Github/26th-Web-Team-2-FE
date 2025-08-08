"use client";
import { cn, SolidExpand } from "@ssok/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAccommodationList from "@/app/api/accomodation/use-accomodation-list";
import HeaderSection from "@/domains/list/components/header-section";
import LinkInputSection from "@/domains/list/components/link-input-section";
import PlaceListSection from "@/domains/list/components/place-list-section";
import { useAccommodationDataContext } from "@/domains/list/contexts/accomodation-data-context";
import { usePanelContext } from "@/domains/list/contexts/pannel-context";
import useDragAndDrop from "@/domains/list/hooks/use-drag-and-drop";
import useDropdown from "@/domains/list/hooks/use-dropdown";
import useInputPanel from "@/domains/list/hooks/use-input-panel";
import useRegisterUrlInput from "@/domains/list/hooks/use-register-url-input";

const BoardsIdListsPage = () => {
  const {
    isInputExpanded,
    isTooltipVisible,
    handleCloseInputExpansion,
    toggleInputExpansion,
    handleTooltipvisible,
  } = useInputPanel();
  const { isOpen, handleToggleDropdown, selectedFilter, handleFilterSelect } =
    useDropdown();
  const [selectedPerson, setSelectedPerson] = useState(0);
  const { isDragging, onDragEnter, onDragOver, onDragLeave, onDrop } =
    useDragAndDrop((url) => {
      setValue("link", url);
    });
  // TODO: 메모 입력 관련 로직 커스텀훅 분리
  const {
    isMemoInputVisible,
    register,
    handleSubmit,
    handleMemoInputToggle,
    memoText,
    maxChars,
    setValue,
    watch,
  } = useRegisterUrlInput();

  const { data, isLoading } = useAccommodationList({
    boardId: 1,
    userId: selectedPerson === 0 ? undefined : selectedPerson,
    size: 10,
    sort: selectedFilter,
  });

  const { updateAccommodations } = useAccommodationDataContext();
  const { handlePanelToggle, isPanelExpanded } = usePanelContext();
  useEffect(() => {
    const all =
      data?.pages.flatMap((page) => page?.result?.accommodations || []) ?? [];
    updateAccommodations(all);
  }, [data, updateAccommodations]);

  const handlePersonSelect = (id: number) => {
    setSelectedPerson(id);
  };

  return (
    <main
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "relative flex w-full flex-1 flex-col",
        isPanelExpanded ? "border-neutral-70 border-r bg-neutral-98" : "",
        isPanelExpanded ? "p-[2.4rem]" : "p-0",
      )}
    >
      <AnimatePresence>
        {isPanelExpanded && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-[1.6rem]"
          >
            {/* 헤더 */}
            <HeaderSection />
            {/* 링크 저장 */}
            <LinkInputSection
              watch={watch}
              isDragging={isDragging}
              isInputExpanded={isInputExpanded}
              isMemoInputVisible={isMemoInputVisible}
              isTooltipVisible={isTooltipVisible}
              toggleInputExpansion={toggleInputExpansion}
              handleMemoInputToggle={handleMemoInputToggle}
              handleTooltipvisible={handleTooltipvisible}
              register={register}
              handleSubmit={handleSubmit}
              memoText={memoText}
              maxChars={maxChars}
            />
            {/* 숙소 리스트 */}
            <PlaceListSection
              selectedPerson={selectedPerson}
              handlePersonSelect={handlePersonSelect}
              handleFilterSelect={handleFilterSelect}
              handleToggleDropdown={handleToggleDropdown}
              handleCloseInputExpansion={handleCloseInputExpansion}
              isInputExpanded={isInputExpanded}
              isOpen={isOpen}
              selectedFilter={selectedFilter}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* TODO: resize 추가 애니메이션 보강  */}
      <SolidExpand
        collapse={!isPanelExpanded}
        onClick={handlePanelToggle}
        className={cn(
          "absolute top-[50%] z-2",
          isPanelExpanded ? "right-[-5.5%]" : "right-[-4rem]",
        )}
      />
      {isLoading && (
        <main className="absolute z-10 flex h-full w-full items-center justify-center ">
          <div
            className={`h-[2.4rem] w-[2.4rem] animate-spin rounded-full border-4 border-t-transparent bg-primary`}
          />
        </main>
      )}
    </main>
  );
};

export default BoardsIdListsPage;
