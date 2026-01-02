"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { makeLoginParameter } from "@/shared/contants/analytics/parameters/make-login-parameter";
import { makeSignupParameter } from "@/shared/contants/analytics/parameters/make-signup-parameter";
import useSession from "@/shared/hooks/use-session";
import { useAnalytics } from "@/shared/providers/modules/analytics-provider";

/**
 * OAuth 콜백 후 이벤트 트래킹을 처리하는 훅
 * URL에 `?auth=callback` 파라미터가 있을 때 트래킹을 수행합니다.
 */
export const useAuthCallbackTracking = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { trackEvent, isReady } = useAnalytics();
  const { user } = useSession();

  useEffect(() => {
    const authCallback = searchParams.get("auth");
    const isNewUser = searchParams.get("newUser") === "true";

    if (!isReady || !user) {
      return;
    }

    if (authCallback === "callback") {
      // URL에서 쿼리 파라미터 제거
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("auth");
      newUrl.searchParams.delete("newUser");
      router.replace(newUrl.pathname + newUrl.search, { scroll: false });

      const referrer = document.referrer || window.location.href;
      if (isNewUser || user.newUser) {
        // 회원가입
        trackEvent("SIGNUP", makeSignupParameter(referrer));
      } else {
        // 로그인
        trackEvent("LOGIN", makeLoginParameter("kakao"));
      }
    }
  }, [searchParams, user, trackEvent, router, isReady]);
};
