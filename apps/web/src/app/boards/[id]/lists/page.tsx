import PlaceListView from "@/domains/list/views/place-list-view";

export interface BoardsIdListsPageProps {
  params: Promise<{ id: string }>;
}

const BoardsIdListsPage = async ({ params }: BoardsIdListsPageProps) => {
  const { id } = await params;

  return <PlaceListView />;
};

export default BoardsIdListsPage;
