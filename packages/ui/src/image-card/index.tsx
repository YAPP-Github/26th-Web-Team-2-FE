import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ImageCardProps<T extends ElementType = "img"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const ImageCard = <T extends ElementType = "img">({
  as,
  ...props
}: ImageCardProps<T>) => {
  const Component = as || "img";
  return <Component {...props} />;
};
