import { makeClickFilterParameter } from "./parameters/make-click-filter-parameter";

export const AmplitudeEventParameterMap = {
  CLICK_FILTER: makeClickFilterParameter,
} as const;

export const AmlitudeEventNameMapper = {
  CLICK_FILTER: "click_filter",
} as const;

export type AmplitudeEventName = keyof typeof AmplitudeEventParameterMap;
