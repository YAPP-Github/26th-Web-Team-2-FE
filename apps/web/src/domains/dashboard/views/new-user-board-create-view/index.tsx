import Header from "@/shared/components/header";
import BoardCreateForm from "../../components/board-create-form";
import DashboardVideoBackground from "../../components/dashboard-video-background";

const NewUserBoardCreateView = () => {
  return (
    <div className="min-h-screen bg-neutral-98">
      {/* Header */}
      <Header />

      <div className="flex h-[calc(100vh-6.5rem)]">
        <div className="w-[81.6rem]">
          <DashboardVideoBackground className="h-full w-full" />
        </div>

        <div className="flex-1 px-[4.8rem] py-[27rem]">
          <div className="w-[50.4rem]">
            <BoardCreateForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserBoardCreateView;
