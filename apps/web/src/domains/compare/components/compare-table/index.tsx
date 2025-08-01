"use client";

import { cn } from "@ssok/ui";
import { Fragment } from "react";
import AddCell from "@/domains/compare/components/compare-table/add-cell";
import AmenitiesCell from "@/domains/compare/components/compare-table/amenities-cell";
import CheckInOutCell from "@/domains/compare/components/compare-table/check-in-out-cell";
import CleanlinessScoreCell from "@/domains/compare/components/compare-table/cleanliness-score-cell";
import NearbyAttractionsCell from "@/domains/compare/components/compare-table/nearby-attractions-cell";
import NearbyTransportationCell from "@/domains/compare/components/compare-table/nearby-transportation-cell";
import PhotoCell from "@/domains/compare/components/compare-table/photo-cell";
import ReviewScoreCell from "@/domains/compare/components/compare-table/review-score-cell";
import ReviewSummaryCell from "@/domains/compare/components/compare-table/review-summary-cell";
import type { Accommodation, ViewState } from "@/domains/compare/types";
import { isCheckTimeExist } from "@/domains/compare/utils/check-in-out";

interface CompareTableProps {
  items: Accommodation[];
  state?: ViewState;
  className?: string;
}

const CompareTable = ({ items, state, className }: CompareTableProps) => {
  const rows = [
    { key: "photo", label: null },
    { key: "reviewScore", label: "리뷰 점수" },
    { key: "nearbyAttractions", label: "인근 관광지" },
    { key: "nearbyTransportation", label: "인근 교통편" },
    // { key: "cleanlinessScore", label: "청결도" },
    { key: "amenities", label: "편의 서비스" },
    // { key: "checkInOut", label: "체크인 / 아웃 시간" },
    // { key: "reviewSummary", label: "리뷰 요약" },
  ];

  const renderCellContent = (item: Accommodation, rowKey: string) => {
    switch (rowKey) {
      case "photo":
        return (
          <PhotoCell
            images={item.images}
            name={item.accommodationName}
            price={item.lowestPrice}
            siteName={item.siteName || "알 수 없음"}
            logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Booking.com_Icon_2022.svg/1200px-Booking.com_Icon_2022.svg.png"
            state={state}
          />
        );
      case "reviewScore":
        if (!item.reviewScore) {
          return <AddCell state={state} />;
        }
        return <ReviewScoreCell score={item.reviewScore} state={state} />;
      case "cleanlinessScore":
        if (!item.cleanlinessScore) {
          return <AddCell state={state} />;
        }
        return (
          <CleanlinessScoreCell score={item.cleanlinessScore} state={state} />
        );
      case "nearbyAttractions":
        if (!item.nearbyAttractions) {
          return <AddCell state={state} />;
        }
        return (
          <NearbyAttractionsCell
            attractions={item.nearbyAttractions}
            state={state}
          />
        );
      case "amenities":
        if (!item.amenities) {
          return <AddCell state={state} />;
        }
        return <AmenitiesCell amenities={item.amenities} state={state} />;
      case "nearbyTransportation":
        if (!item.nearbyTransportation) {
          return <AddCell state={state} />;
        }
        return (
          <NearbyTransportationCell
            transportation={item.nearbyTransportation}
            state={state}
          />
        );
      case "checkInOut": {
        const { checkInTime, checkOutTime } = item;
        if (!isCheckTimeExist(checkInTime) || !isCheckTimeExist(checkOutTime)) {
          return <AddCell state={state} />;
        }

        return (
          <CheckInOutCell
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            state={state}
          />
        );
      }
      case "reviewSummary":
        if (!item.reviewSummary) {
          return <AddCell state={state} />;
        }
        return <ReviewSummaryCell summary={item.reviewSummary} state={state} />;
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
              {items.map((item) => (
                <div
                  key={`${row.key}-${item.id}`}
                  className="min-w-[29.8rem] flex-1"
                >
                  {renderCellContent(item, row.key)}
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
