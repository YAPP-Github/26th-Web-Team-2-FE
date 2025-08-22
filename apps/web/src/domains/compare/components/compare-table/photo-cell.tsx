import { IcInfo, TextField } from "@ssok/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { ComparisonFormData, ViewState } from "@/domains/compare/types";
import Photo from "@/shared/components/photo";

export interface PhotoCellProps {
  images?: string[];
  accommodationName: string;
  siteName?: string;
  logoUrl?: string;
  siteLink?: string;
  state: ViewState;
  name: `accommodationRequestList.${number}.lowestPrice`;
}

const PhotoCell = ({
  images,
  accommodationName,
  siteName,
  logoUrl,
  state,
  siteLink,
  name,
}: PhotoCellProps) => {
  const defaultSiteName = siteName || "기본";
  const defaultLogoUrl = logoUrl || "/default-logo.png";

  return (
    <section className="w-full">
      <Photo
        images={images || []}
        imgAlt="숙소 이미지"
        siteName={defaultSiteName}
        logoUrl={defaultLogoUrl}
        siteLink={siteLink}
        placeName={accommodationName}
        className="mb-[1.6rem] h-[24.4rem] w-full"
      />
      <div>
        <p className="mb-[0.8rem] text-black text-title3-semi24">
          {accommodationName}
        </p>
        <div className="flex items-center">
          <div className="mr-[0.8rem]">
            <PriceInput name={name} state={state} />
          </div>
          <div className="mr-[0.4rem]">1박 당 요금</div>
          <span className="text-secondary-70">
            <IcInfo width="20" height="20" />
          </span>
        </div>
      </div>
    </section>
  );
};

const PriceInput = ({
  name,
  state,
}: {
  name: PhotoCellProps["name"];
  state: ViewState;
}) => {
  const { control } = useFormContext<ComparisonFormData>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        if (state !== "edit") {
          return (
            <p className="text-heading1-semi20 text-neutral-30">
              {field.value}
            </p>
          );
        }

        return (
          <TextField
            value={field.value}
            onChange={field.onChange}
            className="max-w-[16rem] rounded-[0.8rem] text-heading1-semi20 [&>input]:px-[0.8rem] [&>input]:py-[0.4rem]"
          />
        );
      }}
    />
  );
};

export default PhotoCell;
