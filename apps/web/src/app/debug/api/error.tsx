"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

interface DebugAPIErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const DebugAPIError = ({ error, reset }: DebugAPIErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-body1-medi16">Something went wrong!</h2>
      <button type="reset" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default DebugAPIError;
