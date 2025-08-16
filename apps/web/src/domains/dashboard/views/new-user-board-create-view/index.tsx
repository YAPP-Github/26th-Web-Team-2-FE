import Header from "@/shared/components/header";
import { BoardCreateForm } from "../../components/board-create-form";
import { DashboardVideoBackground } from "../../components/dashboard-video-background";

const NewUserBoardCreateView = () => {
  return (
    <div className="flex h-screen flex-col bg-neutral-98">
      <Header className="shrink-0 grow-0" />
      <div className="flex flex-1">
        <DashboardVideoBackground className="h-full w-full max-w-[min(calc(100%-52rem),81.6rem)] max-md:hidden" />

        <section className="flex w-full flex-1 flex-col items-center justify-center px-[6.4rem] max-md:items-start">
          <div className="flex w-full flex-col gap-[0.4rem]">
            <h1 className="text-neutral-25 text-title1-semi36">
              여행 준비를 시작해볼까요?
            </h1>
            <p className="mb-[5.2rem] text-body1-semi16 text-neutral-30">
              여행의 북마크를 모아서 보고 표로 비교해요!
            </p>
          </div>
          <BoardCreateForm className="mr-auto w-full max-w-[45.6rem]" />
        </section>
      </div>
    </div>
  );
};

export default NewUserBoardCreateView;
