import mixpanel from "mixpanel-browser";
import { usePathname } from "next/navigation";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  AmplitudeEventName,
  AmplitudeEventParameterMap,
} from "@/shared/contants/analytics/mixpanel-event-parameter-map";

type AnalyticsContextProps = {
  trackEvent: <T extends AmplitudeEventName>(
    eventName: T,
    eventProperties: ReturnType<(typeof AmplitudeEventParameterMap)[T]>,
  ) => void;
  trackPageView: () => void;
  setUserProperty: (
    userId: string,
    properties: Record<string, unknown>,
  ) => void;
  isReady: boolean;
};

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(
  undefined,
);

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const isDev = process.env.NODE_ENV === "development";
  const MIXPANEL_KEY = process.env.NEXT_PUBLIC_MIXPANEL_KEY;
  const pathname = usePathname();

  /** 초기화 */
  useEffect(() => {
    if (!MIXPANEL_KEY) {
      console.warn("[TRACKING_ERROR] Mixpanel 키가 설정되지 않았습니다");
      return;
    }

    if (isDev) {
      console.log("[TRACKING] 개발환경에서 init 완료");
      setIsReady(true);
      return;
    }

    mixpanel.init(MIXPANEL_KEY, {
      debug: isDev,
      loaded: () => setIsReady(true),
      track_pageview: "url-with-path",
      record_sessions_percent: 10,
      record_heatmap_data: true,
    });
  }, [MIXPANEL_KEY, isDev]);

  /** 이벤트 트래킹 */
  const trackEvent = useCallback(
    <T extends AmplitudeEventName>(
      eventName: T,
      eventProperties: ReturnType<(typeof AmplitudeEventParameterMap)[T]>,
    ) => {
      if (!isReady) return console.warn("[TRACKING_ERROR] not ready");
      isDev
        ? console.log("[TRACKING]", eventName, eventProperties)
        : mixpanel.track(eventName, eventProperties);
    },
    [isReady, isDev],
  );

  /** 페이지뷰 트래킹 함수 */
  const trackPageView = useCallback(() => {
    if (!isReady) return console.warn("[TRACKING_ERROR] not ready");
    isDev ? console.log("[TRACKING] Page View") : mixpanel.track_pageview();
  }, [isReady, isDev]);

  /** 유저 프로퍼티 설정 */
  const setUserProperty = useCallback(
    (userId: string, properties: Record<string, unknown>) => {
      if (!isReady) return console.warn("[TRACKING_ERROR] not ready");
      if (isDev) return console.log("[USER PROPERTY]", properties);
      mixpanel.identify(userId);
      mixpanel.people.set(properties);
    },
    [isReady, isDev],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 이동 감지를 위해 pathname 의존성을 의도적으로 포함
  useEffect(() => {
    if (!isReady) return;
    trackPageView();
  }, [pathname, isReady, trackPageView]);

  return (
    <AnalyticsContext.Provider
      value={{ trackEvent, trackPageView, setUserProperty, isReady }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context)
    throw new Error(
      "useAnalytics는 AnalyticsProvider 내부에서만 사용해야 합니다.",
    );
  return context;
};

export default AnalyticsProvider;
