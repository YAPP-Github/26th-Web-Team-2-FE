"use client";
import { useAuthCallbackTracking } from "@/shared/hooks/use-auth-callback-tracking";

/**
 * OAuth 콜백 후 이벤트 트래킹을 처리하는 클라이언트 컴포넌트
 * 레이아웃이나 Providers에서 사용하여 전역적으로 트래킹을 처리합니다.
 */
const AuthCallbackTracker = () => {
  useAuthCallbackTracking();
  return null;
};

export default AuthCallbackTracker;
