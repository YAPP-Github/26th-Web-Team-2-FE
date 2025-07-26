import { IcInfo } from "@ssok/ui";
import Image from "next/image";

interface PhotoCellProps {
  images?: string[];
  name?: string;
  price?: number;
}

const PhotoCell = ({ images, name, price }: PhotoCellProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <section className="w-full">
      {images?.[0] && (
        <Image
          src={images[0]}
          alt="숙소 이미지"
          width={100}
          height={100}
          className="mb-[1.6rem] h-[24.4rem] w-full rounded-[1.2rem]"
        />
      )}
      {!images?.[0] && (
        <div className="mb-[1.6rem] flex h-[24.4rem] w-full items-center justify-center rounded-[1.2rem] bg-neutral-90">
          <span className="text-body2-regular14 text-neutral-40">
            {"이미지 없음"}
          </span>
        </div>
      )}

      <div>
        <p className="mb-[0.8rem] text-neutral-30 text-title3-semi24">
          {name || "숙소명 없음"}
        </p>
        <div className="flex items-center">
          <div className="mr-[0.8rem] text-heading1-semi20 text-neutral-10">
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
