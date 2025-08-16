import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ImageCardProps<T extends ElementType = "img"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

const ImageCard = <T extends ElementType = "img">({
  as,
  ...props
}: ImageCardProps<T>) => {
  const Component = as || "img";
  return <Component {...props} />;
};

export default ImageCard;
