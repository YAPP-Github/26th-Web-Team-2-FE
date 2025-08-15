import { redirect } from "next/navigation";

const IndexPage = async () => {
  redirect(`/boards`);
};

export default IndexPage;
