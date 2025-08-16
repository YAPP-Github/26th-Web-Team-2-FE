import type { AmenityUpdate } from "@ssok/api/schemas";
import {
  Chip,
  IcAccessibleForward,
  IcCleaningServices,
  IcFitnessCenter,
  IcHomeRepairService,
  IcLocalBar,
  IcLocalParking,
  IcLuggage,
  IcPets,
  IcPointOfSale,
  IcPool,
  IcRestaurant,
  IcWifi,
  TextField,
} from "@ssok/ui";
import { Controller, useFormContext } from "react-hook-form";
import type {
  Accommodation,
  ComparisonFormData,
  ViewState,
} from "@/domains/compare/types";

interface AmenitiesCellProps {
  amenities: NonNullable<Accommodation["amenities"]>;
  state: ViewState;
  name: `accommodationRequestList.${number}.amenities`;
}

export const AmenitiesCell = ({
  amenities,
  state,
  name,
}: AmenitiesCellProps) => {
  return (
    <section className="flex flex-col gap-[1.6rem] rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      {amenities.map((amenity, index) => {
        if (amenity.available === false) {
          return null;
        }
        return (
          <TableAmenity
            key={index}
            amenity={amenity}
            state={state}
            name={`${name}.${index}`}
          />
        );
      })}
    </section>
  );
};

const TableAmenity = ({
  amenity,
  state,
  name,
}: {
  amenity: AmenityUpdate;
  state: ViewState;
  name: `accommodationRequestList.${number}.amenities.${number}`;
}) => {
  const { control } = useFormContext<ComparisonFormData>();
  const { icon = null, text = "" } = useAmenity({ amenity }) || {};

  return (
    <>
      {state !== "edit" && (
        <div key={text} className="flex items-center gap-[0.8rem]">
          <span className="flex-shrink-0 text-neutral-60">{icon}</span>
          <p className="flex-shrink-0 text-body1-semi16 text-neutral-30">
            {text}
          </p>
          {amenity.description && (
            <Chip
              size="md"
              text={amenity.description}
              className="min-w-0 max-w-full flex-shrink-1 bg-neutral-95 [&>span:last-child]:truncate"
            />
          )}
        </div>
      )}
      {state === "edit" && (
        <div key={text} className="">
          <div className="mb-[0.4rem] flex items-center gap-[0.8rem]">
            <span className="flex-shrink-0 text-neutral-60">{icon}</span>
            <p className="flex-shrink-0 text-body1-semi16 text-neutral-30">
              {text}
            </p>
          </div>
          <Controller
            control={control}
            name={`${name}.description`}
            defaultValue={amenity.description}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value as string}
                placeholder="필요한 정보를 기입해보세요. (최대 45자)"
                maxLength={45}
                className="mb-[0.8rem] rounded-[0.8rem] bg-white text-body2-medi14 [&>input]:p-[0.8rem]"
              />
            )}
          />
        </div>
      )}
    </>
  );
};

const useAmenity = ({ amenity }: { amenity: AmenityUpdate }) => {
  if (amenity.type === "parking") {
    return { icon: <IcLocalParking width="20" height="20" />, text: "주차" };
  }
  if (amenity.type === "breakfast") {
    return { icon: <IcRestaurant width="20" height="20" />, text: "조식" };
  }
  if (amenity.type === "free_wifi") {
    return { icon: <IcWifi width="20" height="20" />, text: "무료 와이파이" };
  }
  if (amenity.type === "pool") {
    return { icon: <IcPool width="20" height="20" />, text: "수영장" };
  }
  if (amenity.type === "fitness") {
    return {
      icon: <IcFitnessCenter width="20" height="20" />,
      text: "피트니스 & 헬스장",
    };
  }
  if (amenity.type === "luggage_storage") {
    return { icon: <IcLuggage width="20" height="20" />, text: "짐보관" };
  }
  if (amenity.type === "bar_lounge") {
    return { icon: <IcLocalBar width="20" height="20" />, text: "바 / 라운지" };
  }
  if (amenity.type === "front_desk_hours") {
    return {
      icon: <IcPointOfSale width="20" height="20" />,
      text: "프론트데스크",
    };
  }
  if (amenity.type === "pet_friendly") {
    return { icon: <IcPets width="20" height="20" />, text: "반려동물 동반" };
  }
  if (amenity.type === "business_services") {
    return {
      icon: <IcHomeRepairService width="20" height="20" />,
      text: "비즈니스 서비스",
    };
  }
  if (amenity.type === "cleaning_service") {
    return {
      icon: <IcCleaningServices width="20" height="20" />,
      text: "청소 서비스",
    };
  }
  if (amenity.type === "handicap_facilities") {
    return {
      icon: <IcAccessibleForward width="20" height="20" />,
      text: "장애인 편의시설",
    };
  }
  return null;
};
