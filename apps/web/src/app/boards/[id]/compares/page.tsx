import { redirect } from "next/navigation";
import { auth } from "@/domains/auth";
import CompareListView from "@/domains/compare/views/compare-list-view";

const BoardsIdComparesPage = async () => {
  const session = await auth.getSession({ refresh: false });
  if (!session) {
    redirect("/api/auth/login?to=/");
  }
  return <CompareListView />;
};
export default BoardsIdComparesPage;
