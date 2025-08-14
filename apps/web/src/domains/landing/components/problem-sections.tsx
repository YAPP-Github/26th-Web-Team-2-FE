import Image from "next/image";
import LandingSectionContainer from "./landing-section-container";

const ProblemSections = () => {
  const problems = [
    {
      id: 1,
      background:
        "linear-gradient(180deg, rgba(224, 248, 246, 1) 0%, rgba(219, 255, 207, 1) 100%)",
      tagColor: "#C3F0EC",
      title: "단톡방에 쏟아지는 숙소 링크",
      subtitle: '"여긴 어때?" "이건 뷰 좋대"',
      image: "/images/landing/problem-1.png",
    },
    {
      id: 2,
      background:
        "linear-gradient(180deg, rgba(220, 255, 207, 1) 52%, rgba(213, 255, 230, 1) 100%)",
      tagColor: "#B5F7D0",
      title: "창을 열었다 닫았다 반복하며 가격·평점 확인",
      subtitle: "비교하다 보면 어느새 머릿속은 뒤죽박죽",
      image: "/images/landing/problem-2.png",
    },
    {
      id: 3,
      background:
        "linear-gradient(180deg, rgba(213, 255, 230, 1) 0%, rgba(217, 244, 255, 1) 100%)",
      tagColor: "#BAE5F6",
      title: "늦어지는 결정, 원하는 숙소는 이미 솔드아웃",
      subtitle: "결국 누군가 나서서 정리해야하는 상황",
      image: "/images/landing/problem-3.png",
    },
  ];

  return (
    <>
      {problems.map((problem) => (
        <LandingSectionContainer
          key={problem.id}
          className="h-[85rem] items-center px-0 py-0"
          style={{ background: problem.background }}
        >
          <div className="flex w-full justify-between gap-[5.4rem] px-[10.4rem] py-[16rem]">
            <div className="flex w-[123.2rem] flex-col gap-[1.6rem]">
              <div className="flex flex-col gap-[1.6rem]">
                <div className="flex flex-col gap-[0.2rem]">
                  <div
                    className="flex w-fit items-center gap-[0.8rem] rounded-[0.8rem] px-[1.6rem] py-[0.8rem]"
                    style={{ backgroundColor: problem.tagColor }}
                  >
                    <span className="font-semibold text-[#1B3628] text-[2.4rem] leading-[1.5]">
                      0{problem.id}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="w-[41.2rem] font-semibold text-[#1B3628] text-[2.4rem] leading-[1.5]">
                    {problem.title}
                  </h3>
                  <p className="w-[41.2rem] font-semibold text-[#1B3628] text-[2.4rem] leading-[1.5]">
                    {problem.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[53rem] w-[76.6rem] overflow-hidden rounded-[2.4rem]">
              <Image
                src={problem.image}
                alt={`문제 상황 ${problem.id}`}
                width={766}
                height={530}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </LandingSectionContainer>
      ))}
    </>
  );
};

export default ProblemSections;
