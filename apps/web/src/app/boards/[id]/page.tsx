import { joinTripBoard } from "@ssok/api";
import { redirect } from "next/navigation";
import { auth } from "@/domains/auth";
import { redirectToLogin } from "@/domains/auth/utils/url";

export interface BoardsIdPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ code?: string }>;
}

const BoardsIdPage = async ({ params, searchParams }: BoardsIdPageProps) => {
  const { id } = await params;
  const { code } = await searchParams;
  if (!code) {
    redirect(`/boards/${id}/lists`);
  }

  try {
    const session = await auth.getSession({ refresh: false });
    if (!session) {
      return redirectToLogin();
    }
    await joinTripBoard(
      { invitationCode: code },
      {
        headers: { Authorization: `Bearer ${session.tokenSet.accessToken}` },
      },
    );

    redirect(`/boards/${id}/lists?joined=true`);
  } catch (error) {
    console.error(error);
  }

  redirect(`/boards/${id}/lists`);
};

export default BoardsIdPage;
