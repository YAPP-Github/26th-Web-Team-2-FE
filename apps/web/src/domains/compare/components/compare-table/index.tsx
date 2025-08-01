"use client";

import { cn } from "@ssok/ui";
import { Fragment } from "react";
import AmenitiesCell from "@/domains/compare/components/compare-table/amenities-cell";
import CheckInOutCell from "@/domains/compare/components/compare-table/check-in-out-cell";
import CleanlinessScoreCell from "@/domains/compare/components/compare-table/cleanliness-score-cell";
import NearbyAttractionsCell from "@/domains/compare/components/compare-table/nearby-attractions-cell";
import NearbyTransportationCell from "@/domains/compare/components/compare-table/nearby-transportation-cell";
import PhotoCell from "@/domains/compare/components/compare-table/photo-cell";
import ReviewScoreCell from "@/domains/compare/components/compare-table/review-score-cell";
import ReviewSummaryCell from "@/domains/compare/components/compare-table/review-summary-cell";
import type { Accommodation } from "@/domains/compare/types";
import { isCheckTimeExist } from "@/domains/compare/utils/check-in-out";

interface CompareTableProps {
  items: Accommodation[];
  className?: string;
}

const CompareTable = ({ items, className }: CompareTableProps) => {
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
          />
        );
      case "reviewScore":
        return <ReviewScoreCell score={item.reviewScore} />;
      case "cleanlinessScore":
        return <CleanlinessScoreCell score={item.cleanlinessScore} />;
      case "nearbyAttractions":
        return <NearbyAttractionsCell attractions={item.nearbyAttractions} />;
      case "amenities":
        return <AmenitiesCell amenities={item.amenities} />;
      case "nearbyTransportation":
        return (
          <NearbyTransportationCell
            transportation={item.nearbyTransportation}
          />
        );
      case "checkInOut": {
        const { checkInTime, checkOutTime } = item;
        if (!isCheckTimeExist(checkInTime) || !isCheckTimeExist(checkOutTime)) {
          return null;
        }

        return (
          <CheckInOutCell
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
          />
        );
      }
      case "reviewSummary":
        return <ReviewSummaryCell summary={item.reviewSummary} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "h-full w-full overflow-scroll rounded-[1.6rem] p-[2.4rem]",
        "border border-neutral-90 bg-white",
        className,
      )}
    >
      {rows.map((row) => (
        <Fragment key={row.key}>
          {row.label && (
            <h3 className="mt-[2.4rem] mb-[0.8rem] text-heading2-semi18 text-neutral-35">
              {row.label}
            </h3>
          )}
          <div className="flex gap-[2.4rem]">
            {items.map((item) => (
              <div key={`${row.key}-${item.id}`} className="flex-1">
                {renderCellContent(item, row.key)}
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CompareTable;
