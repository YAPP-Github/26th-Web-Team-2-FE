"use client";

import * as Sentry from "@sentry/nextjs";
import { Button } from "@ssok/ui";
import type { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-10 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center">
          <h2 className="text-neutral-100 text-title3-bold24">
            오류가 발생했습니다
          </h2>
          <p className="mt-2 text-body1-regular16 text-neutral-80">
            예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-4 rounded bg-error-10 p-3">
            <summary className="cursor-pointer text-body2-medi14 text-error-60">
              개발자 정보
            </summary>
            <pre className="mt-2 overflow-auto text-caption2-regular11 text-error-80">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="medium"
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            새로고침
          </Button>
          <Button
            variant="filled"
            size="medium"
            onClick={resetErrorBoundary}
            className="flex-1"
          >
            다시 시도
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (props: ErrorFallbackProps) => ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

export function ErrorBoundary({
  children,
  fallback = ErrorFallback,
  onError,
}: ErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: { componentStack: string }) => {
    // Sentry에 에러 보고
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    // 커스텀 에러 핸들러 실행
    onError?.(error, errorInfo);
  };

  return (
    <ReactErrorBoundary FallbackComponent={fallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
}
