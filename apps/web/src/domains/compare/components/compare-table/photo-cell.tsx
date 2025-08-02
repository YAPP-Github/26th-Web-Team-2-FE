import { IcInfo, TextField } from "@ssok/ui";
import type { ViewState } from "@/domains/compare/types";
import Photo from "@/shared/components/photo";

interface PhotoCellProps {
  images?: string[];
  name: string;
  price?: number;
  siteName?: string;
  logoUrl?: string;
  state?: ViewState;
}

const PhotoCell = ({
  images,
  name,
  price,
  siteName,
  logoUrl,
  state,
}: PhotoCellProps) => {
  const defaultSiteName = siteName || "기본";
  const defaultLogoUrl = logoUrl || "/default-logo.png";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <section className="w-full">
      <Photo
        images={images || []}
        imgAlt="숙소 이미지"
        siteName={defaultSiteName}
        logoUrl={defaultLogoUrl}
        placeName={name}
        className="mb-[1.6rem] h-[24.4rem] w-full"
      />
      <div>
        <p className="mb-[0.8rem] text-black text-title3-semi24">{name}</p>
        <div className="flex items-center">
          <div className="mr-[0.8rem]">
            {state !== "edit" && (
              <p className="text-heading1-semi20 text-neutral-30">
                {formatPrice(price || 0)}원
              </p>
            )}
            {state === "edit" && (
              // TODO: max-w-[16rem]를 InputAutosize를 사용하여 자동으로 너비가 조정되도록 변경
              // TODO: value/onChange 등록
              <TextField
                defaultValue={`${formatPrice(price || 0)}원`}
                className="max-w-[16rem] rounded-[0.8rem] text-heading1-semi20 [&>input]:px-[0.8rem] [&>input]:py-[0.4rem]"
              />
            )}
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

export default PhotoCell;
