import LandingSectionContainer from "./landing-section-container";

const ProblemBannerSection = () => {
  return (
    <LandingSectionContainer className="bg-gradient-to-b from-[#EAEEFC] to-[#E0F8F6] pt-[14.8rem]">
      <div className="flex flex-col items-center gap-[0.4rem]">
        <h2 className="text-center font-semibold text-[#102B1E] text-[4.8rem] leading-[1.5] tracking-[-0.017em]">
          여행 준비할 때, 이런 경험 없으셨나요?
        </h2>
      </div>
    </LandingSectionContainer>
  );
};

export default ProblemBannerSection;
