"use client";
import { cn, SolidExpand } from "@ssok/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAccommodationList from "@/app/api/accomodation/use-accomodation-list";
import HeaderSection from "@/domains/list/components/header-section";
import LinkInputSection from "@/domains/list/components/link-input-section";
import PlaceListSection from "@/domains/list/components/place-list-section";
import { useAccommodationContext } from "@/domains/list/contexts/accomodation-context";
import useBoardPanel from "@/domains/list/hooks/use-board-panel";
import useDragAndDrop from "@/domains/list/hooks/use-drag-and-drop";
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

  const { isPanelExpanded, handlePanelToggle } = useBoardPanel();

  const [selectedPerson, setSelectedPerson] = useState(0);

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
    setValue,
    watch,
  } = useRegisterUrlInput();

  const { isDragging, onDragEnter, onDragOver, onDragLeave, onDrop } =
    useDragAndDrop((url) => {
      setValue("link", url);
    });

  const { data } = useAccommodationList({
    boardId: 1,
    userId: undefined,
    size: 10,
    sort: "saved_at_desc",
  });

  const { setAccommodations } = useAccommodationContext();

  useEffect(() => {
    const all =
      data?.pages.flatMap((page) => page.result?.accommodations || []) ?? [];
    setAccommodations(all);
  }, [data, setAccommodations]);

  return (
    <main
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "relative flex w-full flex-1 flex-col",
        isPanelExpanded ? "border border-neutral-70 bg-neutral-98" : "",
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
              handleCloseInputExpansion={handleCloseInputExpansion}
              toggleInputExpansion={toggleInputExpansion}
              handleMemoInputToggle={handleMemoInputToggle}
              handleTooltipvisible={handleTooltipvisible}
              register={register}
              memoText={memoText}
              maxChars={maxChars}
            />
            {/* 숙소 리스트 */}
            <PlaceListSection
              selectedPerson={selectedPerson}
              handlePersonSelect={handlePersonSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* TODO: resize 추가 애니메이션 보강  */}
      <button
        type="button"
        className={cn(
          "absolute top-[50%] z-2",
          isPanelExpanded ? "right-[-5.5%]" : "right-[-4rem]",
        )}
        onClick={handlePanelToggle}
      >
        <SolidExpand expand={isPanelExpanded} />
      </button>
    </main>
  );
};

export default BoardsIdListsPage;
