"use client";
import { useGetTripBoardDetail } from "@ssok/api";
import { cn, LoadingIndicator, SolidExpand, useToast } from "@ssok/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderSection from "@/domains/list/components/header-section";
import LinkInputSection from "@/domains/list/components/link-input-section";
import PlaceListSection from "@/domains/list/components/place-list-section";
import { useAccommodationDataContext } from "@/domains/list/contexts/accomodation-data-context";
import { usePanelContext } from "@/domains/list/contexts/pannel-context";
import useAccommodationList from "@/domains/list/hooks/use-accommodation-list";
import useDragAndDrop from "@/domains/list/hooks/use-drag-and-drop";
import useDropdown from "@/domains/list/hooks/use-dropdown";
import useInputPanel from "@/domains/list/hooks/use-input-panel";
import useRegisterUrlInput from "@/domains/list/hooks/use-register-url-input";
import useSession from "@/shared/hooks/use-session";

const PlaceListView = () => {
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
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const id = params.id;
  const { accessToken } = useSession({ required: true });
  const { data: tripBoardDetail, isLoading: isTripBoardLoading } =
    useGetTripBoardDetail(Number(id), {
      query: {
        enabled: !!accessToken,
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

  const {
    data,
    isLoading: accommodationDataLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAccommodationList(
    {
      tripBoardId: Number(id),
      userId: selectedPerson === 0 ? undefined : selectedPerson,
      size: 10,
      sort: selectedFilter,
    },
    {
      accessToken: accessToken || "",
      enabled: !!accessToken,
    },
  );

  const { updateAccommodations } = useAccommodationDataContext();
  const { handlePanelToggle, isPanelExpanded } = usePanelContext();

  useEffect(() => {
    if (searchParams.get("joined") === "true") {
      toast.success("보드에 참여했습니다!");
      const url = new URL(window.location.href);
      url.searchParams.delete("joined");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, toast, router]);

  useEffect(() => {
    const all =
      data?.pages?.flatMap((page) => page?.result?.accommodations ?? []) ?? [];
    updateAccommodations(all);
  }, [data, updateAccommodations]);

  const handlePersonSelect = (id: number) => {
    setSelectedPerson(id);
  };

  const loading = accommodationDataLoading || isTripBoardLoading;

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
            <HeaderSection {...tripBoardDetail?.data.result} />
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
              isLoading={accommodationDataLoading}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              participants={tripBoardDetail?.data.result?.participants || []}
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
      <LoadingIndicator active={loading || isFetchingNextPage} />
    </main>
  );
};

export default PlaceListView;
