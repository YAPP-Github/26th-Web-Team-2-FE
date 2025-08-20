"use client";

import { Button } from "@ssok/ui";

export interface AccessDeniedViewProps {
  title: string;
  description: string;
  errorCode: string;
  buttonText: string;
  to?: string;
}

const AccessDeniedView = ({
  title,
  description,
  errorCode,
  buttonText,
  to,
}: AccessDeniedViewProps) => {
  const handleRefresh = () => {
    if (to) {
      window.location.href = to;
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen w-full max-w-[81.2rem] flex-col items-center justify-center bg-white px-8">
      <div className="flex flex-col gap-[1.6rem]">
        <h1 className="text-neutral-10 text-title1-semi36">{title}</h1>
        <p className="text-heading1-semi20 text-neutral-40">{description}</p>
        <p className="text-body2-medi14 text-neutral-50">{errorCode}</p>
      </div>
      <div className="mt-[3.6rem] flex w-full justify-end">
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={handleRefresh}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default AccessDeniedView;
