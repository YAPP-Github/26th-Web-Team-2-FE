import {
  useCreateComparisonTable,
  useGetAccommodationCountByTripBoardId,
} from "@ssok/api";
import type { TripBoardSummaryResponse } from "@ssok/api/schemas";
import {
  Button,
  Card,
  cn,
  LoadingIndicator,
  SkeletonCard,
  useToast,
} from "@ssok/ui";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import useSession from "@/shared/hooks/use-session";
import useInfiniteScroll from "../../../../shared/hooks/use-infinite-scroll";
import { useAccommodationDataContext } from "../../contexts/accomodation-data-context";
import { usePlaceSelectionContext } from "../../contexts/place-select-context";
import useDeleteAccommodationWithOptimisticUpdate from "../../hooks/use-accommodation-del";
import useCollapseOnScroll from "../../hooks/use-collapse-on-scroll";
import useUpdateMemo from "../../hooks/use-update-memo";
import MemoInputBox from "../link-input-section/atom/memo-input";
import DropDown from "./atom/drop-down";
import EmptyListContainer from "./atom/empty-list-container";

export interface PlaceListSectionProps {
  selectedPerson: number;
  handlePersonSelect: (id: number) => void;
  handleFilterSelect: (id: string) => void;
  handleToggleDropdown: () => void;
  handleCloseInputExpansion: () => void;
  isInputExpanded: boolean;
  isOpen: boolean;
  selectedFilter: string;
  isLoading: boolean;
  isGeneratingCard: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  tripBoardDetailData: TripBoardSummaryResponse;
}

