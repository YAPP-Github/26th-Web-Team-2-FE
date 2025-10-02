import { makeClickFilterParameter } from "./parameters/make-click-filter-parameter";

export const EventParameterMap = {
  CLICK_FILTER: makeClickFilterParameter,
} as const;

export const EventNameMapper = {
  CLICK_FILTER: "click_filter",
} as const;

export type EventName = keyof typeof EventParameterMap;
