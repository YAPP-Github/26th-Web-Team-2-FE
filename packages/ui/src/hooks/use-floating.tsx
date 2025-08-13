import {
  type CSSProperties,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Placement = "top" | "bottom";

export interface UseFloatingOptions {
  defaultPlacement?: Placement;
  offset?: number;
  enabled?: boolean;
}

export interface UseFloatingReturn<
  R extends HTMLElement,
  F extends HTMLElement,
> {
  referenceRef: RefObject<R | null>;
  floatingRef: RefObject<F | null>;
  floatingStyles: CSSProperties;
  placement: Placement;
}

export function useFloating<R extends HTMLElement, F extends HTMLElement>({
  defaultPlacement = "bottom",
  offset = 8,
  enabled = true,
}: UseFloatingOptions = {}): UseFloatingReturn<R, F> {
  const events = ["resize", "scroll"];
  const [placement, setPlacement] = useState<Placement>(defaultPlacement);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const referenceRef = useRef<R>(null);
  const floatingRef = useRef<F>(null);

  const floatingStyles = useMemo(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      maxHeight: `${Math.max(maxHeight - offset, offset * 2)}px`,
      zIndex: 50,
      [placement === "top" ? "bottom" : "top"]: `calc(100% + ${offset}px)`,
    } satisfies CSSProperties;
  }, [placement, offset, maxHeight]);

  const refresh = useCallback(() => {
    if (!referenceRef.current || !enabled) {
      setMaxHeight(0);
      return;
    }

    const rect = referenceRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - offset;
    const spaceAbove = rect.top - offset;

    const placement =
      spaceBelow < 500 && spaceAbove > spaceBelow ? "top" : "bottom";

    setPlacement(placement);
    setMaxHeight(placement === "top" ? spaceAbove : spaceBelow);
  }, [enabled, offset]);

  useEffect(() => {
    refresh();
    events.forEach((event) => window.addEventListener(event, refresh));
    return () => {
      events.forEach((event) => window.removeEventListener(event, refresh));
    };
  }, [refresh]);

  return {
    referenceRef,
    floatingRef,
    floatingStyles,
    placement,
  };
}