const PlaceListSection = ({
  selectedPerson,
  handlePersonSelect,
  handleFilterSelect,
  handleToggleDropdown,
  handleCloseInputExpansion,
  isInputExpanded,
  isOpen,
  selectedFilter,
  isLoading,
  isGeneratingCard,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  tripBoardDetailData,
}: PlaceListSectionProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { accommodations } = useAccommodationDataContext();
  const { accessToken } = useSession({ required: true });
  const params = useParams();
  const id = params.id;
  const {
    data: accommodationCountData,
    isLoading: isLoadingAccommodationCount,
  } = useGetAccommodationCountByTripBoardId(
    {
      tripBoardId: Number(id),
      userId: selectedPerson === 0 ? undefined : selectedPerson,
    },
    {
      query: {
        enabled: !!accessToken,
      },
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    },
  );

  const { mutate: deleteAccommodation } =
    useDeleteAccommodationWithOptimisticUpdate({
      accessToken: accessToken || "",
      tripBoardId: Number(id),
      userId: selectedPerson === 0 ? undefined : selectedPerson,
      size: 10,
      sort: selectedFilter,
    });
  const { selectedPlaces, togglePlaceSelect, removePlace, resetSelection } =
    usePlaceSelectionContext();
  const listRef = useRef<HTMLUListElement | null>(null);
  const {
    mutateAsync: createComparisonTable,
    isPending: isCreatingComparisonTable,
  } = useCreateComparisonTable({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const onCompareButtonClick = () => {
    createComparisonTable(
      {
        // TODO: 보드 단건 조회 api 연결 후, tableName 변수 연결
        data: {
          tripBoardId: Number(id),
          accommodationIdList: selectedPlaces,
          factorList: [],
        },
      },
      {
        onSuccess: (data) => {
          resetSelection();
          router.push(`/boards/${id}/compares/${data?.data?.result?.tableId}`);
        },
        onError: (err) => {
          console.error(`비교 테이블 생성에 실패했습니다. ${err}`);
        },
      },
    );
  };

  const handleDeleteAccommodation = async (accommodationId: number) => {
    deleteAccommodation(
      { accommodationId },
      {
        onSuccess: () => {
          removePlace(accommodationId);
          toast.success(`숙소를 삭제했습니다`);
        },
        onError: (err) => {
          console.error("숙소 삭제 실패:", err);
        },
      },
    );
  };

  const lastItemRef = useInfiniteScroll({
    isLoading,
    hasNextPage,
    fetchNextPage,
  });

  useCollapseOnScroll(listRef, isInputExpanded, handleCloseInputExpansion);

  const { saveMemo, onToggle, onClose, openedToggle, isUpdateMemoPending } =
    useUpdateMemo(accessToken, selectedPerson, selectedFilter, Number(id));
  const { register, handleSubmit, watch, reset } = useForm<{ memo: string }>();

  const memoText = watch("memo") || "";

  const onValid = (data: { memo: string }) => {
    if (openedToggle === null) return;
    saveMemo(openedToggle, data);
    reset();
    onClose();
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-neutral-90 bg-neutral-100",
        "w-max p-[2.4rem]",
      )}
    >
      {/* 숙소 리스트_제목 */}
      <div className="flex flex-col gap-[1.6rem] pb-[2.4rem]">
        <h1 className="text-heading1-semi20"> 저장된 숙소</h1>
        <ul className="flex w-max flex-row gap-[0.8rem]">
          <li key="all">
            <Button
              variant="round"
              selected={selectedPerson === 0}
              onClick={() => handlePersonSelect(0)}
            >
              전체
            </Button>
          </li>

          {tripBoardDetailData?.participants?.map((person) => (
            <li key={person.userId}>
              <Button
                variant="round"
                selected={selectedPerson === person.userId}
                onClick={() => handlePersonSelect(person.userId ?? 0)}
              >
                {person.nickname}
              </Button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-body2-regular14 text-neutral-40">
          <span>{`${accommodationCountData?.data.result?.accommodationCount || 0}곳 저장됨`}</span>
          <DropDown
            handleFilterSelect={handleFilterSelect}
            handleToggleDropdown={handleToggleDropdown}
            isOpen={isOpen}
            selectedFilter={selectedFilter}
          />
        </div>
      </div>
      {/* 숙소 리스트_카드목록 */}
      <ul
        ref={listRef}
        className="flex h-[40rem] min-w-[60rem] flex-col gap-[1.2rem] overflow-y-scroll"
      >
        {/* 숙소 리스트_skeleton UI */}
        {isGeneratingCard && (
          <li>
            <SkeletonCard />
          </li>
        )}
        {accommodations?.map((place) => {
          const isLast = accommodations[accommodations.length - 1] === place;
          return (
            <li
              key={`${place.id}-card`}
              ref={isLast ? lastItemRef : null}
              className="relative"
            >
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
                  tripBoardDetailData?.participants?.find(
                    (member) => member?.userId === place?.createdBy,
                  )?.nickname || "알 수 없음"
                }
                memo={place.memo}
                onMemoToggle={() =>
                  onToggle(place.id || null, place.createdBy || null)
                }
                selected={place.id ? selectedPlaces.includes(place.id) : false}
                onClick={() => place.id && togglePlaceSelect(place.id)}
                onAddClick={() => {
                  if (!place.id) return;
                  togglePlaceSelect(place.id);
                }}
                onDeleteClick={() => {
                  if (!place.id) return;
                  handleDeleteAccommodation(place.id);
                }}
              />
              {openedToggle === place.id && (
                <form onSubmit={handleSubmit(onValid)}>
                  <MemoInputBox
                    memoText={memoText}
                    maxChars={50}
                    register={register}
                    isVisible={openedToggle === place.id}
                    onClose={onClose}
                    isListMemo={place.id || 0}
                  />
                </form>
              )}
            </li>
          );
        })}
        {selectedPlaces.length > 0 && (
          <div className="sticky bottom-0 z-[1] w-full bg-primary-100 pt-[0.8rem] pb-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[-23%] left-0 h-[2.4rem] w-full bg-gradient-top-white"
            />
            <Button
              variant="primary"
              size="sticky"
              disabled={selectedPlaces.length === 1}
              className="flex w-full justify-center"
              onClick={onCompareButtonClick}
            >{`${selectedPlaces.length}곳 비교하기`}</Button>
          </div>
        )}
        {!isLoading &&
          !isFetchingNextPage &&
          (!accommodations || accommodations.length === 0) && (
            <EmptyListContainer />
          )}
      </ul>
      <LoadingIndicator
        active={
          isLoading ||
          isLoadingAccommodationCount ||
          isCreatingComparisonTable ||
          isUpdateMemoPending
        }
      />
    </section>
  );
};

export default PlaceListSection;
