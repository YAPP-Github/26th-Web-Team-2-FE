interface ImageCellProps {
  images: string[];
}

const ImageCell = ({ images }: ImageCellProps) => {
  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-[0.8rem] bg-neutral-90">
      <span className="text-body2-regular14 text-neutral-40">사진</span>
    </div>
  );
};

export default ImageCell;
