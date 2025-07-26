"use client";
import { useSuccessSuspense } from "@ssok/api";
import { Suspense } from "react";

const DebugAPIPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DebugAPIContent />
    </Suspense>
  );
};

const DebugAPIContent = () => {
  const { data } = useSuccessSuspense();
  return <div className="text-body1-medi16">{JSON.stringify(data)}</div>;
};

export default DebugAPIPage;
