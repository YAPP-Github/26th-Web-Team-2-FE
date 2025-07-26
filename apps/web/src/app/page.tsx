import { redirect } from "next/navigation";

const IndexPage = async () => {
  const defaultBoardId = "1";
  redirect(`/boards/${defaultBoardId}/lists`);
};

export default IndexPage;
