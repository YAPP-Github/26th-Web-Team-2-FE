import { cn } from "@ssok/ui";
import LandingSectionContainer from "../landing-section-container";

const ProblemBannerSection = () => {
  return (
    <LandingSectionContainer
      className={cn(
        "bg-gradient-to-b from-[#EAEEFC] to-[#E0F8F6]",
        "[&>div]:pt-[14.8rem] [&>div]:pb-[10.4rem]",
        "max-xl:[&>div]:pt-[7.2rem] max-xl:[&>div]:pb-[4.8rem]",
      )}
    >
      <h2
        className={cn(
          "text-center",
          "max-xl:text-title3-bold24",
          "xl:text-display1-bold56",
        )}
      >
        <span className={cn("max-xl:hidden", "xl:inline")}>
          여행 준비할 때, 이런 경험 없으셨나요?
        </span>
        <span className={cn("max-xl:inline", "xl:hidden")}>
          여행 준비할 때,
          <br />
          이런 경험 없으셨나요?
        </span>
      </h2>
    </LandingSectionContainer>
  );
};

export default ProblemBannerSection;
