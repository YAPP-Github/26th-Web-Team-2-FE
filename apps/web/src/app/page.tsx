import { redirect } from "next/navigation";

const IndexPage = async () => {
  redirect(`/dashboard`);
};

export default IndexPage;
