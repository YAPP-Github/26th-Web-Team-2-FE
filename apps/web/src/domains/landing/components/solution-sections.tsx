import Image from "next/image";
import LandingSectionContainer from "./landing-section-container";

const SolutionSections = () => {
  const solutions = [
    {
      id: 1,
      title1: "흩어진 링크들을",
      title2: "한 곳에 모아드려요",
      description: "단톡방·메모장·브라우저 탭 속 링크를 한 번에 모아줘요.",
      frameColor: "#01CCFB",
      image: "/images/landing/solution-1.png",
    },
    {
      id: 2,
      title1: "복잡한 선택지를",
      title2: "표로 정리해드려요",
      description1: '"여긴 관광지랑 가깝네", "이곳은 청결이 아쉽네"',
      description2: "복잡했던 선택지가 한 장에 쏙 정리돼요.",
      frameColor: "#D0FF75",
      image: "/images/landing/solution-2.png",
    },
    {
      id: 3,
      title1: "모든 팀원이 함께",
      title2: "의견을 모을 수 있어요",
      description: "귀찮은 설득 대신, 자연스럽게 의견이 모여요",
      frameColor: "#F899DF",
      image: null, // 3번째는 이미지가 없고 특별한 UI가 있음
    },
  ];

  return (
    <LandingSectionContainer className="gap-[16rem] bg-white">
      {solutions.map((solution) => (
        <div key={solution.id} className="flex w-full flex-col gap-[4.8rem]">
          {/* Title Group */}
          <div className="flex flex-col gap-[1.6rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <h3 className="font-bold text-[#102B1E] text-[3.6rem] leading-[1.5] tracking-[-0.017em]">
                {solution.title1}
              </h3>
              <h3 className="font-bold text-[#102B1E] text-[3.6rem] leading-[1.5] tracking-[-0.017em]">
                {solution.title2}
              </h3>
            </div>
            <div className="flex flex-col">
              <p className="w-[50.8rem] font-medium text-[#313131] text-[2.2rem] leading-[1.5]">
                {solution.description}
              </p>
              {solution.description1 && (
                <>
                  <p className="w-[50.8rem] font-medium text-[#313131] text-[2.2rem] leading-[1.5]">
                    {solution.description1}
                  </p>
                  <p className="w-[50.8rem] font-medium text-[#313131] text-[2.2rem] leading-[1.5]">
                    {solution.description2}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Content Frame */}
          <div className="flex flex-col gap-[4.8rem]">
            <div
              className="h-[55.2rem] w-full rounded-[2.4rem] border-2 border-[#E3E3E3]"
              style={{ backgroundColor: solution.frameColor }}
            />

            {solution.image ? (
              <div className="relative h-[55.2rem] w-full overflow-hidden rounded-[2.4rem]">
                <Image
                  src={solution.image}
                  alt={`솔루션 ${solution.id}`}
                  width={1232}
                  height={552}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              // 3번째 솔루션용 특별 UI (멤버 초대 팝업 등)
              <div className="relative flex h-[55.2rem] w-full items-center justify-center rounded-[2.4rem] bg-neutral-95">
                <div className="font-medium text-[2rem] text-neutral-60">
                  협업 기능 UI가 여기에 표시됩니다
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </LandingSectionContainer>
  );
};

export default SolutionSections;
