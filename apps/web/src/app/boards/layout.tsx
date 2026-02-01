import type { PropsWithChildren } from "react";
import MobileIncompatibleLayout from "@/shared/components/mobile-incompatible-layout";

const BoardsLayout = ({ children }: PropsWithChildren) => {
  return <MobileIncompatibleLayout>{children}</MobileIncompatibleLayout>;
};

export default BoardsLayout;
