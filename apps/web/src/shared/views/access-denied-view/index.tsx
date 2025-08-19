"use client";

import { Button } from "@ssok/ui";

export interface AccessDeniedViewProps {
  onRefresh?: () => void;
}

const AccessDeniedView = ({ onRefresh }: AccessDeniedViewProps) => {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen w-full max-w-[81.2rem] flex-col items-center justify-center bg-white px-8">
      <div className="flex flex-col gap-[1.6rem]">
        <h1 className="text-neutral-10 text-title1-semi36">
          www.ssok.info에 대한 액세스가 거부됨
        </h1>
        <p className="text-heading1-semi20 text-neutral-40">
          이 페이지를 볼 수 있는 권한이 없어요.
        </p>
        <p className="text-body2-medi14 text-neutral-50">HTTP ERROR 403</p>
      </div>
      <div className="mt-[3.6rem] flex w-full justify-end">
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={handleRefresh}
        >
          새로고침
        </Button>
      </div>
    </div>
  );
};

export default AccessDeniedView;
