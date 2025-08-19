import { cn } from "@ssok/ui";
import LandingSectionContainer from "../landing-section-container";

const ProblemSections = () => {
  const problems = [
    {
      id: 1,
      background: cn(
        "bg-gradient-to-b from-0% from-[rgba(224,248,246,1)] to-100% to-[rgba(219,255,207,1)]",
      ),
      tag: cn("bg-[#C3F0EC]"),
      title: [{ id: 1, text: "끝없는 스크롤" }],
      description: [
        { id: 1, text: "단톡방에 쏟아지는 숙소 링크" },
        { id: 2, text: "“여긴 어때?” “이건 뷰 좋대”" },
      ],
      video: "/static/landing/landing-infinite-scroll.webm",
    },
    {
      id: 2,
      background: cn(
        "bg-gradient-to-b from-52% from-[rgba(220,255,207,1)] to-100% to-[rgba(213,255,230,1)]",
      ),
      tag: cn("bg-[#B5F7D0]"),
      title: [
        { id: 1, text: "호텔사이트" },
        { id: 2, text: "무한 접속" },
      ],
      description: [
        { id: 1, text: "창을 열었다 닫았다 반복하며 가격·평점 확인" },
        { id: 2, text: "비교하다 보면 어느새 머릿속은 뒤죽박죽" },
      ],
      video: "/static/landing/landing-loop-access.webm",
    },
    {
      id: 3,
      background: cn(
        "bg-gradient-to-b from-0% from-[rgba(213,255,230,1)] to-100% to-[rgba(217,244,255,1)]",
      ),
      tag: cn("bg-[#BAE5F6]"),
      title: [
        { id: 1, text: "결국, 설렘이 아닌" },
        { id: 2, text: "피곤함으로" },
      ],
      description: [
        { id: 1, text: "늦어지는 결정, 원하는 숙소는 이미 솔드아웃" },
        { id: 2, text: "결국 누군가 나서서 정리해야하는 상황" },
      ],
      video: "/static/landing/landing-tired.webm",
    },
  ];

  return (
    <>
      {problems.map((problem) => (
        <LandingSectionContainer
          key={problem.id}
          className={cn(
            "flex w-full items-start justify-between gap-[4rem] py-[16rem]",
            "max-md:flex-col",
            problem.background,
          )}
        >
          <div className="flex w-full flex-col gap-[1.6rem] max-md:items-center">
            <span
              className={cn(
                "flex w-fit items-center justify-center rounded-[0.8rem] px-[1.6rem] py-[0.8rem] text-heading2-semi18 text-secondary-40",
                problem.tag,
              )}
            >
              여행 준비할 때, 이런 경험 없으셨나요?
            </span>
            <div className="flex flex-col gap-[0.2rem]">
              {problem.title.map(({ id, text }) => (
                <h3 key={id} className="text-display1-bold56 text-secondary-15">
                  {text}
                </h3>
              ))}
            </div>
            <div className="flex flex-col">
              {problem.description.map(({ id, text }) => (
                <p key={id} className="text-secondary-20 text-title3-semi24">
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full max-w-[76.6rem] overflow-hidden rounded-[2.4rem]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={problem.video} type="video/webm" />
            </video>
          </div>
        </LandingSectionContainer>
      ))}
    </>
  );
};

export default ProblemSections;
