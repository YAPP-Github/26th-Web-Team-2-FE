import { IcInfo } from "@ssok/ui";
import Photo from "@/shared/components/photo";

interface PhotoCellProps {
  images?: string[];
  name?: string;
  price?: number;
  siteName?: string;
  logoUrl?: string;
}

const PhotoCell = ({
  images,
  name,
  price,
  siteName,
  logoUrl,
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
        placeName={name || "숙소명 없음"}
        className="mb-[1.6rem] h-[24.4rem] w-full"
      />
      <div>
        <p className="mb-[0.8rem] text-black text-title3-semi24">
          {name || "숙소명 없음"}
        </p>
        <div className="flex items-center">
          <div className="mr-[0.8rem] text-heading1-semi20 text-neutral-30">
            {formatPrice(price || 0)}원
          </div>
          <div className="mr-[0.4rem] text-caption2-regular11 text-neutral-60">
            1박 당 요금
          </div>
          <span className="text-secondary-70">
            <IcInfo width="20" height="20" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default PhotoCell;
