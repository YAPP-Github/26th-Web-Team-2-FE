"use client";

import { cn } from "@ssok/ui";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import AddCell from "@/domains/compare/components/compare-table/add-cell";
import AmenitiesCell from "@/domains/compare/components/compare-table/amenities-cell";
import CheckInOutCell from "@/domains/compare/components/compare-table/check-in-out-cell";
import CleanlinessScoreCell from "@/domains/compare/components/compare-table/cleanliness-score-cell";
import NearbyPlacesCell from "@/domains/compare/components/compare-table/nearby-places-cell.tsx";
import PhotoCell from "@/domains/compare/components/compare-table/photo-cell";
import ReviewScoreCell from "@/domains/compare/components/compare-table/review-score-cell";
import ReviewSummaryCell from "@/domains/compare/components/compare-table/review-summary-cell";
import useViewMode from "@/domains/compare/hooks/use-view-mode";
import type {
  Accommodation,
  ComparisonFormData,
  ViewState,
} from "@/domains/compare/types";

export interface CompareTableProps {
  state: ViewState;
  isAuthenticated: boolean;
  isAccessedByShareCode: boolean;
  onAddCellClick: () => void;
  className?: string;
}

const CompareTable = ({
  state,
  isAuthenticated,
  isAccessedByShareCode,
  onAddCellClick,
  className,
}: CompareTableProps) => {
  const { handleViewChange, currentView } = useViewMode();
  const { watch } = useFormContext<ComparisonFormData>();

  const items = watch("accommodationRequestList") || [];

  const rows = [
    { key: "photo", label: null },
    { key: "reviewScore", label: "리뷰 점수" },
    { key: "nearbyAttractions", label: "인근 관광지" },
    { key: "nearbyTransportation", label: "인근 교통편" },
    { key: "cleanlinessScore", label: "청결도" },
    { key: "amenities", label: "편의 서비스" },
    { key: "checkInOut", label: "체크인 / 아웃 시간" },
    { key: "reviewSummary", label: "리뷰 요약" },
  ];

  // biome-ignore lint/suspicious/noExplicitAny: 어느 값이든 허용
  const isEmpty = (value: any): value is null | undefined | "" => {
    return value === null || (["table", "map"].includes(currentView) && !value);
  };

  const handleAddCellClick = () => {
    // 인증된 사용자이고 shareCode로 접속하지 않은 경우에만 편집 모드로 이동
    if (isAuthenticated && !isAccessedByShareCode) {
      handleViewChange("edit");
    } else {
      // 그 외의 경우는 팝업 표시
      onAddCellClick();
    }
  };

  const renderCellContent = (
    item: Accommodation,
    rowKey: string,
    index: number,
  ) => {
    const accommodationName = item.accommodationName || "숙소명 없음";

    switch (rowKey) {
      case "photo":
        return (
          <PhotoCell
            images={item.images}
            accommodationName={accommodationName}
            siteName={item.siteName}
            logoUrl={item.logoUrl}
            siteLink={item.url}
            state={state}
            name={`accommodationRequestList.${index}.lowestPrice`}
          />
        );
      case "reviewScore":
        if (isEmpty(item.reviewScore)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <ReviewScoreCell
            state={state}
            name={`accommodationRequestList.${index}.reviewScore`}
          />
        );
      case "cleanlinessScore":
        if (isEmpty(item.cleanlinessScore)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <CleanlinessScoreCell
            state={state}
            name={`accommodationRequestList.${index}.cleanlinessScore`}
          />
        );
      case "nearbyAttractions":
        if (isEmpty(item.nearbyAttractions)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <NearbyPlacesCell
            places={item.nearbyAttractions}
            state={state}
            name={`accommodationRequestList.${index}.nearbyAttractions`}
          />
        );
      case "amenities":
        if (isEmpty(item.amenities)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <AmenitiesCell
            amenities={item.amenities}
            state={state}
            name={`accommodationRequestList.${index}.amenities`}
          />
        );
      case "nearbyTransportation":
        if (isEmpty(item.nearbyTransportation)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <NearbyPlacesCell
            places={item.nearbyTransportation}
            state={state}
            name={`accommodationRequestList.${index}.nearbyTransportation`}
          />
        );
      case "checkInOut": {
        const { checkInTime, checkOutTime } = item;
        const checkInOutData = {
          from: checkInTime?.from,
          to: checkOutTime?.to,
        };
        if (isEmpty(checkInOutData)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <CheckInOutCell
            state={state}
            checkInName={`accommodationRequestList.${index}.checkInTime`}
            checkOutName={`accommodationRequestList.${index}.checkOutTime`}
          />
        );
      }
      case "reviewSummary":
        if (isEmpty(item.reviewSummary)) {
          return <AddCell state={state} onClick={handleAddCellClick} />;
        }
        return (
          <ReviewSummaryCell
            state={state}
            name={`accommodationRequestList.${index}.reviewSummary`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative h-full w-full max-w-full overflow-scroll rounded-[1.6rem] border border-neutral-90 bg-white",
        className,
      )}
    >
      <div className="p-[2.4rem]">
        {rows.map((row) => (
          <Fragment key={row.key}>
            {row.label && (
              <h3 className="sticky left-[2.4rem] z-10 mt-[2.4rem] mb-[0.8rem] text-heading2-semi18 text-neutral-35">
                {row.label}
              </h3>
            )}
            <div className="flex gap-[2.4rem]">
              {items.map((item, index) => (
                <div
                  key={`${row.key}-${item.id}`}
                  className="min-w-[29.8rem] flex-1"
                >
                  {renderCellContent(item, row.key, index)}
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CompareTable;
