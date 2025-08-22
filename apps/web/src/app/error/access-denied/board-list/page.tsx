import AccessDeniedView from "@/shared/views/access-denied-view";

const ErrorAccessDeniedBoardListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) => {
  const { to } = await searchParams;

  return (
    <AccessDeniedView
      title="ssok.info에 대한 액세스가 거부됨"
      description="이 보드를 볼 수 있는 권한이 없어요."
      errorCode="HTTP ERROR 403"
      buttonText="다시 시도"
      to={to}
    />
  );
};

export default ErrorAccessDeniedBoardListPage;
