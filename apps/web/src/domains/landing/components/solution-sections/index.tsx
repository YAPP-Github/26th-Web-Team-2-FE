import { cn } from "@ssok/ui";
import type { PropsWithChildren } from "react";
import LandingSectionContainer from "../landing-section-container";

const SolutionSections = () => {
  const solutions = [
    {
      id: 1,
      title: [
        { id: 1, text: "흩어진 숙소 링크," },
        {
          id: 2,
          text: (
            <>
              <Highlight>한 곳에서 관리</Highlight>해보세요
            </>
          ),
        },
      ],
      description: [
        {
          id: 1,
          text: "단톡방·메모장·브라우저 탭 속 링크를 한 번에 모아줘요.",
        },
      ],
      background: cn("bg-[#01CCFB]"),
      video: "/static/landing/landing-all-in-one.webm",
    },
    {
      id: 2,
      title: [
        { id: 1, text: "가격·위치·평점까지," },
        {
          id: 2,
          text: (
            <>
              <Highlight>한 눈에 비교</Highlight>해보세요
            </>
          ),
        },
      ],
      description: [
        { id: 1, text: "“여긴 관광지랑 가깝네”, “이곳은 청결이 아쉽네”" },
        { id: 2, text: "복잡했던 선택지가 한 장에 쏙 정리돼요." },
      ],
      background: cn("bg-[#D0FF75]"),
      video: "/static/landing/landing-compare.webm",
    },
    {
      id: 3,
      title: [
        { id: 1, text: "혼자 하는 여행준비는 이제 그만," },
        {
          id: 2,
          text: (
            <>
              <Highlight>함께 결정</Highlight>하세요
            </>
          ),
        },
      ],
      description: [
        { id: 1, text: "귀찮은 설득 대신, 자연스럽게 의견이 모여요" },
      ],
      background: cn("bg-[#F899DF]"),
      video: "/static/landing/landing-decision.webm",
    },
  ];

  return (
    <LandingSectionContainer
      className={cn(
        "bg-white [&>div]:flex [&>div]:flex-col",
        "xl:[&>div]:gap-[16rem] xl:[&>div]:py-[10.4rem]",
        "max-xl:[&>div]:gap-[9.6rem] max-xl:[&>div]:py-[4.8rem]",
      )}
    >
      {solutions.map((solution) => (
        <div
          key={solution.id}
          className={cn(
            "flex w-full flex-col gap-[4.8rem]",
            "max-xl:gap-[2.4rem]",
          )}
        >
          <div
            className={cn("flex flex-col max-xl:gap-[0.8rem] xl:gap-[1.6rem]")}
          >
            <div className={cn("flex flex-col")}>
              {solution.title.map(({ id, text }) => (
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
            <div className="flex flex-col xl:gap-[1.6rem]">
              {solution.description.map(({ id, text }) => (
                <p
                  key={id}
                  className={cn(
                    "text-neutral-20 text-title4-medi22",
                    "max-xl:text-body2-semi14",
                  )}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "w-full overflow-hidden border-2 border-neutral-90",
              "rounded-[2.4rem]",
              "max-xl:rounded-[1.2rem]",
              solution.background,
            )}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={solution.video} type="video/webm" />
            </video>
          </div>
        </div>
      ))}
    </LandingSectionContainer>
  );
};

const Highlight = ({ children }: PropsWithChildren) => {
  return <span className="text-primary">{children}</span>;
};

export default SolutionSections;
