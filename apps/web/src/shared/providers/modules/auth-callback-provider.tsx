"use client";

import { useAuthCallbackTracking } from "@/shared/hooks/use-auth-callback-tracking";

/**
 * OAuth 콜백 후 이벤트 트래킹을 처리하는 Provider
 * Providers에서 사용하여 전역적으로 트래킹을 처리합니다.
 *
 * Q: 왜 Provider로 만들었나요?
 * A: 다른 Provider들(analytics-provider, query-provider 등)과 일관성을 유지하기 위함입니다.
 *    또한 전역적인 side effect를 처리하는 역할이므로 Provider 패턴이 더 적합합니다.
 *
 * Q: 사용처에서 Suspense를 사용하는 이유는?
 * A: Next.js App Router에서 useSearchParams()는 동적 함수(dynamic function)로 분류됩니다.
 *    Next.js 공식 문서에 따르면 useSearchParams()를 사용하는 컴포넌트는
 *    Suspense 경계로 감싸야 합니다. 이는 서버 컴포넌트와 클라이언트 컴포넌트 간의
 *    경계를 명확히 하고, searchParams가 아직 준비되지 않았을 때의 fallback을 제공하기 위함입니다.
 *    참고: https://nextjs.org/docs/app/api-reference/functions/use-search-params
 */
const AuthCallbackProvider = () => {
  useAuthCallbackTracking();
  return null;
};

export default AuthCallbackProvider;
