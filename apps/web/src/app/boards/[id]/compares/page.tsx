import { redirect } from "next/navigation";

interface BoardsIdComparesPageProps {
  params: Promise<{ id: string }>;
}

const BoardsIdComparesPage = async ({ params }: BoardsIdComparesPageProps) => {
  const { id } = await params;
  // TODO: 추후 API 호출을 통해 기본 비교표 ID를 가져오도록 수정
  const defaultCompareId = "1";
  redirect(`/boards/${id}/compares/${defaultCompareId}`);
};

export default BoardsIdComparesPage;
