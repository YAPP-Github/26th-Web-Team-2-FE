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
            "[&>div]:flex [&>div]:w-full [&>div]:items-start [&>div]:justify-between",
            "[&>div]:gap-[4rem] [&>div]:py-[16rem]",
            "max-xl:[&>div]:flex-col max-xl:[&>div]:gap-[2.4rem] max-xl:[&>div]:py-[4.8rem]",
            problem.background,
          )}
        >
          <div
            className={cn(
              "flex w-full flex-col",
              "max-xl:gap-[0.8rem] xl:gap-[1.6rem]",
            )}
          >
            <span
              className={cn(
                "items-center justify-center rounded-[0.8rem] px-[1.6rem] py-[0.8rem] text-secondary-40",
                "text-heading2-semi18",
                "max-xl:hidden",
                "xl:flex xl:w-fit",
                problem.tag,
              )}
            >
              여행 준비할 때, 이런 경험 없으셨나요?
            </span>
            <div className={cn("flex flex-col gap-[0.2rem]")}>
              {problem.title.map(({ id, text }) => (
                <h3
                  key={id}
                  className={cn(
                    "text-display1-bold56 text-secondary-15",
                    "max-xl:text-title3-bold24",
                  )}
                >
                  {text}
                </h3>
              ))}
            </div>
            <div className={cn("flex flex-col")}>
              {problem.description.map(({ id, text }) => (
                <p
                  key={id}
                  className={cn(
                    "text-secondary-20",
                    "max-xl:text-body2-semi14",
                    "xl:text-title3-semi24",
                  )}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div
            className={cn(
              "w-full max-w-[76.6rem] overflow-hidden rounded-[2.4rem]",
              "max-xl:max-w-full max-xl:rounded-[1.2rem]",
            )}
          >
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
