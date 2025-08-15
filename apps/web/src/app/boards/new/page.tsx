import NewUserBoardCreateView from "@/domains/dashboard/views/new-user-board-create-view";

const BoardsNewPage = async () => {
  // const session = await auth.getSession({ refresh: false });
  // if (!session) {
  //   redirect("/api/auth/login");
  // }
  return <NewUserBoardCreateView />;
};

export default BoardsNewPage;
