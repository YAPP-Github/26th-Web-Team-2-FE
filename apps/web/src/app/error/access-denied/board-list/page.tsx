"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AccessDeniedView from "@/shared/views/access-denied-view";

const ErrorAccessDeniedBoardListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRetry = () => {
    const to = searchParams.get("to");
    if (to) {
      router.push(to);
    } else {
      router.push("/boards");
    }
  };

  return (
    <AccessDeniedView
      title="www.ssok.info에 대한 액세스가 거부됨"
      description="이 보드를 볼 수 있는 권한이 없어요."
      errorCode="HTTP ERROR 403"
      buttonText="다시 시도"
      onRetry={handleRetry}
    />
  );
};

export default ErrorAccessDeniedBoardListPage;
