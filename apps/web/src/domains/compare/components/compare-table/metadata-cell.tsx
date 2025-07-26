interface MetadataCellProps {
  name: string;
  price: number;
}

const MetadataCell = ({ name, price }: MetadataCellProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div>
      <h3 className="mb-[0.4rem] line-clamp-2 text-body2-semi14 text-neutral-20">
        {name}
      </h3>
      <div className="mb-[0.4rem] text-caption1-medi12 text-neutral-40">
        {formatPrice(price)}원
      </div>
      <div className="text-caption2-regular11 text-neutral-50">1박 당 요금</div>
    </div>
  );
};

export default MetadataCell;
