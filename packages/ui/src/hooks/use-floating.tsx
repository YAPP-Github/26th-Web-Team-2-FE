"use client";
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
  refresh: () => void;
}

const useFloating = <R extends HTMLElement, F extends HTMLElement>({
  defaultPlacement = "bottom",
  offset = 8,
  enabled = true,
}: UseFloatingOptions = {}): UseFloatingReturn<R, F> => {
  const events = ["resize", "scroll"];
  const [placement, setPlacement] = useState<Placement>(defaultPlacement);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const referenceRef = useRef<R>(null);
  const floatingRef = useRef<F>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: referenceRef가 변경될 때 실행
  const container = useMemo(() => {
    let container = referenceRef.current?.parentElement;
    while (container) {
      const styles = window.getComputedStyle(container);
      if (
        styles.position === "relative" ||
        styles.position === "absolute" ||
        styles.position === "fixed"
      ) {
        break;
      }
      container = container.parentElement;
    }
    return container;
  }, [referenceRef.current]);

  const floatingStyles = useMemo(() => {
    return {
      position: "absolute",
      left,
      maxHeight: `${Math.max(maxHeight - offset, offset * 2)}px`,
      zIndex: 50,
      [placement === "top" ? "bottom" : "top"]: `calc(100% + ${offset}px)`,
    } satisfies CSSProperties;
  }, [placement, offset, maxHeight, left]);

  const refresh = useCallback(() => {
    if (!referenceRef.current || !enabled) {
      setMaxHeight(0);
      setLeft(0);
      return;
    }

    const rect = referenceRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - offset;
    const spaceAbove = rect.top - offset;

    const placement =
      spaceBelow < 500 && spaceAbove > spaceBelow ? "top" : "bottom";

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const left = rect.left - containerRect.left;
      setLeft(left);
    } else {
      setLeft(0);
    }

    setPlacement(placement);
    setMaxHeight(placement === "top" ? spaceAbove : spaceBelow);
  }, [enabled, offset, container]);

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
    refresh,
  };
};

export default useFloating;
export { useFloating };
