"use client";

import { useAuthCallbackTracking } from "@/shared/hooks/use-auth-callback-tracking";

/**
 * OAuth 콜백 후 이벤트 트래킹을 처리하는 Provider
 * Providers에서 사용하여 전역적으로 트래킹을 처리합니다.
 */
const AuthCallbackProvider = () => {
  useAuthCallbackTracking();
  return null;
};

export default AuthCallbackProvider;
