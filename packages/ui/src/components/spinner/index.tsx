import { cn } from "@/utils";

type LoadingIndicatorProps = {
  active: boolean;
};

const LoadingIndicator = ({ active }: LoadingIndicatorProps) => {
  if (!active) return null;

  return (
    <main className="fixed inset-0 z-10 flex h-full w-full items-center justify-center">
      {/* 배경만 반투명 */}
      <div className="absolute inset-0 bg-neutral-5/30" />

      <section
        className={cn(
          "relative flex flex-col items-center justify-center gap-[1.6rem] rounded-[2rem] p-[2.8rem] pb-[2.4rem]",
          "border border-secondary-90 bg-primary-100 shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]",
        )}
      >
        {/* 바깥 원 (도넛 스피너) */}
        <div className="relative h-[3.6rem] w-[3.6rem] animate-spin-reverse rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#0BB77D_0deg,#0BB77D_63.24300169944763deg,rgba(255,255,255,0)_360deg)] delay-[1000ms]">
          {/* 안쪽 구멍 */}
          <div className="absolute inset-[18%] rounded-full bg-primary-100" />

          {/* 끝점 강조 점 */}
          <div className="-translate-x-1/2 absolute top-[82%] left-1/2 h-[18%] w-[18%] rounded-full bg-[#0BB77D]" />
        </div>

        <span className="text-body2-medi14 text-neutral-20">
          불러오는 중...
        </span>
      </section>
    </main>
  );
};

export default LoadingIndicator;
